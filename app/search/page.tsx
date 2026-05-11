'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MangaResult {
  title: string;
  cover: string;
  url: string;
  source: string;
  description?: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('comick');
  const [results, setResults] = useState<MangaResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sources = ['mangataro', 'comick', 'mangadex', 'manganato', 'manganelo', 'batoto'];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&source=${source}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to search. Please try again.');
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
            🔍 Search Manga
          </h1>
          <p style={{ opacity: 0.9 }}>Search across 6 different manga sources</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} style={{
          background: 'rgba(0,0,0,0.3)',
          padding: '2rem',
          borderRadius: '10px',
          marginBottom: '2rem',
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              Search Query
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter manga name..."
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
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              Source
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

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              background: loading ? 'rgba(100,100,100,0.5)' : 'rgba(0,255,0,0.3)',
              border: '2px solid rgba(0,255,0,0.5)',
              borderRadius: '5px',
              color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'monospace',
              fontWeight: 'bold',
            }}
          >
            {loading ? '🔄 Searching...' : '🔍 Search'}
          </button>
        </form>

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

        {/* Results */}
        {results.length > 0 && (
          <div>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
              Found {results.length} results
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}>
              {results.map((manga, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '2px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = 'rgba(0,255,0,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  {manga.cover && (
                    <img
                      src={manga.cover}
                      alt={manga.title}
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
                      {manga.title}
                    </h3>
                    <p style={{
                      fontSize: '0.8rem',
                      opacity: 0.7,
                      marginBottom: '0.5rem',
                    }}>
                      Source: {manga.source}
                    </p>
                    {manga.description && (
                      <p style={{
                        fontSize: '0.8rem',
                        opacity: 0.6,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}>
                        {manga.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && results.length === 0 && query && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            opacity: 0.7,
          }}>
            <p style={{ fontSize: '1.2rem' }}>No results found. Try a different search term or source.</p>
          </div>
        )}
      </div>
    </div>
  );
}
