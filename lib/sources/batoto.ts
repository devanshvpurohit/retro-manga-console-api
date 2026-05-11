// Bato.to scraper implementation
import { ScraperSource, MangaSearchResult, MangaChapter, MangaPage, TrendingManga } from '../types';
import { fetchHTML, parseHTML, sanitizeUrl, extractText, extractAttr } from '../scraper';

const BASE_URL = 'https://bato.to';

export const batoto: ScraperSource = {
  name: 'batoto',

  async search(query: string): Promise<MangaSearchResult[]> {
    try {
      const searchUrl = `${BASE_URL}/search?word=${encodeURIComponent(query)}`;
      const html = await fetchHTML(searchUrl);
      const $ = parseHTML(html);
      const results: MangaSearchResult[] = [];

      $('.item, .series-item, .manga-item').slice(0, 10).each((_, element) => {
        const $el = $(element);
        const $link = $el.find('a:first');
        const title = extractAttr($link, 'title') || extractText($el.find('.item-title, h3, h4'));
        const cover = extractAttr($el.find('img'), 'src') || extractAttr($el.find('img'), 'data-src');
        const url = sanitizeUrl(extractAttr($link, 'href'), BASE_URL);

        if (title && url) {
          results.push({
            title,
            cover: cover || '',
            url,
            source: 'batoto',
          });
        }
      });

      return results;
    } catch (error: any) {
      console.error('Batoto search error:', error.message);
      return [];
    }
  },

  async getChapters(url: string): Promise<MangaChapter[]> {
    try {
      const html = await fetchHTML(url);
      const $ = parseHTML(html);
      const chapters: MangaChapter[] = [];

      $('.chapter-item, .episode-item, .main .item').each((_, element) => {
        const $el = $(element);
        const $link = $el.find('a');
        const title = extractText($link);
        const chapterUrl = sanitizeUrl(extractAttr($link, 'href'), BASE_URL);
        const date = extractText($el.find('.extra, .time, time'));

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
      console.error('Batoto chapters error:', error.message);
      throw new Error(`Failed to get chapters: ${error.message}`);
    }
  },

  async getPages(chapterUrl: string): Promise<MangaPage[]> {
    try {
      const html = await fetchHTML(chapterUrl);
      const $ = parseHTML(html);
      const pages: MangaPage[] = [];

      $('.page-img img, .viewer img, #viewer img').each((index, element) => {
        const $el = $(element);
        const url = extractAttr($el, 'src') || extractAttr($el, 'data-src');
        
        if (url) {
          pages.push({
            url: sanitizeUrl(url, BASE_URL),
            index: index + 1,
          });
        }
      });

      return pages;
    } catch (error: any) {
      console.error('Batoto pages error:', error.message);
      throw new Error(`Failed to get pages: ${error.message}`);
    }
  },

  async getTrending(): Promise<TrendingManga[]> {
    try {
      const html = await fetchHTML(BASE_URL);
      const $ = parseHTML(html);
      const trending: TrendingManga[] = [];

      $('.trending-item, .popular-item, .item').slice(0, 10).each((_, element) => {
        const $el = $(element);
        const $link = $el.find('a:first');
        const title = extractAttr($link, 'title') || extractText($el.find('.item-title, h3, h4'));
        const cover = extractAttr($el.find('img'), 'src') || extractAttr($el.find('img'), 'data-src');
        const url = sanitizeUrl(extractAttr($link, 'href'), BASE_URL);

        if (title && url) {
          trending.push({
            title,
            cover: cover || '',
            url,
            source: 'batoto',
          });
        }
      });

      return trending;
    } catch (error: any) {
      console.error('Batoto trending error:', error.message);
      return [];
    }
  },
};
