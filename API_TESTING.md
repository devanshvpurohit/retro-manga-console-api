# 🧪 API TESTING GUIDE

Complete guide for testing all Retro Manga Console API endpoints.

---

## 🚀 QUICK START

### Using cURL

```bash
# Set your API base URL
export API_BASE="https://your-api.vercel.app"

# Or for local testing
export API_BASE="http://localhost:3000"
```

### Using Postman

1. Import the API collection (see below)
2. Set `{{baseUrl}}` variable
3. Run tests

---

## 📡 ENDPOINT TESTS

### 1. Health Check

**Endpoint:** `GET /api/health`

**Purpose:** Verify API is running

```bash
curl "$API_BASE/api/health"
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345,
  "version": "1.0.0",
  "sources": {
    "available": ["mangataro", "comick", "mangadex", "manganato", "manganelo", "batoto"],
    "count": 6
  },
  "cache": {
    "size": 42
  }
}
```

---

### 2. List Sources

**Endpoint:** `GET /api/sources`

**Purpose:** Get available manga sources

```bash
curl "$API_BASE/api/sources"
```

**Expected Response:**
```json
{
  "sources": ["mangataro", "comick", "mangadex", "manganato", "manganelo", "batoto"],
  "default": "mangataro",
  "total": 6
}
```

---

### 3. Search Manga

**Endpoint:** `GET /api/search?q={query}&source={source}`

**Parameters:**
- `q` (required): Search query
- `source` (optional): Source name

**Test Cases:**

#### Basic Search
```bash
curl "$API_BASE/api/search?q=naruto"
```

#### Search with Source
```bash
curl "$API_BASE/api/search?q=one+piece&source=comick"
```

#### Search Special Characters
```bash
curl "$API_BASE/api/search?q=attack+on+titan&source=mangadex"
```

**Expected Response:**
```json
[
  {
    "title": "Naruto",
    "cover": "https://...",
    "url": "https://...",
    "source": "comick",
    "description": "..."
  }
]
```

**Validation:**
- Returns array of results
- Each result has title, cover, url, source
- Maximum 10 results
- Response time < 3 seconds

---

### 4. Get Chapters

**Endpoint:** `GET /api/chapters?url={manga_url}&source={source}`

**Parameters:**
- `url` (required): Manga URL or ID
- `source` (optional): Source name

**Test Cases:**

#### Comick Chapters
```bash
curl "$API_BASE/api/chapters?url=https://comick.io/comic/naruto&source=comick"
```

#### MangaDex Chapters
```bash
curl "$API_BASE/api/chapters?url=https://mangadex.org/title/abc123&source=mangadex"
```

#### Manganato Chapters
```bash
curl "$API_BASE/api/chapters?url=https://manganato.com/manga-abc123&source=manganato"
```

**Expected Response:**
```json
[
  {
    "title": "Chapter 1: Pilot",
    "url": "https://...",
    "number": "1",
    "date": "2023-01-01"
  }
]
```

**Validation:**
- Returns array of chapters
- Each chapter has title and url
- Chapters are in order
- Response time < 5 seconds

---

### 5. Get Manga Page

**Endpoint:** `GET /api/page?chapter={chapter_url}&page={page_num}&source={source}`

**Parameters:**
- `chapter` (required): Chapter URL
- `page` (required): Page number (1-indexed)
- `source` (optional): Source name
- `width` (optional): Image width (default: 320)
- `height` (optional): Image height (default: 240)
- `quality` (optional): JPEG quality (default: 40)
- `grayscale` (optional): Enable grayscale (default: true)

**Test Cases:**

#### Basic Page Request
```bash
curl "$API_BASE/api/page?chapter=https://comick.io/comic/naruto/1&page=1&source=comick" \
  --output page1.jpg
```

#### Custom Dimensions
```bash
curl "$API_BASE/api/page?chapter=https://...&page=1&width=480&height=320&quality=60" \
  --output page1_hq.jpg
```

#### Color Mode
```bash
curl "$API_BASE/api/page?chapter=https://...&page=1&grayscale=false" \
  --output page1_color.jpg
```

**Expected Response:**
- Binary JPEG image
- Content-Type: image/jpeg
- Headers:
  - `X-Page-Number`: Current page
  - `X-Total-Pages`: Total pages
  - `X-Original-Size`: Original size in bytes
  - `X-Compressed-Size`: Compressed size in bytes

**Validation:**
- Returns valid JPEG image
- File size < 100KB (for 320x240)
- Image dimensions match request
- Response time < 10 seconds

---

### 6. Get Trending

**Endpoint:** `GET /api/trending?source={source}`

**Parameters:**
- `source` (optional): Source name

**Test Cases:**

#### Default Trending
```bash
curl "$API_BASE/api/trending"
```

#### Source-Specific Trending
```bash
curl "$API_BASE/api/trending?source=comick"
curl "$API_BASE/api/trending?source=mangadex"
```

**Expected Response:**
```json
[
  {
    "title": "One Piece",
    "cover": "https://...",
    "url": "https://...",
    "source": "comick",
    "rating": "9.5",
    "views": "1000000"
  }
]
```

**Validation:**
- Returns array of manga
- Maximum 10 results
- Each has title, cover, url, source
- Response time < 3 seconds

---

### 7. Save Bookmark

**Endpoint:** `POST /api/bookmark/save`

**Body:**
```json
{
  "manga": "https://...",
  "chapter": "https://...",
  "page": 5,
  "source": "comick",
  "cover": "https://..."
}
```

**Test Cases:**

#### Save New Bookmark
```bash
curl -X POST "$API_BASE/api/bookmark/save" \
  -H "Content-Type: application/json" \
  -d '{
    "manga": "https://comick.io/comic/naruto",
    "chapter": "https://comick.io/comic/naruto/1",
    "page": 5,
    "source": "comick",
    "cover": "https://..."
  }'
```

#### Update Existing Bookmark
```bash
curl -X POST "$API_BASE/api/bookmark/save" \
  -H "Content-Type: application/json" \
  -d '{
    "manga": "https://comick.io/comic/naruto",
    "chapter": "https://comick.io/comic/naruto/1",
    "page": 10,
    "source": "comick"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "bookmark": {
    "id": "abc123",
    "manga": "https://...",
    "chapter": "https://...",
    "page": 5,
    "source": "comick",
    "timestamp": 1234567890,
    "cover": "https://..."
  }
}
```

**Validation:**
- Returns 201 status
- Bookmark has unique ID
- Timestamp is set
- Same manga/chapter updates existing bookmark

---

### 8. Get Bookmarks

**Endpoint:** `GET /api/bookmarks`

**Test Cases:**

#### Get All Bookmarks
```bash
curl "$API_BASE/api/bookmarks"
```

#### Get Bookmark Statistics
```bash
curl "$API_BASE/api/bookmarks?stats=true"
```

**Expected Response (All):**
```json
[
  {
    "id": "abc123",
    "manga": "https://...",
    "chapter": "https://...",
    "page": 5,
    "source": "comick",
    "timestamp": 1234567890,
    "cover": "https://..."
  }
]
```

**Expected Response (Stats):**
```json
{
  "total": 10,
  "bySource": {
    "comick": 5,
    "mangadex": 3,
    "manganato": 2
  },
  "latest": {
    "id": "abc123",
    "manga": "https://...",
    "timestamp": 1234567890
  }
}
```

---

### 9. Delete Bookmark

**Endpoint:** `DELETE /api/bookmarks?id={bookmark_id}`

**Test Cases:**

```bash
curl -X DELETE "$API_BASE/api/bookmarks?id=abc123"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Bookmark deleted"
}
```

---

## 🔒 AUTHENTICATION TESTING

If API token is enabled:

```bash
# Without token (should fail)
curl "$API_BASE/api/search?q=naruto"

# With token (should succeed)
curl "$API_BASE/api/search?q=naruto" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

---

## ⚡ PERFORMANCE TESTING

### Response Time Benchmarks

```bash
# Install Apache Bench
# macOS: brew install httpd
# Linux: apt-get install apache2-utils

# Test search endpoint
ab -n 100 -c 10 "$API_BASE/api/search?q=naruto"

# Test trending endpoint
ab -n 100 -c 10 "$API_BASE/api/trending?source=comick"
```

**Expected Results:**
- Search: < 2 seconds average
- Chapters: < 3 seconds average
- Page: < 8 seconds average
- Trending: < 2 seconds average

### Load Testing

```bash
# Install wrk
# macOS: brew install wrk
# Linux: apt-get install wrk

# Run load test
wrk -t4 -c100 -d30s "$API_BASE/api/search?q=test"
```

---

## 🐛 ERROR TESTING

### Missing Parameters

```bash
# Missing query
curl "$API_BASE/api/search"
# Expected: 400 Bad Request

# Missing chapter URL
curl "$API_BASE/api/page?page=1"
# Expected: 400 Bad Request
```

### Invalid Parameters

```bash
# Invalid source
curl "$API_BASE/api/search?q=naruto&source=invalid"
# Expected: 500 with error message

# Invalid page number
curl "$API_BASE/api/page?chapter=https://...&page=999"
# Expected: 404 Page not found
```

### Rate Limiting

```bash
# Send many requests quickly
for i in {1..100}; do
  curl "$API_BASE/api/search?q=test$i" &
done
wait

# Expected: Some requests return 429 Too Many Requests
```

---

## 📊 CACHE TESTING

### Verify Cache Headers

```bash
# First request (cache miss)
curl -I "$API_BASE/api/search?q=naruto"
# Expected: X-Cache: MISS

# Second request (cache hit)
curl -I "$API_BASE/api/search?q=naruto"
# Expected: X-Cache: HIT
```

### Cache Invalidation

```bash
# Wait for cache TTL (5 minutes for search)
sleep 300

# Request again (should be cache miss)
curl -I "$API_BASE/api/search?q=naruto"
# Expected: X-Cache: MISS
```

---

## 🎮 ESP32 INTEGRATION TESTING

### Test from ESP32

```cpp
// Test search
HTTPClient http;
http.begin("https://your-api.vercel.app/api/search?q=naruto&source=comick");
int code = http.GET();
Serial.println(code); // Should be 200

// Test page download
http.begin("https://your-api.vercel.app/api/page?chapter=...&page=1&source=comick");
code = http.GET();
Serial.println(code); // Should be 200
Serial.println(http.getSize()); // Should be < 100000 bytes
```

---

## 📝 POSTMAN COLLECTION

Create a Postman collection with these requests:

```json
{
  "info": {
    "name": "Retro Manga Console API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "https://your-api.vercel.app"
    }
  ],
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/health"
      }
    },
    {
      "name": "Search Manga",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{baseUrl}}/api/search?q=naruto&source=comick",
          "query": [
            {"key": "q", "value": "naruto"},
            {"key": "source", "value": "comick"}
          ]
        }
      }
    }
  ]
}
```

---

## ✅ TEST CHECKLIST

### Functional Tests
- [ ] All endpoints return 200 OK
- [ ] Search returns results
- [ ] Chapters load correctly
- [ ] Pages download as JPEG
- [ ] Bookmarks save and load
- [ ] Trending returns results

### Performance Tests
- [ ] Response times within limits
- [ ] Cache is working
- [ ] Rate limiting is active
- [ ] No memory leaks

### Error Handling
- [ ] Missing parameters return 400
- [ ] Invalid sources return 500
- [ ] Rate limit returns 429
- [ ] Not found returns 404

### Integration Tests
- [ ] ESP32 can connect
- [ ] Images display correctly
- [ ] Bookmarks persist
- [ ] All sources work

---

## 🎯 AUTOMATED TESTING

Create a test script:

```bash
#!/bin/bash
# test-api.sh

API_BASE="https://your-api.vercel.app"

echo "Testing Health..."
curl -s "$API_BASE/api/health" | jq .status

echo "Testing Search..."
curl -s "$API_BASE/api/search?q=naruto" | jq 'length'

echo "Testing Sources..."
curl -s "$API_BASE/api/sources" | jq .total

echo "Testing Trending..."
curl -s "$API_BASE/api/trending?source=comick" | jq 'length'

echo "All tests completed!"
```

Run with:
```bash
chmod +x test-api.sh
./test-api.sh
```

---

## 📧 REPORTING ISSUES

When reporting test failures, include:
- Endpoint URL
- Request parameters
- Expected response
- Actual response
- Error messages
- Response time
- Environment (local/production)

---

Happy Testing! 🧪✨
