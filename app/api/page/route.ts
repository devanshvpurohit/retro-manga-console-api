// Page API endpoint - Get and process manga page images for ESP32
import { NextRequest, NextResponse } from 'next/server';
import { getSource } from '@/lib/sourceManager';
import { fetchImage } from '@/lib/scraper';
import { processImageForESP32 } from '@/lib/image';
import { checkRateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = checkRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const chapterUrl = searchParams.get('chapter');
    const pageNum = parseInt(searchParams.get('page') || '1');
    const source = searchParams.get('source') || undefined;
    
    // Optional image processing parameters
    const width = parseInt(searchParams.get('width') || '320');
    const height = parseInt(searchParams.get('height') || '240');
    const quality = parseInt(searchParams.get('quality') || '40');
    const grayscale = searchParams.get('grayscale') !== 'false';

    // Validate parameters
    if (!chapterUrl || chapterUrl.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing parameter', message: 'Chapter URL parameter "chapter" is required' },
        { status: 400 }
      );
    }

    if (isNaN(pageNum) || pageNum < 1) {
      return NextResponse.json(
        { error: 'Invalid parameter', message: 'Page number must be a positive integer' },
        { status: 400 }
      );
    }

    // Get source and fetch pages
    const scraper = getSource(source);
    const pages = await scraper.getPages(chapterUrl);

    // Validate page number
    if (pageNum > pages.length) {
      return NextResponse.json(
        { error: 'Page not found', message: `Page ${pageNum} does not exist. Total pages: ${pages.length}` },
        { status: 404 }
      );
    }

    // Get the requested page
    const page = pages[pageNum - 1];
    
    // Fetch the image
    const imageBuffer = await fetchImage(page.url);
    
    // Process image for ESP32 display
    const processedImage = await processImageForESP32(imageBuffer, {
      width,
      height,
      quality,
      grayscale,
    });

    // Return processed image
    return new NextResponse(processedImage, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Length': processedImage.length.toString(),
        'X-Source': scraper.name,
        'X-Page-Number': pageNum.toString(),
        'X-Total-Pages': pages.length.toString(),
        'X-Original-Size': imageBuffer.length.toString(),
        'X-Compressed-Size': processedImage.length.toString(),
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch (error: any) {
    console.error('Page API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get page',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
