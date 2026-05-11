'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TrendingManga {
  title: string;
  cover: string;
  url: string;
  source: string;
  rating?: string;
  views?: string;
}

export default function TrendingPage() {
  const [source, setSource] = useState('comick');
  const [manga, setManga] = useState<TrendingManga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sources = ['mangataro', 'comick', 'mangadex', 'manganato', 'manganelo', 'batoto'];

  useEffect(() => {
    fetchTrending();
  }, [source]);

  const fetchTrending = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/trending?source=${source}`);
      if (!response.ok) throw new Error('Failed to fetch trending');
      const data = await response.json();
      setManga(data);
    } catch (err) {
      setError('Failed to load trending manga. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      fontFamily: 'monospace',
      padding: '2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '1.1rem' }}>
            ← Back to Home
          </Link>
          <h1 style={{
            fontSize: '2.5rem',
            marginTop: '1rem',
            marginBottom: '0.5rem',
            textShadow: '0 0 20px rgba(255,255,255,0.5)',
          }}>
            🔥 Trending Manga
          </h1>
          <p style={{ opacity: 0.9 }}>Discover what's hot and popular right now</p>
        </div>

        {/* Source Selector */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem',
        }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
            Select Source
          </label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '5px',
              color: '#fff',
              fontFamily: 'monospace',
            }}
          >
            {sources.map(s => (
              <option key={s} value={s} style={{ background: '#333' }}>{s}</option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            fontSize: '1.5rem',
          }}>
            🔄 Loading trending manga...
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(255,0,0,0.2)',
            border: '1px solid rgba(255,0,0,0.5)',
            padding: '1rem',
            borderRadius: '5px',
            marginBottom: '2rem',
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Trending Manga Grid */}
        {!loading && manga.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}>
            {manga.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'rgba(255,0,0,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                {/* Rank Badge */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'rgba(255,0,0,0.8)',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  zIndex: 1,
                }}>
                  #{i + 1}
                </div>

                {item.cover && (
                  <img
                    src={item.cover}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <div style={{ padding: '1rem' }}>
                  <h3 style={{
                    fontSize: '1rem',
                    marginBottom: '0.5rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                    {item.rating && <div>⭐ {item.rating}</div>}
                    {item.views && <div>👁️ {item.views}</div>}
                    <div style={{ marginTop: '0.5rem' }}>Source: {item.source}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && manga.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            opacity: 0.7,
          }}>
            <p style={{ fontSize: '1.2rem' }}>No trending manga found. Try a different source.</p>
          </div>
        )}
      </div>
    </div>
  );
}
