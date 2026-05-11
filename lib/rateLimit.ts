// Simple rate limiting middleware for API protection

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry>;
  private limit: number;
  private windowMs: number;

  constructor(limit: number = 60, windowMs: number = 60000) {
    this.requests = new Map();
    this.limit = limit;
    this.windowMs = windowMs;
  }

  check(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    // No previous requests or window expired
    if (!entry || now > entry.resetTime) {
      const resetTime = now + this.windowMs;
      this.requests.set(identifier, {
        count: 1,
        resetTime,
      });
      return {
        allowed: true,
        remaining: this.limit - 1,
        resetTime,
      };
    }

    // Within rate limit window
    if (entry.count < this.limit) {
      entry.count++;
      return {
        allowed: true,
        remaining: this.limit - entry.count,
        resetTime: entry.resetTime,
      };
    }

    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    }
  }
}

// Global rate limiter instance
const RATE_LIMIT = parseInt(process.env.RATE_LIMIT || '60');
export const rateLimiter = new RateLimiter(RATE_LIMIT, 60000);

// Cleanup expired entries every minute
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    rateLimiter.cleanup();
  }, 60000);
}

// Helper to get client identifier from request
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  return forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown';
}

// Rate limit check middleware
export function checkRateLimit(request: Request): Response | null {
  const identifier = getClientIdentifier(request);
  const result = rateLimiter.check(identifier);

  if (!result.allowed) {
    const resetDate = new Date(result.resetTime);
    return new Response(
      JSON.stringify({
        error: 'Rate limit exceeded',
        message: `Too many requests. Please try again after ${resetDate.toISOString()}`,
        resetTime: result.resetTime,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': RATE_LIMIT.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': result.resetTime.toString(),
          'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  return null;
}
