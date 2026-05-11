// Chapters API endpoint - Get chapter list for a manga
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
    const url = searchParams.get('url');
    const source = searchParams.get('source') || undefined;

    // Validate URL
    if (!url || url.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing parameter', message: 'URL parameter "url" is required' },
        { status: 400 }
      );
    }

    // Check cache
    const cacheKey = generateCacheKey('chapters', { url, source: source || 'default' });
    const cached = cache.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          'X-Cache': 'HIT',
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
        },
      });
    }

    // Get source and fetch chapters
    const scraper = getSource(source);
    const chapters = await scraper.getChapters(url);

    // Cache results (longer TTL for chapters)
    cache.set(cacheKey, chapters, 600);

    return NextResponse.json(chapters, {
      headers: {
        'X-Cache': 'MISS',
        'X-Source': scraper.name,
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
      },
    });
  } catch (error: any) {
    console.error('Chapters API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get chapters',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
