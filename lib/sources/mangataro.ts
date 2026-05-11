// Mangataro.org scraper implementation
import { ScraperSource, MangaSearchResult, MangaChapter, MangaPage, TrendingManga } from '../types';
import { fetchHTML, parseHTML, sanitizeUrl, extractText, extractAttr } from '../scraper';

const BASE_URL = 'https://mangataro.org';

export const mangataro: ScraperSource = {
  name: 'mangataro',

  async search(query: string): Promise<MangaSearchResult[]> {
    try {
      const searchUrl = `${BASE_URL}/search?q=${encodeURIComponent(query)}`;
      const html = await fetchHTML(searchUrl);
      const $ = parseHTML(html);
      const results: MangaSearchResult[] = [];

      $('.manga-item, .manga-card, .item').slice(0, 10).each((_, element) => {
        const $el = $(element);
        const title = extractText($el.find('.manga-title, .title, h3, h4, a'));
        const cover = sanitizeUrl(extractAttr($el.find('img'), 'src') || extractAttr($el.find('img'), 'data-src'), BASE_URL);
        const url = sanitizeUrl(extractAttr($el.find('a'), 'href'), BASE_URL);

        if (title && url) {
          results.push({
            title,
            cover: cover || `${BASE_URL}/default-cover.jpg`,
            url,
            source: 'mangataro',
          });
        }
      });

      return results;
    } catch (error: any) {
      console.error('Mangataro search error:', error.message);
      return [];
    }
  },

  async getChapters(url: string): Promise<MangaChapter[]> {
    try {
      const html = await fetchHTML(url);
      const $ = parseHTML(html);
      const chapters: MangaChapter[] = [];

      $('.chapter-item, .chapter-list li, .chapter').each((_, element) => {
        const $el = $(element);
        const title = extractText($el.find('a, .chapter-title'));
        const chapterUrl = sanitizeUrl(extractAttr($el.find('a'), 'href'), BASE_URL);
        const date = extractText($el.find('.chapter-date, .date, time'));

        if (title && chapterUrl) {
          chapters.push({
            title,
            url: chapterUrl,
            date: date || undefined,
          });
        }
      });

      return chapters;
    } catch (error: any) {
      console.error('Mangataro chapters error:', error.message);
      throw new Error(`Failed to get chapters: ${error.message}`);
    }
  },

  async getPages(chapterUrl: string): Promise<MangaPage[]> {
    try {
      const html = await fetchHTML(chapterUrl);
      const $ = parseHTML(html);
      const pages: MangaPage[] = [];

      $('.page-image img, .manga-page img, #chapter-reader img').each((index, element) => {
        const $el = $(element);
        const url = extractAttr($el, 'src') || extractAttr($el, 'data-src') || extractAttr($el, 'data-lazy-src');
        
        if (url) {
          pages.push({
            url: sanitizeUrl(url, BASE_URL),
            index: index + 1,
          });
        }
      });

      return pages;
    } catch (error: any) {
      console.error('Mangataro pages error:', error.message);
      throw new Error(`Failed to get pages: ${error.message}`);
    }
  },

  async getTrending(): Promise<TrendingManga[]> {
    try {
      const html = await fetchHTML(BASE_URL);
      const $ = parseHTML(html);
      const trending: TrendingManga[] = [];

      $('.trending-item, .popular-item, .hot-manga').slice(0, 10).each((_, element) => {
        const $el = $(element);
        const title = extractText($el.find('.manga-title, .title, h3, h4'));
        const cover = sanitizeUrl(extractAttr($el.find('img'), 'src') || extractAttr($el.find('img'), 'data-src'), BASE_URL);
        const url = sanitizeUrl(extractAttr($el.find('a'), 'href'), BASE_URL);
        const rating = extractText($el.find('.rating, .score'));

        if (title && url) {
          trending.push({
            title,
            cover: cover || `${BASE_URL}/default-cover.jpg`,
            url,
            source: 'mangataro',
            rating: rating || undefined,
          });
        }
      });

      return trending;
    } catch (error: any) {
      console.error('Mangataro trending error:', error.message);
      return [];
    }
  },
};
