'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'api' | 'browse'>('browse');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      fontFamily: 'monospace',
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(0,0,0,0.3)',
        padding: '1rem 2rem',
        borderBottom: '2px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{
            fontSize: '1.5rem',
            margin: 0,
            textShadow: '0 0 10px rgba(255,255,255,0.5)',
          }}>
            ⚡ RETRO MANGA CONSOLE
          </h1>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setActiveTab('browse')}
              style={{
                background: activeTab === 'browse' ? 'rgba(255,255,255,0.2)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: 'monospace',
              }}
            >
              🎮 Browse
            </button>
            <button
              onClick={() => setActiveTab('api')}
              style={{
                background: activeTab === 'api' ? 'rgba(255,255,255,0.2)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: 'monospace',
              }}
            >
              📡 API Docs
            </button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: '2rem' }}>
        {activeTab === 'browse' ? <BrowseTab /> : <ApiDocsTab />}
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        opacity: 0.7,
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}>
        <p>Built with Next.js 15 • Deployed on Vercel Edge</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          <a href="https://github.com/devanshvpurohit/retro-manga-console-api" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff00' }}>
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

function BrowseTab() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          textShadow: '0 0 20px rgba(255,255,255,0.5)',
        }}>
          Browse Manga
        </h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
          Search and explore manga from multiple sources
        </p>
      </div>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <Link href="/search" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '2rem',
            borderRadius: '10px',
            border: '2px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            height: '100%',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.borderColor = 'rgba(0,255,0,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Search Manga</h3>
            <p style={{ opacity: 0.8, color: '#fff' }}>Find your favorite manga across 6 different sources</p>
          </div>
        </Link>

        <Link href="/trending" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '2rem',
            borderRadius: '10px',
            border: '2px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            height: '100%',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.borderColor = 'rgba(255,0,0,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔥</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Trending</h3>
            <p style={{ opacity: 0.8, color: '#fff' }}>Discover what's hot and popular right now</p>
          </div>
        </Link>

        <Link href="/bookmarks" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '2rem',
            borderRadius: '10px',
            border: '2px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s',
            height: '100%',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.borderColor = 'rgba(255,255,0,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Bookmarks</h3>
            <p style={{ opacity: 0.8, color: '#fff' }}>Continue reading from where you left off</p>
          </div>
        </Link>
      </div>

      <div style={{
        background: 'rgba(0,0,0,0.3)',
        padding: '2rem',
        borderRadius: '10px',
        marginTop: '3rem',
      }}>
        <h3 style={{ marginBottom: '1rem' }}>🎮 Supported Sources</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {['Mangataro', 'Comick', 'MangaDex', 'Manganato', 'Manganelo', 'Bato.to'].map(source => (
            <div key={source} style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '0.75rem',
              borderRadius: '5px',
              textAlign: 'center',
            }}>
              ✓ {source}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ApiDocsTab() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          textShadow: '0 0 20px rgba(255,255,255,0.5)',
        }}>
          API Documentation
        </h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
          ESP32-Optimized Manga Proxy API
        </p>
      </div>

      <div style={{
        background: 'rgba(0,0,0,0.3)',
        padding: '2rem',
        borderRadius: '10px',
        marginBottom: '2rem',
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#00ff00' }}>📡 API Endpoints</h3>
        
        {[
          { method: 'GET', path: '/api/search?q=naruto&source=comick', desc: 'Search manga across sources' },
          { method: 'GET', path: '/api/chapters?url=MANGA_URL&source=mangadex', desc: 'Get chapter list' },
          { method: 'GET', path: '/api/page?chapter=URL&page=1&source=manganato', desc: 'Get compressed manga page (320x240 JPEG)' },
          { method: 'GET', path: '/api/trending?source=comick', desc: 'Get trending manga' },
          { method: 'POST', path: '/api/bookmark/save', desc: 'Save reading progress' },
          { method: 'GET', path: '/api/bookmarks', desc: 'Get all bookmarks' },
          { method: 'GET', path: '/api/sources', desc: 'List available sources' },
        ].map((endpoint, i) => (
          <div key={i} style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{
                background: endpoint.method === 'POST' ? 'rgba(255,165,0,0.3)' : 'rgba(0,255,0,0.3)',
                padding: '0.25rem 0.5rem',
                borderRadius: '3px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
              }}>
                {endpoint.method}
              </span>
              <code style={{ color: '#00ff00', fontSize: '0.9rem' }}>{endpoint.path}</code>
            </div>
            <p style={{ marginLeft: '4.5rem', opacity: 0.8, fontSize: '0.9rem' }}>{endpoint.desc}</p>
          </div>
        ))}
      </div>

      <div style={{
        background: 'rgba(0,0,0,0.3)',
        padding: '2rem',
        borderRadius: '10px',
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#00ff00' }}>⚙️ ESP32 Optimizations</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>✓ 320x240 TFT display support</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Aggressive JPEG compression (40% quality)</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Grayscale manga mode</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Low memory footprint</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Edge caching</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Rate limiting protection</li>
        </ul>
      </div>
    </div>
  );
}
