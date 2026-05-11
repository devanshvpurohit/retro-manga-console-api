# 🎨 FRONTEND DOCUMENTATION

Interactive web interface for the Retro Manga Console API.

---

## 🌟 FEATURES

### Pages

1. **Home Page** (`/`)
   - Browse and API Docs tabs
   - Quick navigation cards
   - Source overview
   - Retro cyberpunk styling

2. **Search Page** (`/search`)
   - Real-time manga search
   - Source selection dropdown
   - Grid layout results
   - Cover image display
   - Hover effects

3. **Trending Page** (`/trending`)
   - Popular manga by source
   - Ranked display (#1, #2, etc.)
   - Rating and view counts
   - Source switching

4. **Bookmarks Page** (`/bookmarks`)
   - Saved reading progress
   - Continue reading button
   - Delete bookmarks
   - Empty state handling

---

## 🎨 DESIGN

### Color Scheme
- **Primary**: Purple gradient (#667eea → #764ba2)
- **Accent**: Neon green (#00ff00)
- **Background**: Semi-transparent black overlays
- **Text**: White with varying opacity

### Typography
- **Font**: Monospace (retro terminal style)
- **Headings**: Large, bold with text shadow
- **Body**: Clean, readable

### Layout
- **Max Width**: 1200px centered
- **Grid**: Responsive auto-fit columns
- **Cards**: Rounded corners, hover effects
- **Spacing**: Consistent padding and gaps

---

## 🚀 USAGE

### Running Locally

```bash
npm run dev
```

Visit: `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

---

## 📱 RESPONSIVE DESIGN

- **Desktop**: Multi-column grid layouts
- **Tablet**: Adaptive column counts
- **Mobile**: Single column, touch-friendly

All pages automatically adjust to screen size.

---

## 🎮 INTERACTIVE FEATURES

### Search Page
- Type manga name
- Select source
- Click search
- View results in grid
- Hover for effects

### Trending Page
- Select source from dropdown
- Auto-loads trending manga
- Ranked display
- Click to view details

### Bookmarks Page
- View all saved bookmarks
- Continue reading button
- Delete with confirmation
- Empty state with CTA

---

## 🔧 CUSTOMIZATION

### Changing Colors

Edit inline styles in each page component:

```tsx
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
```

### Adding New Pages

1. Create `app/newpage/page.tsx`
2. Add navigation link
3. Follow existing styling patterns

### Modifying Layouts

All layouts use CSS Grid:

```tsx
display: 'grid',
gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
gap: '1.5rem',
```

---

## 🎯 API INTEGRATION

### Search
```tsx
const response = await fetch(`/api/search?q=${query}&source=${source}`);
const data = await response.json();
```

### Trending
```tsx
const response = await fetch(`/api/trending?source=${source}`);
const data = await response.json();
```

### Bookmarks
```tsx
// Get all
const response = await fetch('/api/bookmarks');

// Delete
const response = await fetch(`/api/bookmarks?id=${id}`, {
  method: 'DELETE',
});
```

---

## 🎨 STYLING PATTERNS

### Card Component
```tsx
<div style={{
  background: 'rgba(0,0,0,0.3)',
  padding: '2rem',
  borderRadius: '10px',
  border: '2px solid rgba(255,255,255,0.1)',
  transition: 'all 0.3s',
}}>
```

### Button
```tsx
<button style={{
  padding: '1rem 2rem',
  background: 'rgba(0,255,0,0.3)',
  border: '2px solid rgba(0,255,0,0.5)',
  borderRadius: '5px',
  color: '#fff',
  cursor: 'pointer',
  fontFamily: 'monospace',
}}>
```

### Input
```tsx
<input style={{
  width: '100%',
  padding: '0.75rem',
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '5px',
  color: '#fff',
  fontFamily: 'monospace',
}}>
```

---

## 🔄 STATE MANAGEMENT

All pages use React hooks:

```tsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```

### Loading States
```tsx
{loading && <div>🔄 Loading...</div>}
```

### Error Handling
```tsx
{error && <div style={{ color: 'red' }}>⚠️ {error}</div>}
```

### Empty States
```tsx
{data.length === 0 && <div>No results found</div>}
```

---

## 🎭 ANIMATIONS

### Hover Effects
```tsx
onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'translateY(-5px)';
  e.currentTarget.style.borderColor = 'rgba(0,255,0,0.5)';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'translateY(0)';
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
}}
```

### Transitions
```tsx
transition: 'all 0.3s'
```

---

## 📊 PERFORMANCE

### Optimizations
- Client-side rendering for interactivity
- Lazy image loading
- Error boundaries
- Efficient state updates

### Best Practices
- Minimal re-renders
- Debounced search (can be added)
- Cached API responses
- Optimized images

---

## 🐛 TROUBLESHOOTING

### Images Not Loading
- Check CORS settings
- Verify image URLs
- Add error handling

### API Errors
- Check network tab
- Verify endpoint URLs
- Check API rate limits

### Styling Issues
- Clear browser cache
- Check inline styles
- Verify CSS specificity

---

## 🚀 DEPLOYMENT

Frontend deploys automatically with the API on Vercel.

No additional configuration needed!

---

## 📝 TODO / ENHANCEMENTS

Potential improvements:

- [ ] Add manga details page
- [ ] Implement chapter reader
- [ ] Add search history
- [ ] Implement favorites
- [ ] Add user preferences
- [ ] Dark/light mode toggle
- [ ] Keyboard shortcuts
- [ ] Infinite scroll
- [ ] Advanced filters
- [ ] Share functionality

---

## 🎉 FEATURES SUMMARY

✅ **4 Interactive Pages**  
✅ **Real-time Search**  
✅ **Trending Display**  
✅ **Bookmark Management**  
✅ **Responsive Design**  
✅ **Retro Styling**  
✅ **Hover Effects**  
✅ **Error Handling**  
✅ **Loading States**  
✅ **Empty States**  

---

## 📞 SUPPORT

For frontend issues:
- Check browser console
- Verify API is running
- Check network requests
- Review component code

---

**Enjoy browsing manga with style!** 🎮📚✨
