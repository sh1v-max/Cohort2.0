import { useState } from 'react'
import { CodeBlock } from '../components/CodeBlock'

const OPTIONS = {
  direction:  ['flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse'],
  justify:    ['justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly'],
  align:      ['items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch'],
  wrap:       ['flex-nowrap', 'flex-wrap', 'flex-wrap-reverse'],
  gap:        ['gap-0', 'gap-2', 'gap-4', 'gap-6', 'gap-8'],
}

const COLORS = ['bg-blue-400', 'bg-purple-400', 'bg-green-400', 'bg-orange-400', 'bg-pink-400']

function ControlRow({ label, options, value, onChange }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xs font-semibold text-gray-400 dark:text-slate-500 w-20 pt-1.5 shrink-0">{label}</span>
      <div className="flex flex-wrap gap-1">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
              value === opt
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Flexbox() {
  const [direction, setDirection] = useState('flex-row')
  const [justify,   setJustify]   = useState('justify-start')
  const [align,     setAlign]     = useState('items-center')
  const [wrap,      setWrap]      = useState('flex-nowrap')
  const [gap,       setGap]       = useState('gap-4')

  const classes = `flex ${direction} ${justify} ${align} ${wrap} ${gap}`

  return (
    <section id="flexbox">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">Flexbox</h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
        Click any option to change the flex container live. Flexbox controls how items are arranged inside a container.
      </p>

      {/* Live preview */}
      <div className="bg-white dark:bg-slate-800 border-2 border-dashed border-gray-200 dark:border-slate-600 rounded-xl p-4 mb-6 min-h-36 overflow-auto">
        <div className={`${classes} min-h-24`}>
          {COLORS.map((c, i) => (
            <div key={i} className={`${c} text-white font-bold text-sm w-14 h-14 rounded-xl flex items-center justify-center shrink-0`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Current class */}
      <CodeBlock label="className" className="mb-6">{`"${classes}"`}</CodeBlock>

      {/* Controls */}
      <div className="space-y-4">
        <ControlRow label="direction"  options={OPTIONS.direction} value={direction} onChange={setDirection} />
        <ControlRow label="justify"    options={OPTIONS.justify}   value={justify}   onChange={setJustify} />
        <ControlRow label="align"      options={OPTIONS.align}     value={align}     onChange={setAlign} />
        <ControlRow label="wrap"       options={OPTIONS.wrap}      value={wrap}       onChange={setWrap} />
        <ControlRow label="gap"        options={OPTIONS.gap}       value={gap}        onChange={setGap} />
      </div>

      {/* Quick reference */}
      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">When to use what</p>
        <div className="grid md:grid-cols-2 gap-2 text-xs">
          {[
            ['justify-between', 'Space between — navbar with logo + links'],
            ['justify-center', 'Center everything — hero section, empty state'],
            ['items-center', 'Vertically center — nav items, icon + text'],
            ['flex-col', 'Vertical stack — sidebar menu, form fields'],
            ['flex-wrap', 'Wrap items — tag cloud, responsive cards'],
            ['flex-1', 'Fill remaining space — main content next to sidebar'],
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
