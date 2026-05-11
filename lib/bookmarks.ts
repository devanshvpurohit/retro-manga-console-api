// Bookmark storage system
// Uses in-memory storage by default
// Can be extended to use Vercel KV or other persistent storage

import { Bookmark } from './types';

// In-memory bookmark storage
const bookmarks: Map<string, Bookmark> = new Map();

/**
 * Save a bookmark
 */
export function saveBookmark(bookmark: Omit<Bookmark, 'id' | 'timestamp'>): Bookmark {
  const id = generateBookmarkId(bookmark.manga, bookmark.chapter, bookmark.source);
  const timestamp = Date.now();
  
  const fullBookmark: Bookmark = {
    ...bookmark,
    id,
    timestamp,
  };
  
  bookmarks.set(id, fullBookmark);
  return fullBookmark;
}

/**
 * Get all bookmarks
 */
export function getAllBookmarks(): Bookmark[] {
  return Array.from(bookmarks.values()).sort((a, b) => b.timestamp - a.timestamp);
}

/**
 * Get a specific bookmark by ID
 */
export function getBookmark(id: string): Bookmark | null {
  return bookmarks.get(id) || null;
}

/**
 * Delete a bookmark
 */
export function deleteBookmark(id: string): boolean {
  return bookmarks.delete(id);
}

/**
 * Find bookmarks by manga URL
 */
export function findBookmarksByManga(mangaUrl: string): Bookmark[] {
  return Array.from(bookmarks.values())
    .filter(b => b.manga === mangaUrl)
    .sort((a, b) => b.timestamp - a.timestamp);
}

/**
 * Find bookmark by manga and chapter
 */
export function findBookmark(mangaUrl: string, chapterUrl: string, source: string): Bookmark | null {
  const id = generateBookmarkId(mangaUrl, chapterUrl, source);
  return bookmarks.get(id) || null;
}

/**
 * Update bookmark page
 */
export function updateBookmarkPage(id: string, page: number): Bookmark | null {
  const bookmark = bookmarks.get(id);
  if (!bookmark) return null;
  
  bookmark.page = page;
  bookmark.timestamp = Date.now();
  bookmarks.set(id, bookmark);
  
  return bookmark;
}

/**
 * Clear all bookmarks
 */
export function clearAllBookmarks(): void {
  bookmarks.clear();
}

/**
 * Generate a unique bookmark ID
 */
function generateBookmarkId(manga: string, chapter: string, source: string): string {
  const str = `${source}:${manga}:${chapter}`;
  return Buffer.from(str).toString('base64').replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Get bookmark statistics
 */
export function getBookmarkStats() {
  const all = getAllBookmarks();
  const bySource: Record<string, number> = {};
  
  for (const bookmark of all) {
    bySource[bookmark.source] = (bySource[bookmark.source] || 0) + 1;
  }
  
  return {
    total: all.length,
    bySource,
    latest: all[0] || null,
  };
}
