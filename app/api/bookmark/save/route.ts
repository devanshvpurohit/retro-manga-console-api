// Bookmark Save API endpoint - Save reading progress
import { NextRequest, NextResponse } from 'next/server';
import { saveBookmark } from '@/lib/bookmarks';
import { checkRateLimit } from '@/lib/rateLimit';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = checkRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    // Parse request body
    const body = await request.json();
    const { manga, chapter, page, source, cover } = body;

    // Validate required fields
    if (!manga || !chapter || !source) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          message: 'manga, chapter, and source are required',
        },
        { status: 400 }
      );
    }

    if (typeof page !== 'number' || page < 1) {
      return NextResponse.json(
        {
          error: 'Invalid page number',
          message: 'page must be a positive integer',
        },
        { status: 400 }
      );
    }

    // Save bookmark
    const bookmark = saveBookmark({
      manga,
      chapter,
      page,
      source,
      cover,
    });

    return NextResponse.json(
      {
        success: true,
        bookmark,
      },
      {
        status: 201,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error: any) {
    console.error('Bookmark save error:', error);
    return NextResponse.json(
      {
        error: 'Failed to save bookmark',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
