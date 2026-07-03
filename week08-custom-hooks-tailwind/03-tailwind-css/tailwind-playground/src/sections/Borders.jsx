import { useState } from 'react'
import { CodeBlock } from '../components/CodeBlock'

const RADII = [
  { cls: 'rounded-none',  label: 'none',  px: '0px' },
  { cls: 'rounded-sm',    label: 'sm',    px: '2px' },
  { cls: 'rounded',       label: 'default',px:'4px' },
  { cls: 'rounded-md',    label: 'md',    px: '6px' },
  { cls: 'rounded-lg',    label: 'lg',    px: '8px' },
  { cls: 'rounded-xl',    label: 'xl',    px: '12px' },
  { cls: 'rounded-2xl',   label: '2xl',   px: '16px' },
  { cls: 'rounded-3xl',   label: '3xl',   px: '24px' },
  { cls: 'rounded-full',  label: 'full',  px: '9999px' },
]

const WIDTHS = [
  { cls: 'border',    label: '1px' },
  { cls: 'border-2',  label: '2px' },
  { cls: 'border-4',  label: '4px' },
  { cls: 'border-8',  label: '8px' },
]

const BORDER_COLORS = ['border-gray-200', 'border-blue-400', 'border-purple-400', 'border-green-400', 'border-red-400']

export function Borders() {
  const [radius, setRadius]     = useState('rounded-xl')
  const [width, setWidth]       = useState('border-2')
  const [color, setColor]       = useState('border-blue-400')

  return (
    <section id="borders">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">Borders & Radius</h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
        Border radius controls how "round" corners are. Use rounded-lg for most UI elements.
      </p>

      {/* Border radius showcase — always visible */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">Border Radius Scale</p>
        <div className="flex flex-wrap gap-4">
          {RADII.map(r => (
            <div key={r.cls} className="flex flex-col items-center gap-2">
              <div className={`${r.cls} w-16 h-16 bg-blue-500`} />
              <span className="text-[10px] font-mono text-gray-500 dark:text-slate-400">{r.cls}</span>
              <span className="text-[10px] text-gray-400 dark:text-slate-500">{r.px}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive box */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">Interactive Preview</p>
        <div className="flex flex-wrap gap-8 items-center">
          <div className={`${radius} ${width} ${color} bg-white dark:bg-slate-800 w-32 h-32 flex items-center justify-center transition-all duration-200`}>
            <span className="text-xs text-gray-400 text-center leading-relaxed">
              {radius}<br/>{width}<br/>{color}
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400 dark:text-slate-500 mb-2">Radius</p>
              <div className="flex flex-wrap gap-1">
                {RADII.map(r => (
                  <button key={r.cls} onClick={() => setRadius(r.cls)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                      radius === r.cls ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200'
                    }`}>{r.label}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-slate-500 mb-2">Width</p>
              <div className="flex gap-1">
                {WIDTHS.map(w => (
                  <button key={w.cls} onClick={() => setWidth(w.cls)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                      width === w.cls ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200'
                    }`}>{w.label}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 dark:text-slate-500 mb-2">Color</p>
              <div className="flex gap-1">
                {BORDER_COLORS.map(c => (
                  <button key={c} onClick={() => setColor(c)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                      color === c ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200'
                    }`}>{c.replace('border-', '')}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <CodeBlock className="mt-4">{`"${radius} ${width} ${color}"`}</CodeBlock>
      </div>

      {/* Guidelines */}
      <div className="pt-6 border-t border-gray-100 dark:border-slate-700">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">When to use what</p>
        <div className="grid md:grid-cols-2 gap-2 text-xs">
          {[
            ['rounded-lg', 'Inputs, buttons, small elements'],
            ['rounded-xl', 'Cards, panels, modals (most common)'],
            ['rounded-2xl', 'Large cards, hero elements'],
            ['rounded-full', 'Badges, avatars, pill buttons, tags'],
            ['rounded-none', 'Table cells, images in non-rounded containers'],
          ].map(([cls, use]) => (
            <div key={cls} className="flex gap-2 px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <code className="text-blue-600 dark:text-blue-400 shrink-0">{cls}</code>
              <span className="text-gray-500 dark:text-slate-400">{use}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
