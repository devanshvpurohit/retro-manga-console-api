'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Bookmark {
  id: string;
  manga: string;
  chapter: string;
  page: number;
  source: string;
  timestamp: number;
  cover?: string;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/bookmarks');
      if (!response.ok) throw new Error('Failed to fetch bookmarks');
      const data = await response.json();
      setBookmarks(data);
    } catch (err) {
      setError('Failed to load bookmarks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteBookmark = async (id: string) => {
    try {
      const response = await fetch(`/api/bookmarks?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete bookmark');
      setBookmarks(bookmarks.filter(b => b.id !== id));
    } catch (err) {
      alert('Failed to delete bookmark');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
            📚 My Bookmarks
          </h1>
          <p style={{ opacity: 0.9 }}>Continue reading from where you left off</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            fontSize: '1.5rem',
          }}>
            🔄 Loading bookmarks...
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

        {/* Bookmarks List */}
        {!loading && bookmarks.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '10px',
                  padding: '1.5rem',
                  border: '2px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,0,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    {bookmark.manga.split('/').pop() || 'Unknown Manga'}
                  </h3>
                  <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                    <div>📖 Page {bookmark.page}</div>
                    <div>🌐 Source: {bookmark.source}</div>
                    <div>🕒 {formatDate(bookmark.timestamp)}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => window.open(bookmark.chapter, '_blank')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'rgba(0,255,0,0.3)',
                      border: '2px solid rgba(0,255,0,0.5)',
                      borderRadius: '5px',
                      color: '#fff',
                      cursor: 'pointer',
                      fontFamily: 'monospace',
                      fontSize: '1rem',
                    }}
                  >
                    📖 Continue
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this bookmark?')) {
                        deleteBookmark(bookmark.id);
                      }
                    }}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'rgba(255,0,0,0.3)',
                      border: '2px solid rgba(255,0,0,0.5)',
                      borderRadius: '5px',
                      color: '#fff',
                      cursor: 'pointer',
                      fontFamily: 'monospace',
                      fontSize: '1rem',
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && bookmarks.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '10px',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No Bookmarks Yet</h2>
            <p style={{ opacity: 0.7, marginBottom: '2rem' }}>
              Start reading manga and save your progress to see bookmarks here
            </p>
            <Link href="/search" style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              background: 'rgba(0,255,0,0.3)',
              border: '2px solid rgba(0,255,0,0.5)',
              borderRadius: '5px',
              color: '#fff',
              textDecoration: 'none',
              fontFamily: 'monospace',
              fontSize: '1.1rem',
            }}>
              🔍 Search Manga
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
