import { useState } from 'react'

const COLS = [1, 2, 3, 4, 5, 6]
const GAPS = [
  { label: 'gap-0', val: 0 },
  { label: 'gap-2', val: 8 },
  { label: 'gap-4', val: 16 },
  { label: 'gap-6', val: 24 },
  { label: 'gap-8', val: 32 },
]
const COLORS = ['bg-blue-400','bg-purple-400','bg-green-400','bg-orange-400','bg-pink-400','bg-teal-400','bg-red-400','bg-indigo-400','bg-amber-400']

export function Grid() {
  const [cols, setCols] = useState(3)
  const [gap,  setGap]  = useState('gap-4')
  const [items, setItems] = useState(9)

  return (
    <section id="grid">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">Grid</h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
        CSS Grid lets you define rows and columns. Tailwind wraps it in simple utility classes.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 mb-2">Columns</p>
          <div className="flex gap-1">
            {COLS.map(c => (
              <button key={c} onClick={() => setCols(c)}
                className={`w-8 h-8 text-sm font-medium rounded-lg transition-colors ${
                  cols === c
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200'
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 mb-2">Gap</p>
          <div className="flex gap-1">
            {GAPS.map(g => (
              <button key={g.label} onClick={() => setGap(g.label)}
                className={`px-2.5 py-1.5 text-xs font-mono rounded-lg transition-colors ${
                  gap === g.label
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200'
                }`}>
                {g.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 mb-2">Items</p>
          <div className="flex gap-1">
            {[3, 6, 9, 12].map(n => (
              <button key={n} onClick={() => setItems(n)}
                className={`w-8 h-8 text-sm font-medium rounded-lg transition-colors ${
                  items === n
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200'
                }`}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current class */}
      <div className="mb-6 px-4 py-3 bg-gray-900 dark:bg-slate-950 rounded-lg">
        <code className="text-sm text-green-400 font-mono">"grid grid-cols-{cols} {gap}"</code>
      </div>

      {/* Live grid */}
      <div className="bg-white dark:bg-slate-800 border-2 border-dashed border-gray-200 dark:border-slate-600 rounded-xl p-4 mb-8"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: GAPS.find(g => g.label === gap)?.val }}>
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className={`${COLORS[i % COLORS.length]} text-white font-bold text-sm h-16 rounded-xl flex items-center justify-center`}>
            {i + 1}
          </div>
        ))}
      </div>

      {/* Patterns */}
      <div className="pt-6 border-t border-gray-100 dark:border-slate-700">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">Common Grid Patterns</p>
        <div className="space-y-3">
          {[
            { cls: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', use: 'Responsive card grid (most common)' },
            { cls: 'grid-cols-4', use: 'Stats row (4 equal cards)' },
            { cls: 'grid-cols-3', use: 'Three-col layout (default)' },
            { cls: 'col-span-2', use: 'Item spans 2 columns' },
            { cls: 'grid-cols-[repeat(auto-fill,minmax(200px,1fr))]', use: 'Auto-fill with min 200px' },
          ].map(({ cls, use }) => (
            <div key={cls} className="flex gap-3 px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg text-xs">
              <code className="text-blue-600 dark:text-blue-400 shrink-0 font-mono">{cls}</code>
              <span className="text-gray-500 dark:text-slate-400">{use}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
