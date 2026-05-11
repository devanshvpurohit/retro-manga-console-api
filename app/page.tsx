// Landing page for Retro Manga Console API
export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      fontFamily: 'monospace',
      padding: '2rem',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '3rem',
          textAlign: 'center',
          marginBottom: '1rem',
          textShadow: '0 0 20px rgba(255,255,255,0.5)',
        }}>
          ⚡ RETRO MANGA CONSOLE ⚡
        </h1>
        
        <p style={{
          textAlign: 'center',
          fontSize: '1.2rem',
          marginBottom: '3rem',
          opacity: 0.9,
        }}>
          ESP32-Optimized Manga Proxy API
        </p>

        <div style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '2rem',
          borderRadius: '10px',
          marginBottom: '2rem',
        }}>
          <h2 style={{ marginBottom: '1rem' }}>📡 API Endpoints</h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <code style={{ color: '#00ff00' }}>GET /api/search?q=naruto&source=comick</code>
            <p style={{ marginLeft: '1rem', opacity: 0.8 }}>Search manga across sources</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <code style={{ color: '#00ff00' }}>GET /api/chapters?url=MANGA_URL&source=mangadex</code>
            <p style={{ marginLeft: '1rem', opacity: 0.8 }}>Get chapter list</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <code style={{ color: '#00ff00' }}>GET /api/page?chapter=URL&page=1&source=manganato</code>
            <p style={{ marginLeft: '1rem', opacity: 0.8 }}>Get compressed manga page (320x240 JPEG)</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <code style={{ color: '#00ff00' }}>GET /api/trending?source=comick</code>
            <p style={{ marginLeft: '1rem', opacity: 0.8 }}>Get trending manga</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <code style={{ color: '#00ff00' }}>POST /api/bookmark/save</code>
            <p style={{ marginLeft: '1rem', opacity: 0.8 }}>Save reading progress</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <code style={{ color: '#00ff00' }}>GET /api/bookmarks</code>
            <p style={{ marginLeft: '1rem', opacity: 0.8 }}>Get all bookmarks</p>
          </div>

          <div>
            <code style={{ color: '#00ff00' }}>GET /api/sources</code>
            <p style={{ marginLeft: '1rem', opacity: 0.8 }}>List available sources</p>
          </div>
        </div>

        <div style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '2rem',
          borderRadius: '10px',
          marginBottom: '2rem',
        }}>
          <h2 style={{ marginBottom: '1rem' }}>🎮 Supported Sources</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>✓ Mangataro.org</li>
            <li>✓ Comick.io</li>
            <li>✓ MangaDex.org</li>
            <li>✓ Manganato.com</li>
            <li>✓ Manganelo.com</li>
            <li>✓ Bato.to</li>
          </ul>
        </div>

        <div style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '2rem',
          borderRadius: '10px',
        }}>
          <h2 style={{ marginBottom: '1rem' }}>⚙️ ESP32 Optimizations</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>✓ 320x240 TFT display support</li>
            <li>✓ Aggressive JPEG compression (40% quality)</li>
            <li>✓ Grayscale manga mode</li>
            <li>✓ Low memory footprint</li>
            <li>✓ Edge caching</li>
            <li>✓ Rate limiting protection</li>
          </ul>
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '3rem',
          opacity: 0.7,
        }}>
          Built with Next.js 15 • Deployed on Vercel Edge
        </p>
      </div>
    </div>
  );
}
