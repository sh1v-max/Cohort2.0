import { useState, useCallback } from 'react'

import { useToggle }       from './hooks/useToggle'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useDebounce }     from './hooks/useDebounce'
import { useFetch }        from './hooks/useFetch'
import { useWindowSize }   from './hooks/useWindowSize'
import { useInterval }     from './hooks/useInterval'

import { SearchBar }    from './components/SearchBar'
import { UserCard }     from './components/UserCard'
import { BookmarkList } from './components/BookmarkList'
import { StatusBar }    from './components/StatusBar'

import './App.css'

export default function App() {
  // ── useToggle: dark/light mode ──────────────────────────────────────────────
  const [isDark, toggleDark] = useToggle(false)

  // ── useLocalStorage: bookmarks survive page refresh ──────────────────────────
  const [bookmarks, setBookmarks]         = useLocalStorage('gh-bookmarks', [])
  const [lastRefreshed, setLastRefreshed] = useLocalStorage('gh-last-refresh', null)

  // ── useDebounce: only search after user stops typing ─────────────────────────
  const [query, setQuery] = useState('')
  const debouncedQuery    = useDebounce(query, 500)

  // ── useFetch: fetches GitHub user when debouncedQuery changes ────────────────
  const url = debouncedQuery.trim()
    ? `https://api.github.com/users/${debouncedQuery.trim()}`
    : null
  const { data: user, loading, error } = useFetch(url)

  // ── useWindowSize: responsive badge ──────────────────────────────────────────
  const { width, height } = useWindowSize()

  // ── useInterval: update timestamp every 60s ──────────────────────────────────
  const [tick, setTick] = useState(0)
  useInterval(useCallback(() => {
    setLastRefreshed(Date.now())
    setTick(t => t + 1)
  }, [setLastRefreshed]), 60000)

  // ── Bookmark handlers ─────────────────────────────────────────────────────────
  const isBookmarked = (login) => bookmarks.some(b => b.login === login)

  const handleBookmark = (u) => {
    if (isBookmarked(u.login)) {
      setBookmarks(prev => prev.filter(b => b.login !== u.login))
    } else {
      setBookmarks(prev => [...prev, {
        login:      u.login,
        name:       u.name,
        avatar_url: u.avatar_url,
      }])
    }
  }

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="app-header">
        <div>
          <h1 className="app-title">GitHub Search</h1>
          <p className="app-subtitle">8 custom hooks · 1 app</p>
        </div>
        <button className="theme-toggle" onClick={toggleDark}>
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      {/* ── Status bar: useWindowSize + useInterval ──────────────────────── */}
      <StatusBar width={width} height={height} isDark={isDark} tick={tick} />

      {/* ── Main layout ─────────────────────────────────────────────────── */}
      <main className="app-main">

        {/* Left: search + result */}
        <div className="left-panel">

          {/* useDebounce + usePrevious live in SearchBar */}
          <SearchBar value={query} onChange={setQuery} loading={loading} />

          <div className="hook-legend">
            <h3>Hooks wired in this app</h3>
            <ul>
              <li><code>useToggle</code> — theme button (top-right)</li>
              <li><code>useLocalStorage</code> — bookmarks survive refresh</li>
              <li><code>useDebounce</code> — 500ms delay before API call</li>
              <li><code>useFetch</code> — loading / data / error lifecycle</li>
              <li><code>useWindowSize</code> — breakpoint in status bar</li>
              <li><code>useInterval</code> — refresh timestamp every 60s</li>
              <li><code>usePrevious</code> — "previous search" hint in SearchBar</li>
            </ul>
          </div>

          {/* useFetch states */}
          <div className="result-area">
            {!query.trim() && (
              <div className="empty-state">
                <span className="empty-icon">👤</span>
                <p>Type a GitHub username to search</p>
                <p className="empty-hint">Try: torvalds · gaearon · sindresorhus</p>
              </div>
            )}

            {query.trim() && loading && (
              <div className="loading-card">
                <div className="skeleton skeleton-avatar" />
                <div className="skeleton-lines">
                  <div className="skeleton skeleton-line-lg" />
                  <div className="skeleton skeleton-line-md" />
                  <div className="skeleton skeleton-line-sm" />
                </div>
              </div>
            )}

            {error && !loading && (
              <div className="error-state">
                <span>⚠️</span>
                <div>
                  <p className="error-title">User not found</p>
                  <p className="error-msg">{error}</p>
                </div>
              </div>
            )}

            {user && !loading && !error && (
              <UserCard
                user={user}
                isBookmarked={isBookmarked(user.login)}
                onBookmark={handleBookmark}
              />
            )}
          </div>
        </div>

        {/* Right: bookmarks panel — useLocalStorage */}
        <aside className="right-panel">
          <BookmarkList
            bookmarks={bookmarks}
            onRemove={(login) => setBookmarks(prev => prev.filter(b => b.login !== login))}
            onSelect={(login) => setQuery(login)}
            lastRefreshed={lastRefreshed}
          />
        </aside>

      </main>
    </div>
  )
}
