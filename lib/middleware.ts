// Middleware utilities for API routes
import { NextRequest, NextResponse } from 'next/server';

/**
 * API token authentication middleware
 */
export function checkApiToken(request: NextRequest): Response | null {
  const apiToken = process.env.API_TOKEN;
  
  // Skip if no token configured
  if (!apiToken) {
    return null;
  }
  
  // Check Authorization header
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (token !== apiToken) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message: 'Invalid or missing API token',
      },
      {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Bearer',
        },
      }
    );
  }
  
  return null;
}

/**
 * CORS middleware
 */
export function handleCors(request: NextRequest): Response | null {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  
  return null;
}

/**
 * Add CORS headers to response
 */
export function addCorsHeaders(response: NextResponse): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

/**
 * NSFW filter middleware
 */
export function checkNsfwFilter(content: string): boolean {
  const nsfwEnabled = process.env.NSFW_FILTER === 'true';
  
  if (!nsfwEnabled) {
    return true; // Allow all content
  }
  
  // Simple keyword-based NSFW detection
  const nsfwKeywords = [
    'hentai', 'ecchi', 'adult', '18+', 'nsfw',
    'mature', 'explicit', 'pornographic'
  ];
  
  const lowerContent = content.toLowerCase();
  return !nsfwKeywords.some(keyword => lowerContent.includes(keyword));
}

/**
 * Error response helper
 */
export function errorResponse(
  error: string,
  message: string,
  status: number = 500
): NextResponse {
  return NextResponse.json(
    {
      error,
      message,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Success response helper
 */
export function successResponse(data: any, headers: Record<string, string> = {}): NextResponse {
  return NextResponse.json(data, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}
