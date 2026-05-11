# 🤝 CONTRIBUTING GUIDE

Thank you for considering contributing to Retro Manga Console API!

---

## 📋 HOW TO CONTRIBUTE

### Reporting Bugs

1. Check existing issues first
2. Create a new issue with:
   - Clear title
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (Node version, OS, etc.)

### Suggesting Features

1. Check if feature already exists or is planned
2. Create an issue with:
   - Clear use case
   - Proposed implementation
   - Benefits and drawbacks
   - Alternative solutions considered

### Adding New Manga Sources

This is the most common contribution! Follow these steps:

#### 1. Create Source File

Create `lib/sources/newsource.ts`:

```typescript
import { ScraperSource, MangaSearchResult, MangaChapter, MangaPage, TrendingManga } from '../types';
import { fetchHTML, parseHTML, sanitizeUrl, extractText, extractAttr } from '../scraper';

const BASE_URL = 'https://newsource.com';

export const newsource: ScraperSource = {
  name: 'newsource',

  async search(query: string): Promise<MangaSearchResult[]> {
    // Implementation
    return [];
  },

  async getChapters(url: string): Promise<MangaChapter[]> {
    // Implementation
    return [];
  },

  async getPages(chapterUrl: string): Promise<MangaPage[]> {
    // Implementation
    return [];
  },

  async getTrending(): Promise<TrendingManga[]> {
    // Implementation
    return [];
  },
};
```

#### 2. Register Source

Add to `lib/sourceManager.ts`:

```typescript
import { newsource } from './sources/newsource';

const sources: Record<SourceName, ScraperSource> = {
  // ... existing sources
  newsource,
};
```

Update `SourceName` type in `lib/types.ts`:

```typescript
export type SourceName = 'mangataro' | 'comick' | 'mangadex' | 'manganato' | 'manganelo' | 'batoto' | 'newsource';
```

#### 3. Test Source

```bash
npm run dev

# Test endpoints
curl "http://localhost:3000/api/search?q=naruto&source=newsource"
curl "http://localhost:3000/api/trending?source=newsource"
```

#### 4. Update Documentation

Add source to README.md:

```markdown
| **NewsSource.com** | Scraper | ✅ Active |
```

---

## 🔧 DEVELOPMENT SETUP

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup Steps

```bash
# Clone repository
git clone https://github.com/yourusername/retro-manga-console-api.git
cd retro-manga-console-api

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Run development server
npm run dev
```

### Project Structure

```
lib/
├── sources/          # Manga source scrapers
├── types.ts          # TypeScript types
├── scraper.ts        # Scraper utilities
├── image.ts          # Image processing
├── cache.ts          # Caching system
├── rateLimit.ts      # Rate limiting
├── bookmarks.ts      # Bookmark storage
└── sourceManager.ts  # Source routing

app/api/
├── search/           # Search endpoint
├── chapters/         # Chapters endpoint
├── page/             # Page image endpoint
├── trending/         # Trending endpoint
├── bookmark/         # Bookmark endpoints
└── sources/          # Sources list endpoint
```

---

## 📝 CODE STYLE

### TypeScript

- Use TypeScript for all new code
- Define proper types (no `any` unless necessary)
- Use async/await over promises
- Handle errors properly

### Formatting

```bash
# Run linter
npm run lint

# Type check
npm run type-check
```

### Naming Conventions

- **Files**: lowercase with hyphens (`manga-source.ts`)
- **Functions**: camelCase (`fetchMangaPages`)
- **Classes**: PascalCase (`ImageProcessor`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Comments

```typescript
/**
 * Fetch manga pages from chapter URL
 * @param chapterUrl - Full chapter URL
 * @returns Array of page objects
 */
async function getPages(chapterUrl: string): Promise<MangaPage[]> {
  // Implementation
}
```

---

## 🧪 TESTING

### Manual Testing

```bash
# Start dev server
npm run dev

# Test endpoints
curl "http://localhost:3000/api/search?q=test"
curl "http://localhost:3000/api/trending?source=comick"
```

### Testing New Sources

1. Test search with various queries
2. Test chapter fetching
3. Test page loading
4. Test trending/popular
5. Verify image URLs are valid
6. Check error handling

---

## 📤 PULL REQUEST PROCESS

### Before Submitting

- [ ] Code follows project style
- [ ] All endpoints tested
- [ ] Documentation updated
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Commits are clean and descriptive

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] New manga source
- [ ] Documentation update
- [ ] Performance improvement

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tested locally
```

### Review Process

1. Submit PR with clear description
2. Wait for maintainer review
3. Address feedback
4. Get approval
5. PR will be merged

---

## 🐛 DEBUGGING TIPS

### Common Issues

**Scraper not working:**
- Check website HTML structure
- Verify CSS selectors
- Test with different manga
- Check for rate limiting

**Image processing errors:**
- Verify image URL is valid
- Check image format (JPEG/PNG)
- Test with different images
- Check Sharp configuration

**API errors:**
- Check request parameters
- Verify source name
- Check API logs
- Test with curl/Postman

### Debugging Tools

```typescript
// Add debug logging
console.log('Debug:', { query, source, results });

// Test scraper directly
import { newsource } from './lib/sources/newsource';
const results = await newsource.search('naruto');
console.log(results);
```

---

## 📚 RESOURCES

### Web Scraping

- [Cheerio Documentation](https://cheerio.js.org/)
- [Axios Documentation](https://axios-http.com/)
- [CSS Selectors Reference](https://www.w3schools.com/cssref/css_selectors.asp)

### Next.js

- [Next.js Documentation](https://nextjs.org/docs)
- [API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Edge Runtime](https://nextjs.org/docs/api-reference/edge-runtime)

### Image Processing

- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [JPEG Optimization](https://web.dev/uses-optimized-images/)

---

## 🎯 CONTRIBUTION IDEAS

### Easy

- Add new manga source
- Fix typos in documentation
- Improve error messages
- Add more examples

### Medium

- Implement persistent storage (Vercel KV)
- Add reading history feature
- Improve caching strategy
- Add more image processing options

### Hard

- Implement user authentication
- Add manga recommendation system
- Create admin dashboard
- Implement advanced search filters

---

## 📧 CONTACT

- GitHub Issues: For bugs and features
- Discussions: For questions and ideas
- Email: For security issues

---

## 🙏 THANK YOU

Every contribution helps make this project better!

Your efforts are appreciated by the entire community of ESP32 manga readers! 📚✨
