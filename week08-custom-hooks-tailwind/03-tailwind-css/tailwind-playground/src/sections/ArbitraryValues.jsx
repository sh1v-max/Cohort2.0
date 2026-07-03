import { useState } from 'react'
import { CodeBlock } from '../components/CodeBlock'

const CATEGORIES = [
  {
    label: 'Sizing',
    examples: [
      { cls: 'w-[137px]',       css: 'width: 137px',        note: 'Exact pixel width' },
      { cls: 'h-[42rem]',       css: 'height: 42rem',       note: 'Rem-based height' },
      { cls: 'w-[calc(100%-2rem)]', css: 'width: calc(100% - 2rem)', note: 'CSS calc()' },
      { cls: 'h-[calc(100vh-4rem)]', css: 'height: calc(100vh - 4rem)', note: 'Viewport calc' },
    ],
  },
  {
    label: 'Spacing',
    examples: [
      { cls: 'mt-[22px]',  css: 'margin-top: 22px',    note: 'Nudge by exact pixels' },
      { cls: 'gap-[13px]', css: 'gap: 13px',           note: 'Non-standard gap' },
      { cls: 'px-[18px]',  css: 'padding-left/right: 18px', note: 'Between scale values' },
    ],
  },
  {
    label: 'Colors',
    examples: [
      { cls: 'bg-[#ff0000]',     css: 'background-color: #ff0000', note: 'Hex color' },
      { cls: 'text-[#1a1a2e]',   css: 'color: #1a1a2e',            note: 'Custom brand color' },
      { cls: 'border-[#e2e8f0]', css: 'border-color: #e2e8f0',     note: 'Exact border shade' },
      { cls: 'bg-[rgb(14,165,233)]', css: 'background-color: rgb(14,165,233)', note: 'RGB values' },
    ],
  },
  {
    label: 'Grid & Layout',
    examples: [
      { cls: 'grid-cols-[1fr_2fr]',         css: 'grid-template-columns: 1fr 2fr',         note: 'Underscore = space inside []' },
      { cls: 'grid-cols-[200px_1fr_2fr]',   css: 'grid-template-columns: 200px 1fr 2fr',   note: 'Mixed units' },
      { cls: 'grid-rows-[auto_1fr_auto]',   css: 'grid-template-rows: auto 1fr auto',      note: 'Header/main/footer' },
    ],
  },
  {
    label: 'CSS Variables',
    examples: [
      { cls: 'bg-[var(--brand-color)]',   css: 'background-color: var(--brand-color)',   note: 'Use your CSS variable' },
      { cls: 'text-[var(--text-primary)]', css: 'color: var(--text-primary)',            note: 'Design token' },
      { cls: 'p-[var(--spacing-md)]',     css: 'padding: var(--spacing-md)',             note: 'Spacing token' },
    ],
  },
]

export function ArbitraryValues() {
  const [prop, setProp]   = useState('w')
  const [value, setValue] = useState('137px')

  const PROPS = ['w', 'h', 'mt', 'mb', 'px', 'py', 'bg', 'text', 'border', 'gap', 'top', 'left']
  const generatedClass = `${prop}-[${value || '...'}]`

  return (
    <section id="arbitrary">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">Arbitrary Values</h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">
        When Tailwind's built-in scale isn't enough, use square brackets to pass any CSS value directly.
      </p>
      <CodeBlock className="mb-6">{'w-[137px]  bg-[#ff0000]  h-[calc(100vh-4rem)]  grid-cols-[1fr_2fr]'}</CodeBlock>

      {/* Live class builder */}
      <div className="mb-8 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">Build a class</p>
        <div className="flex flex-wrap items-end gap-3 mb-4">
          <div>
            <label className="text-xs text-gray-400 dark:text-slate-500 mb-1 block">Property prefix</label>
            <select
              value={prop}
              onChange={e => setProp(e.target.value)}
              className="px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900"
            >
              {PROPS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-32">
            <label className="text-xs text-gray-400 dark:text-slate-500 mb-1 block">Value</label>
            <input
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="e.g. 137px or #ff0000"
              className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900"
            />
          </div>
        </div>
        <CodeBlock label="Generated class">{generatedClass}</CodeBlock>
        <p className="mt-3 text-xs text-gray-400 dark:text-slate-500">
          That's it. Add it to any element's <code className="text-blue-400">className</code> and Tailwind generates the CSS at build time.
        </p>
      </div>

      {/* Category examples */}
      <div className="space-y-8 mb-8">
        {CATEGORIES.map(cat => (
          <div key={cat.label}>
            <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">{cat.label}</p>
            <div className="space-y-2">
              {cat.examples.map(ex => (
                <div key={ex.cls} className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-x-4 gap-y-0.5 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg text-xs items-center">
                  <code className="font-mono text-blue-600 dark:text-blue-400 shrink-0">{ex.cls}</code>
                  <span className="font-mono text-gray-400 dark:text-slate-500 hidden md:block">→ {ex.css}</span>
                  <span className="text-gray-400 dark:text-slate-500 md:text-right">{ex.note}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Underscore rule */}
      <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-xl">
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2">Underscore = space inside brackets</p>
        <div className="space-y-2 text-xs">
          <div className="flex gap-3">
            <code className="font-mono text-blue-600 dark:text-blue-400">grid-cols-[1fr_2fr]</code>
            <span className="text-gray-500 dark:text-slate-400">→ <code>grid-template-columns: 1fr 2fr</code></span>
          </div>
          <div className="flex gap-3">
            <code className="font-mono text-blue-600 dark:text-blue-400">content-['Hello_World']</code>
            <span className="text-gray-500 dark:text-slate-400">→ <code>content: 'Hello World'</code></span>
          </div>
        </div>
      </div>

      {/* The critical rule — purging */}
      <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/40 rounded-xl">
        <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-2">Critical rule: the full class string must appear in your code</p>
        <p className="text-xs text-red-600 dark:text-red-300 mb-3">
          Tailwind scans your source files at build time. It can only detect classes that appear as complete strings — not ones assembled at runtime.
        </p>
        <div className="space-y-2 text-xs font-mono">
          <div className="flex gap-2 items-start">
            <span className="text-green-500 font-bold shrink-0">✓</span>
            <code className="text-green-600 dark:text-green-400">{'className="w-[137px]"'}</code>
            <span className="text-gray-400 font-sans ml-2">Full string → Tailwind sees it → CSS generated</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-red-500 font-bold shrink-0">✗</span>
            <code className="text-red-500">{`className={\`w-[\${size}px]\`}`}</code>
            <span className="text-gray-400 font-sans ml-2">Template literal → Tailwind can't see the class → no CSS</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="text-red-500 font-bold shrink-0">✗</span>
            <code className="text-red-500">{'className={"w-[" + size + "px]"}'}</code>
            <span className="text-gray-400 font-sans ml-2">String concat → same problem</span>
          </div>
        </div>
        <p className="text-xs text-red-600 dark:text-red-300 mt-3">
          Fix: build a lookup object with all possible complete class strings, index by key.
          That's exactly what the <a href="#colors" className="underline">Colors section</a> does with the <code>HEX</code> map.
        </p>
      </div>
    </section>
  )
}
