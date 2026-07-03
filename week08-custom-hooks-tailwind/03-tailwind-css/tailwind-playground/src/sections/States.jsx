import { useState } from 'react'
import { CodeBlock } from '../components/CodeBlock'

export function States() {
  const [inputVal, setInputVal] = useState('')
  const [loading, setLoading]   = useState(false)
  const [showError, setShowError] = useState(false)

  const triggerLoad = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <section id="states">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">Interactive States</h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
        Every interactive element needs states. Tailwind handles them with prefixes like <code className="text-blue-500">hover:</code>, <code className="text-blue-500">focus:</code>, <code className="text-blue-500">active:</code>, <code className="text-blue-500">disabled:</code>.
      </p>

      {/* Button states */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">Button States</p>
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-6">
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Default */}
            <div className="flex flex-col items-center gap-2">
              <button className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg">
                Default
              </button>
              <code className="text-[10px] font-mono text-gray-400">bg-blue-500</code>
            </div>
            {/* Hover — instructional */}
            <div className="flex flex-col items-center gap-2">
              <button className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Hover me
              </button>
              <code className="text-[10px] font-mono text-gray-400">hover:bg-blue-600</code>
            </div>
            {/* Active */}
            <div className="flex flex-col items-center gap-2">
              <button className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg active:scale-95 active:bg-blue-700 transition-all">
                Click me
              </button>
              <code className="text-[10px] font-mono text-gray-400">active:scale-95</code>
            </div>
            {/* Disabled */}
            <div className="flex flex-col items-center gap-2">
              <button disabled className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                Disabled
              </button>
              <code className="text-[10px] font-mono text-gray-400">disabled:opacity-50</code>
            </div>
            {/* Loading */}
            <div className="flex flex-col items-center gap-2">
              <button onClick={triggerLoad} disabled={loading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg disabled:opacity-70 disabled:cursor-not-allowed">
                {loading && (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                )}
                {loading ? 'Loading...' : 'Click → Load'}
              </button>
              <code className="text-[10px] font-mono text-gray-400">animate-spin</code>
            </div>
          </div>
          <CodeBlock className="mt-4">{"bg-blue-500 hover:bg-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"}</CodeBlock>
        </div>
      </div>

      {/* Input states */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">Input States</p>
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-6 space-y-4">
          {/* Default */}
          <div>
            <label className="text-xs text-gray-500 dark:text-slate-400 mb-1 block">Default</label>
            <input placeholder="Default input" className="w-full max-w-xs px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 outline-none" />
            <code className="text-[10px] font-mono text-gray-400 mt-1 block">border-gray-300</code>
          </div>
          {/* Focus */}
          <div>
            <label className="text-xs text-gray-500 dark:text-slate-400 mb-1 block">Focus (click to see)</label>
            <input
              placeholder="Click to focus"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              className="w-full max-w-xs px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-500 transition-all"
            />
            <code className="text-[10px] font-mono text-gray-400 mt-1 block">focus:ring-2 focus:ring-blue-200 focus:border-blue-500</code>
          </div>
          {/* Error */}
          <div>
            <label className="text-xs text-gray-500 dark:text-slate-400 mb-1 block">
              Error <button onClick={() => setShowError(v => !v)} className="ml-2 text-blue-500 hover:underline">(toggle)</button>
            </label>
            <input placeholder="Error state" className={`w-full max-w-xs px-3 py-2 text-sm border rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 outline-none transition-all ${
              showError
                ? 'border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900'
                : 'border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
            }`} />
            {showError && <p className="text-xs text-red-500 mt-1">This field is required</p>}
            <code className="text-[10px] font-mono text-gray-400 mt-1 block">border-red-400 focus:ring-red-200</code>
          </div>
          {/* Disabled */}
          <div>
            <label className="text-xs text-gray-500 dark:text-slate-400 mb-1 block">Disabled</label>
            <input disabled value="Can't edit this" className="w-full max-w-xs px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-400 dark:text-slate-500 cursor-not-allowed outline-none" />
            <code className="text-[10px] font-mono text-gray-400 mt-1 block">disabled:bg-gray-50 disabled:cursor-not-allowed</code>
          </div>
        </div>
      </div>

      {/* Group hover */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">group-hover: — style children when parent is hovered</p>
        <div className="group bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5 cursor-pointer hover:border-blue-200 dark:hover:border-blue-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Hover this card
              </p>
              <p className="text-xs text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-300 transition-colors mt-0.5">
                Children styled via <code>group-hover:</code> on parent
              </p>
            </div>
            <svg className="w-4 h-4 text-gray-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <CodeBlock className="mt-3">{'<div className="group"> … <p className="group-hover:text-blue-600"> … </p>'}</CodeBlock>
      </div>

      {/* Peer modifier */}
      <div>
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">peer — style an element based on a sibling's state</p>
        <p className="text-xs text-gray-400 dark:text-slate-500 mb-4">
          <code className="text-blue-500">peer</code> marks an element. Any following sibling can use <code className="text-blue-500">peer-*:</code> to react to its state. Most useful for checkbox toggles and input validation labels.
        </p>

        {/* Peer checkbox demo */}
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5 space-y-5">
          {/* Toggle label */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400 dark:text-slate-500 mb-2">Check the box — the label reacts</p>
            {/* peer only works on siblings — the label text and track color are siblings of the input */}
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <input type="checkbox" className="peer sr-only" />
              {/* This div IS a sibling of peer ✓ */}
              <div className="w-10 h-6 rounded-full bg-gray-200 dark:bg-slate-600 peer-checked:bg-blue-500 transition-colors flex items-center px-1">
                <div className="w-4 h-4 rounded-full bg-white shadow" />
              </div>
              {/* This span IS a sibling of peer ✓ */}
              <span className="text-sm text-gray-500 dark:text-slate-400 peer-checked:text-blue-600 dark:peer-checked:text-blue-400 font-medium transition-colors">
                Enable feature
              </span>
            </label>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">
              Note: <code>peer-*:</code> only works on <strong>siblings</strong> that come <strong>after</strong> the peer element in the DOM.
            </p>
            <CodeBlock className="mt-2">{'<input className="peer sr-only" />\n<div className="peer-checked:bg-blue-500">track</div>\n<span className="peer-checked:text-blue-600">Label</span>'}</CodeBlock>
          </div>

          {/* Input + error label */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400 dark:text-slate-500 mb-2">Input validation — error label appears on :invalid</p>
            <div>
              <input
                type="email"
                placeholder="your@email.com"
                className="peer block w-full max-w-xs px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 invalid:border-red-400 invalid:focus:ring-red-200"
              />
              <p className="mt-1 text-xs text-red-500 opacity-0 peer-invalid:opacity-100 transition-opacity">
                Please enter a valid email
              </p>
            </div>
            <CodeBlock>{'<input className="peer" type="email" />\n<p className="peer-invalid:opacity-100 opacity-0">Error</p>'}</CodeBlock>
          </div>
        </div>
      </div>
    </section>
  )
}
