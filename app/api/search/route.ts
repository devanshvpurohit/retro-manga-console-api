// Search API endpoint - Search manga across multiple sources
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
    const query = searchParams.get('q');
    const source = searchParams.get('source') || undefined;

    // Validate query
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing parameter', message: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    // Check cache
    const cacheKey = generateCacheKey('search', { query, source: source || 'default' });
    const cached = cache.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          'X-Cache': 'HIT',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    }

    // Get source and perform search
    const scraper = getSource(source);
    const results = await scraper.search(query);

    // Cache results
    cache.set(cacheKey, results, 300);

    return NextResponse.json(results, {
      headers: {
        'X-Cache': 'MISS',
        'X-Source': scraper.name,
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error: any) {
    console.error('Search API error:', error);
    return NextResponse.json(
      {
        error: 'Search failed',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
