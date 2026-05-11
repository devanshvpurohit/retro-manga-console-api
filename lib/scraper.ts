// Shared scraper utilities for manga sources
import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';

// Request timeout for ESP32 compatibility
const REQUEST_TIMEOUT = 15000;

// User agents to avoid blocking
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
];

function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

export async function fetchHTML(url: string, options: AxiosRequestConfig = {}): Promise<string> {
  try {
    const response = await axios.get(url, {
      timeout: REQUEST_TIMEOUT,
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        ...options.headers,
      },
      ...options,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch ${url}: ${error.message}`);
  }
}

export async function fetchJSON(url: string, options: AxiosRequestConfig = {}): Promise<any> {
  try {
    const response = await axios.get(url, {
      timeout: REQUEST_TIMEOUT,
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch JSON from ${url}: ${error.message}`);
  }
}

export function parseHTML(html: string): cheerio.CheerioAPI {
  return cheerio.load(html);
}

export async function fetchImage(url: string): Promise<Buffer> {
  try {
    const response = await axios.get(url, {
      timeout: REQUEST_TIMEOUT,
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': getRandomUserAgent(),
        'Referer': new URL(url).origin,
      },
    });
    return Buffer.from(response.data);
  } catch (error: any) {
    throw new Error(`Failed to fetch image ${url}: ${error.message}`);
  }
}

export function sanitizeUrl(url: string, baseUrl?: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (baseUrl) {
    return new URL(url, baseUrl).href;
  }
  return url;
}

export function extractText(element: cheerio.Cheerio<any>): string {
  return element.text().trim();
}

export function extractAttr(element: cheerio.Cheerio<any>, attr: string): string {
  return element.attr(attr)?.trim() || '';
}
