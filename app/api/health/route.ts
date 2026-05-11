// Health check endpoint for monitoring
import { NextResponse } from 'next/server';
import { getAvailableSources } from '@/lib/sourceManager';
import { cache } from '@/lib/cache';

export const runtime = 'edge';

export async function GET() {
  const uptime = process.uptime ? process.uptime() : 0;
  const sources = getAvailableSources();
  
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(uptime),
    version: '1.0.0',
    sources: {
      available: sources,
      count: sources.length,
    },
    cache: {
      size: cache.size(),
    },
  }, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
