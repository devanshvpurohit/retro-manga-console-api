// Core type definitions for Retro Manga Console API

export interface MangaSearchResult {
  title: string;
  cover: string;
  url: string;
  source: string;
  description?: string;
}

export interface MangaChapter {
  title: string;
  url: string;
  number?: string;
  date?: string;
}

export interface MangaPage {
  url: string;
  index: number;
}

export interface Bookmark {
  id: string;
  manga: string;
  chapter: string;
  page: number;
  source: string;
  timestamp: number;
  cover?: string;
}

export interface TrendingManga {
  title: string;
  cover: string;
  url: string;
  source: string;
  rating?: string;
  views?: string;
}

export interface ScraperSource {
  name: string;
  search: (query: string) => Promise<MangaSearchResult[]>;
  getChapters: (url: string) => Promise<MangaChapter[]>;
  getPages: (chapterUrl: string) => Promise<MangaPage[]>;
  getTrending: () => Promise<TrendingManga[]>;
}

export type SourceName = 'mangataro' | 'comick' | 'mangadex' | 'manganato' | 'manganelo' | 'batoto';

export interface ApiError {
  error: string;
  message: string;
  source?: string;
}
