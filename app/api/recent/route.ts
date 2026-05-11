// Recent Updates API endpoint - Get recently updated manga
import { NextRequest, NextResponse } from 'next/server';
import { getSource } from '@/lib/sourceManager';
import { cache, generateCacheKey } from '@/lib/cache';
import { checkRateLimit } from '@/lib/rateLimit';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = checkRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const source = searchParams.get('source') || undefined;

    // Check cache
    const cacheKey = generateCacheKey('recent', { source: source || 'default' });
    const cached = cache.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          'X-Cache': 'HIT',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    }

    // Get source and fetch trending (as proxy for recent)
    // Note: Some sources may need custom implementation for "recent updates"
    const scraper = getSource(source);
    const recent = await scraper.getTrending();

    // Cache results
    cache.set(cacheKey, recent, 300);

    return NextResponse.json(recent, {
      headers: {
        'X-Cache': 'MISS',
        'X-Source': scraper.name,
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error: any) {
    console.error('Recent API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get recent manga',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
