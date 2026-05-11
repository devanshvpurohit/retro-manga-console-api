// Sources API endpoint - Get available manga sources
import { NextResponse } from 'next/server';
import { getAvailableSources, getDefaultSource } from '@/lib/sourceManager';

export const runtime = 'edge';

export async function GET() {
  try {
    const sources = getAvailableSources();
    const defaultSource = getDefaultSource();

    return NextResponse.json({
      sources,
      default: defaultSource,
      total: sources.length,
    }, {
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error: any) {
    console.error('Sources API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get sources',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
