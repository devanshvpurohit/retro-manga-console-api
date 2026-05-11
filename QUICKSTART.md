# ⚡ QUICK START GUIDE

Get your Retro Manga Console API running in 5 minutes!

---

## 🚀 OPTION 1: Deploy to Vercel (Recommended)

### Step 1: One-Click Deploy

Click this button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/retro-manga-console-api)

### Step 2: Configure

- Choose a project name
- Click "Deploy"
- Wait 2-3 minutes

### Step 3: Done! 🎉

Your API is live at: `https://your-project.vercel.app`

Test it:
```bash
curl "https://your-project.vercel.app/api/search?q=naruto"
```

---

## 💻 OPTION 2: Run Locally

### Step 1: Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd retro-manga-console-api

# Install dependencies
npm install
```

### Step 2: Configure

```bash
# Copy environment file
cp .env.example .env

# Edit .env if needed (optional)
nano .env
```

### Step 3: Run

```bash
# Start development server
npm run dev
```

Your API is running at: `http://localhost:3000`

### Step 4: Test

```bash
# Test search
curl "http://localhost:3000/api/search?q=naruto"

# Test trending
curl "http://localhost:3000/api/trending?source=comick"

# Test page (save as image)
curl "http://localhost:3000/api/page?chapter=CHAPTER_URL&page=1&source=comick" --output test.jpg
```

---

## 🎮 OPTION 3: ESP32 Setup

### Step 1: Install Arduino Libraries

Open Arduino IDE and install:
- TFT_eSPI
- ArduinoJson
- JPEGDecoder

### Step 2: Configure ESP32 Code

Open `ESP32_EXAMPLE.ino` and update:

```cpp
const char* WIFI_SSID = "YourWiFiName";
const char* WIFI_PASSWORD = "YourWiFiPassword";
const char* API_BASE = "https://your-api.vercel.app";
```

### Step 3: Upload to ESP32

1. Connect ESP32 via USB
2. Select board: ESP32 Dev Module
3. Click Upload
4. Open Serial Monitor (115200 baud)

### Step 4: Test

The ESP32 will:
1. Connect to WiFi
2. Show main menu
3. Allow manga browsing with buttons

---

## 📡 API ENDPOINTS OVERVIEW

### Search Manga
```bash
GET /api/search?q=naruto&source=comick
```

### Get Chapters
```bash
GET /api/chapters?url=MANGA_URL&source=mangadex
```

### Get Page (ESP32 Optimized)
```bash
GET /api/page?chapter=CHAPTER_URL&page=1&source=manganato
```

### Get Trending
```bash
GET /api/trending?source=comick
```

### Save Bookmark
```bash
POST /api/bookmark/save
Body: {"manga": "...", "chapter": "...", "page": 5, "source": "comick"}
```

### Get Bookmarks
```bash
GET /api/bookmarks
```

### List Sources
```bash
GET /api/sources
```

---

## 🌐 SUPPORTED SOURCES

- **mangataro** - Mangataro.org
- **comick** - Comick.io (API-based, fast)
- **mangadex** - MangaDex.org (API-based, reliable)
- **manganato** - Manganato.com
- **manganelo** - Manganelo.com
- **batoto** - Bato.to

---

## 🔧 COMMON ISSUES

### "Module not found" error
```bash
rm -rf node_modules
npm install
```

### Port 3000 already in use
```bash
# Use different port
PORT=3001 npm run dev
```

### ESP32 can't connect
- Check WiFi credentials
- Verify API URL (must be HTTPS for Vercel)
- Check firewall settings

### Images not loading
- Verify chapter URL is correct
- Try different source
- Check page number is valid

---

## 📚 NEXT STEPS

1. **Read Full Documentation**: Check `README.md`
2. **Deploy to Production**: See `DEPLOYMENT.md`
3. **Test All Endpoints**: See `API_TESTING.md`
4. **Contribute**: See `CONTRIBUTING.md`

---

## 🎯 EXAMPLE WORKFLOW

### 1. Search for Manga
```bash
curl "http://localhost:3000/api/search?q=one+piece&source=comick"
```

Response:
```json
[
  {
    "title": "One Piece",
    "cover": "https://...",
    "url": "https://comick.io/comic/one-piece",
    "source": "comick"
  }
]
```

### 2. Get Chapters
```bash
curl "http://localhost:3000/api/chapters?url=https://comick.io/comic/one-piece&source=comick"
```

Response:
```json
[
  {
    "title": "Chapter 1: Romance Dawn",
    "url": "https://comick.io/comic/one-piece/1",
    "number": "1"
  }
]
```

### 3. Get Page
```bash
curl "http://localhost:3000/api/page?chapter=https://comick.io/comic/one-piece/1&page=1&source=comick" \
  --output page1.jpg
```

Result: `page1.jpg` (320x240, grayscale, ~40KB)

### 4. Save Bookmark
```bash
curl -X POST "http://localhost:3000/api/bookmark/save" \
  -H "Content-Type: application/json" \
  -d '{
    "manga": "https://comick.io/comic/one-piece",
    "chapter": "https://comick.io/comic/one-piece/1",
    "page": 5,
    "source": "comick"
  }'
```

### 5. Get Bookmarks
```bash
curl "http://localhost:3000/api/bookmarks"
```

---

## 💡 PRO TIPS

### Faster Development
```bash
# Watch for changes
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint
```

### Better Image Quality
```bash
# Higher quality (larger file)
curl "http://localhost:3000/api/page?chapter=...&page=1&quality=60"

# Color mode
curl "http://localhost:3000/api/page?chapter=...&page=1&grayscale=false"

# Custom size
curl "http://localhost:3000/api/page?chapter=...&page=1&width=480&height=320"
```

### Debugging
```bash
# Check API health
curl "http://localhost:3000/api/health"

# List available sources
curl "http://localhost:3000/api/sources"

# View logs (Vercel)
vercel logs
```

---

## 🎉 YOU'RE READY!

Your Retro Manga Console API is now running!

**Local:** `http://localhost:3000`  
**Production:** `https://your-project.vercel.app`

Start building your ESP32 manga reader! 📚✨

---

## 📞 NEED HELP?

- 📖 Full docs: `README.md`
- 🚀 Deployment: `DEPLOYMENT.md`
- 🧪 Testing: `API_TESTING.md`
- 🤝 Contributing: `CONTRIBUTING.md`
- 🐛 Issues: GitHub Issues

Happy reading! 🎮📖
