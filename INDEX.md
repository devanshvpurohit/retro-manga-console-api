# 📖 DOCUMENTATION INDEX

Quick navigation for all Retro Manga Console API documentation.

---

## 🚀 GETTING STARTED

### New Users Start Here

1. **[QUICKSTART.md](QUICKSTART.md)** ⭐ START HERE
   - 5-minute setup guide
   - Three deployment options
   - Basic usage examples
   - Common issues

2. **[README.md](README.md)** 📚 MAIN DOCS
   - Complete feature overview
   - API endpoint documentation
   - ESP32 integration guide
   - Architecture details

---

## 📡 DEPLOYMENT

### Production Deployment

3. **[DEPLOYMENT.md](DEPLOYMENT.md)** 🚀 DEPLOY
   - Vercel CLI deployment
   - GitHub integration
   - Environment configuration
   - Custom domains
   - Monitoring & logs

4. **[scripts/deploy.sh](scripts/deploy.sh)** 🤖 AUTOMATION
   - Automated deployment script
   - Type checking
   - Linting
   - One-command deploy

---

## 🧪 TESTING

### Quality Assurance

5. **[API_TESTING.md](API_TESTING.md)** 🧪 TESTING
   - Complete testing guide
   - All endpoint tests
   - Performance testing
   - Error handling tests
   - Postman collection

6. **[scripts/test-api.sh](scripts/test-api.sh)** ⚡ QUICK TEST
   - Automated test suite
   - Validates all endpoints
   - Color-coded results

---

## 🤝 CONTRIBUTING

### For Developers

7. **[CONTRIBUTING.md](CONTRIBUTING.md)** 🛠️ CONTRIBUTE
   - How to contribute
   - Adding new manga sources
   - Code style guide
   - Pull request process
   - Development setup

8. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** 📊 OVERVIEW
   - Complete project overview
   - Feature checklist
   - Architecture details
   - Tech stack

---

## 🎮 ESP32 INTEGRATION

### Hardware Setup

9. **[ESP32_EXAMPLE.ino](ESP32_EXAMPLE.ino)** 🎮 ARDUINO CODE
   - Complete ESP32 sketch
   - TFT display support
   - Button controls
   - WiFi integration
   - Image rendering

---

## 📋 REFERENCE

### Configuration & Setup

10. **[.env.example](.env.example)** ⚙️ CONFIG
    - Environment variables
    - Configuration options
    - Default values

11. **[package.json](package.json)** 📦 DEPENDENCIES
    - NPM dependencies
    - Scripts
    - Project metadata

12. **[vercel.json](vercel.json)** 🌐 VERCEL CONFIG
    - Deployment settings
    - Function configuration
    - Headers & caching

13. **[tsconfig.json](tsconfig.json)** 📘 TYPESCRIPT
    - TypeScript configuration
    - Compiler options
    - Path aliases

14. **[LICENSE](LICENSE)** ⚖️ LICENSE
    - MIT License
    - Usage terms

---

## 🗂️ CODE STRUCTURE

### Core Libraries

```
lib/
├── types.ts              # TypeScript definitions
├── scraper.ts            # Scraping utilities
├── image.ts              # Image processing
├── cache.ts              # Caching system
├── rateLimit.ts          # Rate limiting
├── bookmarks.ts          # Bookmark storage
├── sourceManager.ts      # Source routing
└── middleware.ts         # API middleware
```

### Manga Sources

```
lib/sources/
├── mangataro.ts          # Mangataro.org
├── comick.ts             # Comick.io
├── mangadex.ts           # MangaDex.org
├── manganato.ts          # Manganato.com
├── manganelo.ts          # Manganelo.com
└── batoto.ts             # Bato.to
```

### API Routes

```
app/api/
├── search/route.ts       # Search manga
├── chapters/route.ts     # Get chapters
├── page/route.ts         # Get pages
├── trending/route.ts     # Trending manga
├── recent/route.ts       # Recent updates
├── bookmark/save/route.ts # Save bookmark
├── bookmarks/route.ts    # Get bookmarks
├── sources/route.ts      # List sources
└── health/route.ts       # Health check
```

---

## 📚 QUICK LINKS

### Most Used Documents

| Document | Purpose | When to Use |
|----------|---------|-------------|
| [QUICKSTART.md](QUICKSTART.md) | Fast setup | First time setup |
| [README.md](README.md) | Full docs | Learning the API |
| [API_TESTING.md](API_TESTING.md) | Testing | Validating deployment |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deploy | Going to production |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Develop | Adding features |

---

## 🎯 BY USE CASE

### I want to...

#### Deploy the API
1. Read [QUICKSTART.md](QUICKSTART.md)
2. Follow [DEPLOYMENT.md](DEPLOYMENT.md)
3. Run [scripts/deploy.sh](scripts/deploy.sh)

#### Test the API
1. Read [API_TESTING.md](API_TESTING.md)
2. Run [scripts/test-api.sh](scripts/test-api.sh)
3. Check [README.md](README.md) for endpoint docs

#### Build ESP32 Device
1. Read [README.md](README.md) ESP32 section
2. Use [ESP32_EXAMPLE.ino](ESP32_EXAMPLE.ino)
3. Configure [.env.example](.env.example)

#### Add New Manga Source
1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Check existing sources in `lib/sources/`
3. Follow the template

#### Understand the Code
1. Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
2. Check [README.md](README.md) architecture
3. Browse source code

---

## 🔍 SEARCH BY TOPIC

### API Endpoints
- [README.md](README.md) - Complete API documentation
- [API_TESTING.md](API_TESTING.md) - Testing examples

### Configuration
- [.env.example](.env.example) - Environment variables
- [vercel.json](vercel.json) - Vercel settings
- [next.config.js](next.config.js) - Next.js config

### Development
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development guide
- [package.json](package.json) - Dependencies
- [tsconfig.json](tsconfig.json) - TypeScript config

### Deployment
- [DEPLOYMENT.md](DEPLOYMENT.md) - Full deployment guide
- [QUICKSTART.md](QUICKSTART.md) - Quick deploy
- [scripts/deploy.sh](scripts/deploy.sh) - Deploy script

### Testing
- [API_TESTING.md](API_TESTING.md) - Testing guide
- [scripts/test-api.sh](scripts/test-api.sh) - Test script

### Hardware
- [ESP32_EXAMPLE.ino](ESP32_EXAMPLE.ino) - Arduino code
- [README.md](README.md) - ESP32 integration

---

## 📖 READING ORDER

### For First-Time Users

1. **[QUICKSTART.md](QUICKSTART.md)** - Get it running (5 min)
2. **[README.md](README.md)** - Understand features (15 min)
3. **[API_TESTING.md](API_TESTING.md)** - Test it works (10 min)
4. **[ESP32_EXAMPLE.ino](ESP32_EXAMPLE.ino)** - Build device (30 min)

### For Developers

1. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Overview
2. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development guide
3. **Source code** - Implementation details
4. **[API_TESTING.md](API_TESTING.md)** - Testing

### For DevOps

1. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment
2. **[vercel.json](vercel.json)** - Configuration
3. **[.env.example](.env.example)** - Environment
4. **[scripts/deploy.sh](scripts/deploy.sh)** - Automation

---

## 🆘 TROUBLESHOOTING

### Common Issues

| Issue | Solution | Document |
|-------|----------|----------|
| Can't deploy | Check Node version | [DEPLOYMENT.md](DEPLOYMENT.md) |
| API errors | Test endpoints | [API_TESTING.md](API_TESTING.md) |
| ESP32 won't connect | Check WiFi/URL | [README.md](README.md) |
| Build fails | Check dependencies | [QUICKSTART.md](QUICKSTART.md) |
| Source not working | Try different source | [README.md](README.md) |

---

## 📞 SUPPORT

### Where to Get Help

- **General Questions**: [README.md](README.md)
- **Setup Issues**: [QUICKSTART.md](QUICKSTART.md)
- **Deployment Problems**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **API Issues**: [API_TESTING.md](API_TESTING.md)
- **Development**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Bug Reports**: GitHub Issues

---

## ✅ CHECKLIST

### Pre-Deployment
- [ ] Read [QUICKSTART.md](QUICKSTART.md)
- [ ] Configure [.env.example](.env.example)
- [ ] Run [scripts/test-api.sh](scripts/test-api.sh)
- [ ] Review [DEPLOYMENT.md](DEPLOYMENT.md)

### Post-Deployment
- [ ] Test all endpoints ([API_TESTING.md](API_TESTING.md))
- [ ] Configure ESP32 ([ESP32_EXAMPLE.ino](ESP32_EXAMPLE.ino))
- [ ] Monitor logs (see [DEPLOYMENT.md](DEPLOYMENT.md))
- [ ] Update documentation if needed

---

## 🎉 YOU'RE ALL SET!

Everything you need is documented. Start with [QUICKSTART.md](QUICKSTART.md)!

```
╔═══════════════════════════════════════════════════════════╗
║        ⚡ RETRO MANGA CONSOLE - DOCUMENTATION ⚡         ║
║                                                           ║
║  📚 Complete • 🚀 Production Ready • 🎮 ESP32 Optimized  ║
╚═══════════════════════════════════════════════════════════╝
```

**Happy Reading!** 📖✨
