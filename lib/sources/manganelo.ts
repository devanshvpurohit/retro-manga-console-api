// Manganelo.com scraper implementation
import { ScraperSource, MangaSearchResult, MangaChapter, MangaPage, TrendingManga } from '../types';
import { fetchHTML, parseHTML, sanitizeUrl, extractText, extractAttr } from '../scraper';

const BASE_URL = 'https://m.manganelo.com';
const SEARCH_URL = 'https://m.manganelo.com/search/story';

export const manganelo: ScraperSource = {
  name: 'manganelo',

  async search(query: string): Promise<MangaSearchResult[]> {
    try {
      const searchUrl = `${SEARCH_URL}/${encodeURIComponent(query.replace(/\s+/g, '_'))}`;
      const html = await fetchHTML(searchUrl);
      const $ = parseHTML(html);
      const results: MangaSearchResult[] = [];

      $('.search-story-item, .story_item').slice(0, 10).each((_, element) => {
        const $el = $(element);
        const $link = $el.find('a.item-img, a:first');
        const title = extractAttr($link, 'title') || extractText($el.find('.item-title, h3'));
        const cover = extractAttr($el.find('img'), 'src');
        const url = extractAttr($link, 'href');

        if (title && url) {
          results.push({
            title,
            cover: cover || '',
            url,
            source: 'manganelo',
          });
        }
      });

      return results;
    } catch (error: any) {
      console.error('Manganelo search error:', error.message);
      return [];
    }
  },

  async getChapters(url: string): Promise<MangaChapter[]> {
    try {
      const html = await fetchHTML(url);
      const $ = parseHTML(html);
      const chapters: MangaChapter[] = [];

      $('.row-content-chapter li, .chapter-list li').each((_, element) => {
        const $el = $(element);
        const $link = $el.find('a');
        const title = extractText($link);
        const chapterUrl = extractAttr($link, 'href');
        const date = extractText($el.find('.chapter-time, span:last'));

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
      console.error('Manganelo chapters error:', error.message);
      throw new Error(`Failed to get chapters: ${error.message}`);
    }
  },

  async getPages(chapterUrl: string): Promise<MangaPage[]> {
    try {
      const html = await fetchHTML(chapterUrl);
      const $ = parseHTML(html);
      const pages: MangaPage[] = [];

      $('.container-chapter-reader img, .vung-doc img').each((index, element) => {
        const $el = $(element);
        const url = extractAttr($el, 'src') || extractAttr($el, 'data-src');
        
        if (url) {
          pages.push({
            url,
            index: index + 1,
          });
        }
      });

      return pages;
    } catch (error: any) {
      console.error('Manganelo pages error:', error.message);
      throw new Error(`Failed to get pages: ${error.message}`);
    }
  },

  async getTrending(): Promise<TrendingManga[]> {
    try {
      const html = await fetchHTML(BASE_URL);
      const $ = parseHTML(html);
      const trending: TrendingManga[] = [];

      $('.content-homepage-item, .item').slice(0, 10).each((_, element) => {
        const $el = $(element);
        const $link = $el.find('a:first');
        const title = extractAttr($link, 'title') || extractText($el.find('h3, .item-title'));
        const cover = extractAttr($el.find('img'), 'src');
        const url = extractAttr($link, 'href');

        if (title && url) {
          trending.push({
            title,
            cover: cover || '',
            url,
            source: 'manganelo',
          });
        }
      });

      return trending;
    } catch (error: any) {
      console.error('Manganelo trending error:', error.message);
      return [];
    }
  },
};
