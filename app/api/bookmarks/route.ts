// Bookmarks API endpoint - Get all saved bookmarks
import { NextRequest, NextResponse } from 'next/server';
import { getAllBookmarks, deleteBookmark, getBookmarkStats } from '@/lib/bookmarks';
import { checkRateLimit } from '@/lib/rateLimit';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = checkRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const stats = searchParams.get('stats') === 'true';

    // Return stats if requested
    if (stats) {
      const bookmarkStats = getBookmarkStats();
      return NextResponse.json(bookmarkStats, {
        headers: {
          'Cache-Control': 'no-store',
        },
      });
    }

    // Get all bookmarks
    const bookmarks = getAllBookmarks();

    return NextResponse.json(bookmarks, {
      headers: {
        'X-Total-Bookmarks': bookmarks.length.toString(),
        'Cache-Control': 'no-store',
      },
    });
  } catch (error: any) {
    console.error('Bookmarks API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get bookmarks',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = checkRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    // Get bookmark ID from query
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing parameter', message: 'Bookmark ID is required' },
        { status: 400 }
      );
    }

    // Delete bookmark
    const deleted = deleteBookmark(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Not found', message: 'Bookmark not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Bookmark deleted' },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error: any) {
    console.error('Bookmark delete error:', error);
    return NextResponse.json(
      {
        error: 'Failed to delete bookmark',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
