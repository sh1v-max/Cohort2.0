import { useState } from 'react'

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
          <div className="mt-4 px-4 py-3 bg-gray-900 dark:bg-slate-950 rounded-lg">
            <code className="text-xs text-green-400 font-mono">
              "bg-blue-500 hover:bg-blue-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            </code>
          </div>
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
      <div>
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">Group Hover</p>
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
        <div className="mt-3 px-4 py-3 bg-gray-900 dark:bg-slate-950 rounded-lg">
          <code className="text-xs text-green-400 font-mono">{'<div className="group"> … <p className="group-hover:text-blue-600"> … </p>'}</code>
        </div>
      </div>
    </section>
  )
}
