import { useState } from 'react'

const BREAKPOINTS = [
  { prefix: 'sm',  px: '640px',  desc: 'Large phone / small tablet' },
  { prefix: 'md',  px: '768px',  desc: 'Tablet' },
  { prefix: 'lg',  px: '1024px', desc: 'Laptop' },
  { prefix: 'xl',  px: '1280px', desc: 'Desktop' },
  { prefix: '2xl', px: '1536px', desc: 'Wide screen' },
]

const WIDTHS = [375, 640, 768, 1024, 1280]

export function Responsive() {
  const [previewWidth, setPreviewWidth] = useState(1024)

  const getActiveBp = (w) => {
    if (w >= 1536) return '2xl'
    if (w >= 1280) return 'xl'
    if (w >= 1024) return 'lg'
    if (w >= 768)  return 'md'
    if (w >= 640)  return 'sm'
    return 'base'
  }

  const activeBp = getActiveBp(previewWidth)

  const cols = previewWidth >= 768 ? (previewWidth >= 1024 ? 3 : 2) : 1

  return (
    <section id="responsive">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">Responsive Design</h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
        Tailwind is <strong>mobile-first</strong>. No prefix = applies to all sizes. Add <code className="text-blue-500">sm:</code>, <code className="text-blue-500">md:</code>, <code className="text-blue-500">lg:</code> to apply from that size UP.
      </p>

      {/* Breakpoint table */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-800">
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-400 dark:text-slate-500 rounded-tl-lg">Prefix</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-400 dark:text-slate-500">Min-width</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-400 dark:text-slate-500">Device</th>
              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-400 dark:text-slate-500 rounded-tr-lg">Active?</th>
            </tr>
          </thead>
          <tbody>
            <tr className={`border-b border-gray-100 dark:border-slate-700 ${activeBp === 'base' ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
              <td className="px-4 py-2 font-mono text-gray-400 dark:text-slate-500">(none)</td>
              <td className="px-4 py-2 text-gray-600 dark:text-slate-300">0px</td>
              <td className="px-4 py-2 text-gray-500 dark:text-slate-400">All sizes (mobile first)</td>
              <td className="px-4 py-2">{activeBp === 'base' && <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full">active</span>}</td>
            </tr>
            {BREAKPOINTS.map(bp => (
              <tr key={bp.prefix} className={`border-b border-gray-100 dark:border-slate-700 ${activeBp === bp.prefix ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400 font-medium">{bp.prefix}:</td>
                <td className="px-4 py-2 text-gray-600 dark:text-slate-300">{bp.px}</td>
                <td className="px-4 py-2 text-gray-500 dark:text-slate-400">{bp.desc}</td>
                <td className="px-4 py-2">{activeBp === bp.prefix && <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full">active</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Width simulator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
            Simulate width: <span className="text-blue-500">{previewWidth}px</span> → breakpoint: <span className="text-blue-500">{activeBp === 'base' ? '(mobile, no prefix)' : activeBp + ':'}</span>
          </p>
        </div>
        <input type="range" min={300} max={1400} value={previewWidth}
          onChange={e => setPreviewWidth(Number(e.target.value))}
          className="w-full mb-1 accent-blue-500" />
        <div className="flex justify-between text-[10px] text-gray-400 dark:text-slate-500 mb-4">
          <span>300px</span>
          <span>640 sm</span>
          <span>768 md</span>
          <span>1024 lg</span>
          <span>1400px</span>
        </div>

        {/* Simulated responsive grid */}
        <div className="bg-white dark:bg-slate-800 border-2 border-dashed border-gray-200 dark:border-slate-600 rounded-xl p-4">
          <p className="text-xs text-gray-400 dark:text-slate-500 mb-3 font-mono">
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>
            {['Card 1', 'Card 2', 'Card 3'].map(c => (
              <div key={c} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg h-16 flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-400">
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common patterns */}
      <div className="pt-6 border-t border-gray-100 dark:border-slate-700">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">Common Patterns</p>
        <div className="space-y-2 text-xs font-mono">
          {[
            ['hidden lg:block',          'Hide on mobile, show on desktop'],
            ['block lg:hidden',          'Show on mobile, hide on desktop'],
            ['text-2xl md:text-4xl',     'Text grows at breakpoints'],
            ['px-4 md:px-8 lg:px-16',   'Padding grows with screen'],
            ['flex-col md:flex-row',     'Stack on mobile, row on desktop'],
            ['grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', 'Responsive grid'],
          ].map(([cls, desc]) => (
            <div key={cls} className="flex gap-3 px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg items-start">
              <code className="text-blue-600 dark:text-blue-400 shrink-0">{cls}</code>
              <span className="text-gray-400 dark:text-slate-500 font-sans">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
