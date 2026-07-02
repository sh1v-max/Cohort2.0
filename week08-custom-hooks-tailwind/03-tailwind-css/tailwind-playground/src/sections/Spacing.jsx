import { useState } from 'react'

const STEPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32]
const PX    = { 0:0,1:4,2:8,3:12,4:16,5:20,6:24,7:28,8:32,9:36,10:40,11:44,12:48,14:56,16:64,20:80,24:96,28:112,32:128 }

export function Spacing() {
  const [paddingIdx, setPaddingIdx] = useState(4)  // p-4
  const [marginIdx,  setMarginIdx]  = useState(4)
  const [gapIdx,     setGapIdx]     = useState(4)

  const p = STEPS[paddingIdx]
  const m = STEPS[marginIdx]
  const g = STEPS[gapIdx]

  return (
    <section id="spacing">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">Spacing</h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
        Tailwind's spacing scale is base-4 (1 unit = 4px). Drag the sliders to see padding, margin, and gap live.
      </p>

      {/* Scale reference */}
      <div className="mb-8 overflow-x-auto">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">Full Scale</p>
        <div className="flex items-end gap-1">
          {[1,2,3,4,5,6,7,8,9,10,11,12,14,16,20,24].map(n => (
            <div key={n} className="flex flex-col items-center gap-1">
              <div
                className="bg-blue-400 dark:bg-blue-500 rounded-sm w-6"
                style={{ height: PX[n] / 2 + 4 }}
              />
              <span className="text-[9px] text-gray-400 dark:text-slate-500">{n}</span>
              <span className="text-[9px] text-gray-300 dark:text-slate-600">{PX[n]}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Padding demo */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-sm font-semibold text-gray-900 dark:text-slate-100">Padding</span>
            <code className="ml-3 px-2 py-0.5 bg-gray-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 text-xs rounded font-mono">p-{p}</code>
            <span className="ml-2 text-xs text-gray-400 dark:text-slate-500">= {PX[p]}px</span>
          </div>
          <input type="range" min={0} max={STEPS.length - 1} value={paddingIdx}
            onChange={e => setPaddingIdx(Number(e.target.value))}
            className="w-40 accent-blue-500" />
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl inline-block" style={{ padding: PX[p] }}>
          <div className="bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-lg whitespace-nowrap">
            Content box
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-400 dark:text-slate-500">
          Blue area = padding ({PX[p]}px). The content box stays the same size.
        </p>
      </div>

      {/* Margin demo */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-sm font-semibold text-gray-900 dark:text-slate-100">Margin</span>
            <code className="ml-3 px-2 py-0.5 bg-gray-100 dark:bg-slate-700 text-purple-600 dark:text-purple-400 text-xs rounded font-mono">m-{m}</code>
            <span className="ml-2 text-xs text-gray-400 dark:text-slate-500">= {PX[m]}px</span>
          </div>
          <input type="range" min={0} max={STEPS.length - 1} value={marginIdx}
            onChange={e => setMarginIdx(Number(e.target.value))}
            className="w-40 accent-purple-500" />
        </div>
        <div className="bg-gray-100 dark:bg-slate-700/50 rounded-xl">
          <div className="bg-purple-500 text-white text-xs font-medium px-4 py-2 rounded-lg inline-block whitespace-nowrap"
            style={{ margin: PX[m] }}>
            Content box
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-400 dark:text-slate-500">
          Gray area = space around box. Margin pushes element away from neighbors ({PX[m]}px).
        </p>
      </div>

      {/* Gap demo */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-sm font-semibold text-gray-900 dark:text-slate-100">Gap (flex/grid)</span>
            <code className="ml-3 px-2 py-0.5 bg-gray-100 dark:bg-slate-700 text-green-600 dark:text-green-400 text-xs rounded font-mono">gap-{g}</code>
            <span className="ml-2 text-xs text-gray-400 dark:text-slate-500">= {PX[g]}px</span>
          </div>
          <input type="range" min={0} max={STEPS.length - 1} value={gapIdx}
            onChange={e => setGapIdx(Number(e.target.value))}
            className="w-40 accent-green-500" />
        </div>
        <div className="flex flex-wrap" style={{ gap: PX[g] }}>
          {['A', 'B', 'C', 'D', 'E', 'F'].map(l => (
            <div key={l} className="bg-green-500 text-white text-sm font-bold w-12 h-12 rounded-lg flex items-center justify-center">
              {l}
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-400 dark:text-slate-500">
          gap-{g} = {PX[g]}px between each flex/grid item. Works with both flex and grid.
        </p>
      </div>

      {/* Directional cheatsheet */}
      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-3">Directional Variants</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono">
          {[
            ['p-4', 'all sides'],
            ['px-4', 'left + right'],
            ['py-4', 'top + bottom'],
            ['pt-4', 'top only'],
            ['pb-4', 'bottom only'],
            ['pl-4', 'left only'],
            ['pr-4', 'right only'],
            ['mx-auto', 'center horizontally'],
            ['space-y-4', 'gap between children (y)'],
          ].map(([cls, desc]) => (
            <div key={cls} className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <code className="text-blue-600 dark:text-blue-400">{cls}</code>
              <span className="text-gray-400 dark:text-slate-500">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
