# 🚀 DEPLOYMENT GUIDE

Complete guide for deploying Retro Manga Console API to Vercel.

---

## 📋 PREREQUISITES

- [Node.js 18+](https://nodejs.org/) installed
- [Git](https://git-scm.com/) installed
- [Vercel account](https://vercel.com/signup) (free tier works)
- GitHub/GitLab account (optional, for automatic deployments)

---

## 🎯 DEPLOYMENT OPTIONS

### Option 1: Deploy with Vercel CLI (Recommended)

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

#### Step 3: Deploy

```bash
# From project root directory
vercel

# For production deployment
vercel --prod
```

The CLI will guide you through:
- Project name
- Framework detection (Next.js)
- Build settings
- Environment variables

#### Step 4: Set Environment Variables

```bash
# Set environment variables
vercel env add API_TOKEN
vercel env add DEFAULT_SOURCE
vercel env add RATE_LIMIT
```

Or use the Vercel dashboard to add them.

---

### Option 2: Deploy with GitHub Integration

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/retro-manga-console-api.git
git push -u origin main
```

#### Step 2: Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### Step 3: Add Environment Variables

In Vercel project settings:
1. Go to "Settings" → "Environment Variables"
2. Add variables from `.env.example`
3. Click "Save"

#### Step 4: Deploy

Click "Deploy" - Vercel will automatically build and deploy.

---

### Option 3: One-Click Deploy

Click the button below to deploy instantly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/retro-manga-console-api)

---

## ⚙️ ENVIRONMENT VARIABLES

Configure these in Vercel dashboard or via CLI:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `API_TOKEN` | No | - | API authentication token |
| `DEFAULT_SOURCE` | No | `mangataro` | Default manga source |
| `RATE_LIMIT` | No | `60` | Requests per minute |
| `IMAGE_QUALITY` | No | `40` | JPEG quality (1-100) |
| `DISPLAY_WIDTH` | No | `320` | Target image width |
| `DISPLAY_HEIGHT` | No | `240` | Target image height |
| `GRAYSCALE_MODE` | No | `true` | Enable grayscale |
| `CACHE_TTL` | No | `300` | Cache TTL in seconds |
| `NSFW_FILTER` | No | `false` | Enable NSFW filtering |

### Setting Variables via CLI

```bash
vercel env add API_TOKEN production
vercel env add DEFAULT_SOURCE production
vercel env add RATE_LIMIT production
```

### Setting Variables via Dashboard

1. Go to your project in Vercel
2. Click "Settings"
3. Click "Environment Variables"
4. Add each variable with appropriate scope:
   - **Production**: Live deployment
   - **Preview**: Pull request previews
   - **Development**: Local development

---

## 🔧 BUILD CONFIGURATION

### vercel.json

The project includes a `vercel.json` with optimized settings:

```json
{
  "version": 2,
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30,
      "memory": 1024
    }
  }
}
```

### next.config.js

Configured for serverless deployment:

```javascript
module.exports = {
  output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}
```

---

## 🌐 CUSTOM DOMAIN

### Add Custom Domain

1. Go to Vercel project settings
2. Click "Domains"
3. Add your domain (e.g., `manga-api.yourdomain.com`)
4. Follow DNS configuration instructions

### DNS Configuration

Add these records to your DNS provider:

**For subdomain:**
```
Type: CNAME
Name: manga-api
Value: cname.vercel-dns.com
```

**For root domain:**
```
Type: A
Name: @
Value: 76.76.21.21
```

---

## 📊 MONITORING

### View Logs

```bash
# View real-time logs
vercel logs

# View logs for specific deployment
vercel logs [deployment-url]
```

### Analytics

1. Go to Vercel dashboard
2. Select your project
3. Click "Analytics" tab
4. View:
   - Request count
   - Response times
   - Error rates
   - Geographic distribution

---

## 🔄 CONTINUOUS DEPLOYMENT

### Automatic Deployments

With GitHub integration:
- **Push to main** → Production deployment
- **Pull requests** → Preview deployments
- **Commits** → Automatic builds

### Manual Deployments

```bash
# Deploy current directory
vercel

# Deploy specific branch
vercel --prod

# Deploy with specific name
vercel --name my-manga-api
```

---

## 🐛 TROUBLESHOOTING

### Build Failures

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
vercel --prod
```

**Error: TypeScript errors**
```bash
# Check types locally
npm run type-check

# Fix errors and redeploy
vercel --prod
```

### Runtime Errors

**Error: Function timeout**
- Increase timeout in `vercel.json`
- Optimize scraper performance
- Add caching

**Error: Memory limit exceeded**
- Increase memory in `vercel.json`
- Optimize image processing
- Reduce concurrent requests

### API Issues

**Error: Rate limit exceeded**
- Increase `RATE_LIMIT` environment variable
- Implement request queuing
- Use caching

**Error: Source not working**
- Check source website availability
- Update scraper selectors
- Try different source

---

## 🔒 SECURITY

### API Token Protection

Enable API token authentication:

```bash
vercel env add API_TOKEN production
# Enter a strong random token
```

Update ESP32 code:
```cpp
const char* API_TOKEN = "your-token-here";
http.addHeader("Authorization", String("Bearer ") + API_TOKEN);
```

### Rate Limiting

Adjust rate limits:

```bash
vercel env add RATE_LIMIT production
# Enter desired requests per minute (e.g., 120)
```

### CORS Configuration

CORS is enabled by default for all origins. To restrict:

Edit `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://yourdomain.com"
        }
      ]
    }
  ]
}
```

---

## 📈 PERFORMANCE OPTIMIZATION

### Edge Caching

Configured in API routes:
- Search: 5 minutes
- Chapters: 10 minutes
- Pages: 24 hours
- Trending: 10 minutes

### CDN Configuration

Vercel automatically uses global CDN. Optimize with:

```javascript
// In API routes
return NextResponse.json(data, {
  headers: {
    'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
  },
});
```

### Image Optimization

Already optimized for ESP32:
- 320x240 resolution
- 40% JPEG quality
- Grayscale mode
- MozJPEG compression

---

## 🔄 UPDATES & MAINTENANCE

### Update Dependencies

```bash
npm update
npm audit fix
vercel --prod
```

### Rollback Deployment

```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote [deployment-url]
```

### Database Migration

If switching from in-memory to Vercel KV:

1. Install Vercel KV:
```bash
vercel link
vercel env pull
```

2. Update `lib/bookmarks.ts` to use KV
3. Redeploy

---

## 📞 SUPPORT

### Vercel Support

- [Documentation](https://vercel.com/docs)
- [Community](https://github.com/vercel/vercel/discussions)
- [Status Page](https://www.vercel-status.com/)

### Project Issues

- Check GitHub issues
- Review API logs
- Test endpoints locally

---

## ✅ POST-DEPLOYMENT CHECKLIST

- [ ] API is accessible at deployment URL
- [ ] All endpoints return expected responses
- [ ] Environment variables are set correctly
- [ ] Rate limiting is working
- [ ] Image compression is functioning
- [ ] Caching is enabled
- [ ] Custom domain is configured (if applicable)
- [ ] Monitoring is set up
- [ ] ESP32 can connect and fetch data
- [ ] Bookmarks are saving correctly

---

## 🎉 SUCCESS!

Your Retro Manga Console API is now live!

**Next Steps:**
1. Test all endpoints
2. Configure ESP32 with your API URL
3. Monitor performance and errors
4. Optimize based on usage patterns

**API URL:** `https://your-project.vercel.app`

Happy reading! 📚✨
