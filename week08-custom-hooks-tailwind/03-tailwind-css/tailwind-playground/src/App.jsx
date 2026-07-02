import { useEffect, useState, useCallback } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'

import { Colors }      from './sections/Colors'
import { Typography }  from './sections/Typography'
import { Spacing }     from './sections/Spacing'
import { Flexbox }     from './sections/Flexbox'
import { Grid }        from './sections/Grid'
import { Borders }     from './sections/Borders'
import { Shadows }     from './sections/Shadows'
import { States }      from './sections/States'
import { Animations }  from './sections/Animations'
import { Responsive }  from './sections/Responsive'
import { Components }  from './sections/Components'

const SECTIONS = [
  { id: 'colors',      label: 'Colors',        icon: '🎨' },
  { id: 'typography',  label: 'Typography',    icon: '✍️' },
  { id: 'spacing',     label: 'Spacing',       icon: '↔️' },
  { id: 'flexbox',     label: 'Flexbox',       icon: '⬛' },
  { id: 'grid',        label: 'Grid',          icon: '⊞' },
  { id: 'borders',     label: 'Borders',       icon: '▣' },
  { id: 'shadows',     label: 'Shadows',       icon: '◈' },
  { id: 'states',      label: 'States',        icon: '⚡' },
  { id: 'animations',  label: 'Animations',    icon: '✨' },
  { id: 'responsive',  label: 'Responsive',    icon: '📱' },
  { id: 'components',  label: 'Components',    icon: '🧩' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function App() {
  const [isDark, setIsDark] = useLocalStorage('tw-playground-dark', false)
  const [active, setActive]  = useState('colors')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Apply dark mode class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  // Track active section on scroll using IntersectionObserver
  useEffect(() => {
    const observers = []
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-20% 0px -70% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-200 font-sans">

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/60 dark:border-slate-700/60 flex items-center px-4 gap-4">
        {/* Hamburger (mobile) */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400 transition-colors"
          onClick={() => setSidebarOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Brand */}
        <div className="flex items-center gap-2 flex-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
            TW
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900 dark:text-slate-100">Tailwind Playground</span>
            <span className="hidden sm:inline ml-2 text-xs text-gray-400 dark:text-slate-500">— interactive learning tool</span>
          </div>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDark(v => !v)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
        >
          {isDark ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Light
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              Dark
            </>
          )}
        </button>
      </header>

      <div className="flex">
        {/* ── Sidebar overlay (mobile) ─────────────────────────────────────── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Sidebar ──────────────────────────────────────────────────────── */}
        <aside className={[
          'fixed top-14 left-0 z-30 h-[calc(100vh-3.5rem)] w-56 overflow-y-auto',
          'bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700/60',
          'transition-transform duration-200 ease-in-out',
          'lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}>
          <nav className="p-3 space-y-0.5">
            <p className="px-3 pt-3 pb-2 text-[10px] font-semibold text-gray-400 dark:text-slate-600 uppercase tracking-wider">
              Sections
            </p>
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => { scrollTo(s.id); setSidebarOpen(false) }}
                className={[
                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left',
                  active === s.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800',
                ].join(' ')}
              >
                <span className="text-base leading-none w-5 text-center">{s.icon}</span>
                {s.label}
                {active === s.id && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                )}
              </button>
            ))}
          </nav>

          {/* Footer in sidebar */}
          <div className="px-4 py-4 mt-4 border-t border-gray-100 dark:border-slate-800">
            <p className="text-[10px] text-gray-400 dark:text-slate-600 leading-relaxed">
              Week 8 · 100xDevs Cohort 2.0<br />
              Tailwind CSS v3 · React 19 · Vite
            </p>
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <main className="flex-1 lg:ml-56 min-h-[calc(100vh-3.5rem)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-20">
            <Colors />
            <div className="border-t border-gray-100 dark:border-slate-800" />
            <Typography />
            <div className="border-t border-gray-100 dark:border-slate-800" />
            <Spacing />
            <div className="border-t border-gray-100 dark:border-slate-800" />
            <Flexbox />
            <div className="border-t border-gray-100 dark:border-slate-800" />
            <Grid />
            <div className="border-t border-gray-100 dark:border-slate-800" />
            <Borders />
            <div className="border-t border-gray-100 dark:border-slate-800" />
            <Shadows />
            <div className="border-t border-gray-100 dark:border-slate-800" />
            <States />
            <div className="border-t border-gray-100 dark:border-slate-800" />
            <Animations />
            <div className="border-t border-gray-100 dark:border-slate-800" />
            <Responsive />
            <div className="border-t border-gray-100 dark:border-slate-800" />
            <Components />
            <div className="h-24" />
          </div>
        </main>
      </div>
    </div>
  )
}
