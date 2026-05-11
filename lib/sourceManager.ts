// Source manager for routing requests to appropriate scrapers
import { ScraperSource, SourceName } from './types';
import { mangataro } from './sources/mangataro';
import { comick } from './sources/comick';
import { mangadex } from './sources/mangadex';
import { manganato } from './sources/manganato';
import { manganelo } from './sources/manganelo';
import { batoto } from './sources/batoto';

// Registry of all available sources
const sources: Record<SourceName, ScraperSource> = {
  mangataro,
  comick,
  mangadex,
  manganato,
  manganelo,
  batoto,
};

// Default source from environment or fallback
const DEFAULT_SOURCE: SourceName = (process.env.DEFAULT_SOURCE as SourceName) || 'mangataro';

/**
 * Get a source by name with validation
 */
export function getSource(sourceName?: string): ScraperSource {
  const name = (sourceName || DEFAULT_SOURCE) as SourceName;
  
  if (!sources[name]) {
    throw new Error(`Invalid source: ${name}. Available sources: ${Object.keys(sources).join(', ')}`);
  }
  
  return sources[name];
}

/**
 * Get all available source names
 */
export function getAvailableSources(): SourceName[] {
  return Object.keys(sources) as SourceName[];
}

/**
 * Validate if a source name is valid
 */
export function isValidSource(sourceName: string): sourceName is SourceName {
  return sourceName in sources;
}

/**
 * Get default source name
 */
export function getDefaultSource(): SourceName {
  return DEFAULT_SOURCE;
}

/**
 * Try multiple sources with fallback
 * Useful for resilience when a source is down
 */
export async function tryMultipleSources<T>(
  operation: (source: ScraperSource) => Promise<T>,
  preferredSource?: string
): Promise<{ data: T; source: string } | null> {
  const sourceNames = getAvailableSources();
  
  // Try preferred source first
  if (preferredSource && isValidSource(preferredSource)) {
    try {
      const source = getSource(preferredSource);
      const data = await operation(source);
      return { data, source: preferredSource };
    } catch (error) {
      console.error(`Source ${preferredSource} failed, trying fallbacks...`);
    }
  }
  
  // Try other sources as fallback
  for (const sourceName of sourceNames) {
    if (sourceName === preferredSource) continue; // Already tried
    
    try {
      const source = getSource(sourceName);
      const data = await operation(source);
      return { data, source: sourceName };
    } catch (error) {
      console.error(`Source ${sourceName} failed:`, error);
      continue;
    }
  }
  
  return null;
}
