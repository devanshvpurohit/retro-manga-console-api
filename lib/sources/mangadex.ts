// MangaDex.org scraper implementation (API-based)
import { ScraperSource, MangaSearchResult, MangaChapter, MangaPage, TrendingManga } from '../types';
import { fetchJSON } from '../scraper';

const API_BASE = 'https://api.mangadex.org';
const COVER_BASE = 'https://uploads.mangadex.org/covers';

export const mangadex: ScraperSource = {
  name: 'mangadex',

  async search(query: string): Promise<MangaSearchResult[]> {
    try {
      const searchUrl = `${API_BASE}/manga?title=${encodeURIComponent(query)}&limit=10&includes[]=cover_art`;
      const data = await fetchJSON(searchUrl);
      
      const results: MangaSearchResult[] = [];
      
      for (const manga of data.data || []) {
        const coverArt = manga.relationships?.find((rel: any) => rel.type === 'cover_art');
        const coverFileName = coverArt?.attributes?.fileName;
        const cover = coverFileName ? `${COVER_BASE}/${manga.id}/${coverFileName}` : '';
        
        results.push({
          title: manga.attributes?.title?.en || manga.attributes?.title?.['ja-ro'] || 'Unknown',
          cover,
          url: `https://mangadex.org/title/${manga.id}`,
          source: 'mangadex',
          description: manga.attributes?.description?.en,
        });
      }

      return results;
    } catch (error: any) {
      console.error('MangaDex search error:', error.message);
      return [];
    }
  },

  async getChapters(url: string): Promise<MangaChapter[]> {
    try {
      // Extract manga ID from URL
      const mangaId = url.split('/title/')[1]?.split('/')[0] || url;
      const chaptersUrl = `${API_BASE}/manga/${mangaId}/feed?translatedLanguage[]=en&limit=100&order[chapter]=desc`;
      const data = await fetchJSON(chaptersUrl);
      
      const chapters: MangaChapter[] = [];
      
      for (const chapter of data.data || []) {
        const chapterNum = chapter.attributes?.chapter || '0';
        const title = chapter.attributes?.title;
        
        chapters.push({
          title: `Chapter ${chapterNum}${title ? ': ' + title : ''}`,
          url: `https://mangadex.org/chapter/${chapter.id}`,
          number: chapterNum,
          date: chapter.attributes?.publishAt,
        });
      }

      return chapters;
    } catch (error: any) {
      console.error('MangaDex chapters error:', error.message);
      throw new Error(`Failed to get chapters: ${error.message}`);
    }
  },

  async getPages(chapterUrl: string): Promise<MangaPage[]> {
    try {
      // Extract chapter ID from URL
      const chapterId = chapterUrl.split('/chapter/')[1]?.split('/')[0] || chapterUrl;
      const atHomeUrl = `${API_BASE}/at-home/server/${chapterId}`;
      const data = await fetchJSON(atHomeUrl);
      
      const pages: MangaPage[] = [];
      const baseUrl = data.baseUrl;
      const hash = data.chapter?.hash;
      const imageFiles = data.chapter?.data || [];
      
      for (const [index, fileName] of imageFiles.entries()) {
        pages.push({
          url: `${baseUrl}/data/${hash}/${fileName}`,
          index: index + 1,
        });
      }

      return pages;
    } catch (error: any) {
      console.error('MangaDex pages error:', error.message);
      throw new Error(`Failed to get pages: ${error.message}`);
    }
  },

  async getTrending(): Promise<TrendingManga[]> {
    try {
      const trendingUrl = `${API_BASE}/manga?limit=10&includes[]=cover_art&order[followedCount]=desc`;
      const data = await fetchJSON(trendingUrl);
      
      const trending: TrendingManga[] = [];
      
      for (const manga of data.data || []) {
        const coverArt = manga.relationships?.find((rel: any) => rel.type === 'cover_art');
        const coverFileName = coverArt?.attributes?.fileName;
        const cover = coverFileName ? `${COVER_BASE}/${manga.id}/${coverFileName}` : '';
        
        trending.push({
          title: manga.attributes?.title?.en || manga.attributes?.title?.['ja-ro'] || 'Unknown',
          cover,
          url: `https://mangadex.org/title/${manga.id}`,
          source: 'mangadex',
          rating: manga.attributes?.rating?.toString(),
        });
      }

      return trending;
    } catch (error: any) {
      console.error('MangaDex trending error:', error.message);
      return [];
    }
  },
};
