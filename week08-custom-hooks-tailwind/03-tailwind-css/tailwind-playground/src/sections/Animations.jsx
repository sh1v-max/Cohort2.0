import { useState } from 'react'
import { CodeBlock } from '../components/CodeBlock'

const ANIMS = [
  {
    cls: 'animate-spin',
    label: 'spin',
    desc: 'Continuous rotation. Use for loading spinners.',
    example: (
      <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
    ),
  },
  {
    cls: 'animate-pulse',
    label: 'pulse',
    desc: 'Slow fade in/out. Use for skeleton loaders.',
    example: <div className="w-full h-4 bg-gray-300 dark:bg-slate-600 rounded" />,
  },
  {
    cls: 'animate-bounce',
    label: 'bounce',
    desc: 'Up/down bounce. Use for attention-grabbing CTAs.',
    example: (
      <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    ),
  },
  {
    cls: 'animate-ping',
    label: 'ping',
    desc: 'Expanding ring effect. Use for notification dots.',
    example: (
      <div className="relative w-4 h-4">
        <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        <div className="relative inline-flex rounded-full h-4 w-4 bg-red-500" />
      </div>
    ),
  },
  {
    cls: 'animate-fade-in',
    label: 'fade-in',
    desc: 'Custom: fades in from bottom. Use for toasts, modals appearing.',
    example: <div className="w-24 h-10 bg-purple-500 rounded-lg" />,
    custom: true,
  },
]

const TRANSITIONS = [
  { cls: 'transition-colors duration-150',   label: 'colors fast',  desc: 'Button hover color change' },
  { cls: 'transition-colors duration-300',   label: 'colors slow',  desc: 'Theme switch' },
  { cls: 'transition-transform duration-200',label: 'transform',    desc: 'Card lift, scale effects' },
  { cls: 'transition-shadow duration-200',   label: 'shadow',       desc: 'Card hover shadow' },
  { cls: 'transition-all duration-300',      label: 'all',          desc: 'Multiple property change' },
]

export function Animations() {
  const [keys, setKeys] = useState({})

  const replay = (cls) => {
    setKeys(prev => ({ ...prev, [cls]: (prev[cls] || 0) + 1 }))
  }

  return (
    <section id="animations">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">Animations & Transitions</h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
        Tailwind has 4 built-in animations + custom ones you add in config. Transitions smooth out state changes.
      </p>

      {/* Animations */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">Built-in Animations</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ANIMS.map(a => (
            <div key={a.cls} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <code className="text-sm font-mono text-blue-600 dark:text-blue-400">{a.cls}</code>
                  {a.custom && (
                    <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded">
                      custom config
                    </span>
                  )}
                </div>
                <button
                  onClick={() => replay(a.cls)}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md transition-colors"
                >
                  Replay ↺
                </button>
              </div>
              <div className="h-16 flex items-center justify-center bg-gray-50 dark:bg-slate-900/50 rounded-lg">
                <div key={keys[a.cls] || 0} className={a.cls}>
                  {a.example}
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-400 dark:text-slate-500">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transitions */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">
          Transitions — Smooth state changes
        </p>
        <div className="space-y-3">
          {TRANSITIONS.map(t => (
            <div key={t.cls} className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg">
              <button className={`px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-700 hover:scale-105 text-white rounded-lg ${t.cls} shrink-0`}>
                Hover me
              </button>
              <div className="flex-1">
                <code className="text-xs font-mono text-blue-600 dark:text-blue-400">{t.cls}</code>
                <p className="text-xs text-gray-400 dark:text-slate-500">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Duration reference */}
      <div className="pt-6 border-t border-gray-100 dark:border-slate-700">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">Duration Guidelines</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {[
            ['duration-75',  '75ms',  'Instant feedback'],
            ['duration-150', '150ms', 'Button hover ← sweet spot'],
            ['duration-200', '200ms', 'Most transitions'],
            ['duration-300', '300ms', 'Cards, reveals'],
            ['duration-500', '500ms', 'Theme switches'],
            ['duration-700', '700ms', 'Page transitions'],
          ].map(([cls, time, use]) => (
            <div key={cls} className="px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <code className="text-blue-600 dark:text-blue-400 block">{cls}</code>
              <span className="text-gray-400">{time} — {use}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
