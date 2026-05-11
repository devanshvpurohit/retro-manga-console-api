// Comick.io scraper implementation (API-based)
import { ScraperSource, MangaSearchResult, MangaChapter, MangaPage, TrendingManga } from '../types';
import { fetchJSON } from '../scraper';

const API_BASE = 'https://api.comick.fun';
const CDN_BASE = 'https://meo.comick.pictures';

export const comick: ScraperSource = {
  name: 'comick',

  async search(query: string): Promise<MangaSearchResult[]> {
    try {
      const searchUrl = `${API_BASE}/v1.0/search?q=${encodeURIComponent(query)}&limit=10`;
      const data = await fetchJSON(searchUrl);
      
      const results: MangaSearchResult[] = [];
      
      for (const item of data || []) {
        results.push({
          title: item.title || item.slug,
          cover: item.cover_url ? `${CDN_BASE}/${item.cover_url}` : '',
          url: `https://comick.io/comic/${item.slug}`,
          source: 'comick',
          description: item.desc,
        });
      }

      return results.slice(0, 10);
    } catch (error: any) {
      console.error('Comick search error:', error.message);
      return [];
    }
  },

  async getChapters(url: string): Promise<MangaChapter[]> {
    try {
      // Extract slug from URL
      const slug = url.split('/comic/')[1]?.split('/')[0] || url;
      const chaptersUrl = `${API_BASE}/comic/${slug}/chapters?lang=en&limit=300`;
      const data = await fetchJSON(chaptersUrl);
      
      const chapters: MangaChapter[] = [];
      
      for (const chapter of data.chapters || []) {
        chapters.push({
          title: `Chapter ${chapter.chap}${chapter.title ? ': ' + chapter.title : ''}`,
          url: `https://comick.io/comic/${slug}/${chapter.hid}`,
          number: chapter.chap,
          date: chapter.created_at,
        });
      }

      return chapters;
    } catch (error: any) {
      console.error('Comick chapters error:', error.message);
      throw new Error(`Failed to get chapters: ${error.message}`);
    }
  },

  async getPages(chapterUrl: string): Promise<MangaPage[]> {
    try {
      // Extract chapter HID from URL
      const hid = chapterUrl.split('/').pop();
      const pagesUrl = `${API_BASE}/chapter/${hid}`;
      const data = await fetchJSON(pagesUrl);
      
      const pages: MangaPage[] = [];
      
      for (const [index, image] of (data.chapter?.images || []).entries()) {
        pages.push({
          url: `${CDN_BASE}/${image.url}`,
          index: index + 1,
        });
      }

      return pages;
    } catch (error: any) {
      console.error('Comick pages error:', error.message);
      throw new Error(`Failed to get pages: ${error.message}`);
    }
  },

  async getTrending(): Promise<TrendingManga[]> {
    try {
      const trendingUrl = `${API_BASE}/v1.0/search?limit=10&sort=view`;
      const data = await fetchJSON(trendingUrl);
      
      const trending: TrendingManga[] = [];
      
      for (const item of data || []) {
        trending.push({
          title: item.title || item.slug,
          cover: item.cover_url ? `${CDN_BASE}/${item.cover_url}` : '',
          url: `https://comick.io/comic/${item.slug}`,
          source: 'comick',
          rating: item.rating?.toString(),
          views: item.view_count?.toString(),
        });
      }

      return trending.slice(0, 10);
    } catch (error: any) {
      console.error('Comick trending error:', error.message);
      return [];
    }
  },
};
