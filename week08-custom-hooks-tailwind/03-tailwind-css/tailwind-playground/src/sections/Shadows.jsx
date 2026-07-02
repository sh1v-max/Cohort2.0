const SHADOWS = [
  { cls: 'shadow-none', label: 'none',    desc: 'Remove all shadow' },
  { cls: 'shadow-sm',   label: 'sm',      desc: 'Subtle — cards in light mode' },
  { cls: 'shadow',      label: 'default', desc: 'Standard' },
  { cls: 'shadow-md',   label: 'md',      desc: 'Hover state on cards' },
  { cls: 'shadow-lg',   label: 'lg',      desc: 'Dropdowns, popovers' },
  { cls: 'shadow-xl',   label: 'xl',      desc: 'Modals, floating panels' },
  { cls: 'shadow-2xl',  label: '2xl',     desc: 'Hero cards, dramatic lift' },
  { cls: 'shadow-inner',label: 'inner',   desc: 'Inset — pressed/focused inputs' },
]

export function Shadows() {
  return (
    <section id="shadows">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">Shadows</h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
        Shadows create depth and elevation. Pair with hover: for card lift effects.
      </p>

      {/* All shadows at once */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {SHADOWS.map(s => (
          <div key={s.cls} className="flex flex-col items-center gap-3">
            <div className={`${s.cls} bg-white dark:bg-slate-700 rounded-xl w-full h-20`} />
            <div className="text-center">
              <code className="text-xs font-mono text-blue-600 dark:text-blue-400">{s.cls}</code>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-0.5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hover pattern */}
      <div className="mb-8 p-6 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">Card Lift Pattern</p>
        <div className="flex flex-wrap gap-4">
          <div className="shadow-sm hover:shadow-md transition-shadow duration-200 bg-white dark:bg-slate-700 rounded-xl p-4 w-36 cursor-pointer">
            <p className="text-sm font-medium text-gray-900 dark:text-slate-100">Hover me</p>
            <p className="text-xs text-gray-400 mt-1">shadow-sm → hover:shadow-md</p>
          </div>
          <div className="shadow hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-700 rounded-xl p-4 w-36 cursor-pointer">
            <p className="text-sm font-medium text-gray-900 dark:text-slate-100">Hover me</p>
            <p className="text-xs text-gray-400 mt-1">shadow → hover:shadow-xl</p>
          </div>
        </div>
        <div className="mt-4 px-4 py-3 bg-gray-900 dark:bg-slate-950 rounded-lg">
          <code className="text-xs text-green-400 font-mono">"shadow-sm hover:shadow-md transition-shadow duration-200"</code>
        </div>
      </div>

      {/* Color shadows */}
      <div className="pt-6 border-t border-gray-100 dark:border-slate-700">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">Colored Shadows (Tailwind v3)</p>
        <div className="flex flex-wrap gap-4">
          {[
            { cls: 'shadow-lg shadow-blue-500/30', color: 'bg-blue-500', label: 'shadow-blue-500/30' },
            { cls: 'shadow-lg shadow-purple-500/30', color: 'bg-purple-500', label: 'shadow-purple-500/30' },
            { cls: 'shadow-lg shadow-green-500/30', color: 'bg-green-500', label: 'shadow-green-500/30' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className={`${s.cls} ${s.color} rounded-xl w-24 h-14`} />
              <code className="text-[10px] font-mono text-gray-500 dark:text-slate-400">{s.label}</code>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
