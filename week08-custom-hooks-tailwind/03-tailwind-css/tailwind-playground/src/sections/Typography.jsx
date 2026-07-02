import { useState } from 'react'

const SIZES = [
  { label: 'xs',   cls: 'text-xs',   px: '12px' },
  { label: 'sm',   cls: 'text-sm',   px: '14px' },
  { label: 'base', cls: 'text-base', px: '16px' },
  { label: 'lg',   cls: 'text-lg',   px: '18px' },
  { label: 'xl',   cls: 'text-xl',   px: '20px' },
  { label: '2xl',  cls: 'text-2xl',  px: '24px' },
  { label: '3xl',  cls: 'text-3xl',  px: '30px' },
  { label: '4xl',  cls: 'text-4xl',  px: '36px' },
  { label: '5xl',  cls: 'text-5xl',  px: '48px' },
  { label: '6xl',  cls: 'text-6xl',  px: '60px' },
]

const WEIGHTS = [
  { label: 'thin',       cls: 'font-thin',       num: '100' },
  { label: 'light',      cls: 'font-light',      num: '300' },
  { label: 'normal',     cls: 'font-normal',     num: '400' },
  { label: 'medium',     cls: 'font-medium',     num: '500' },
  { label: 'semibold',   cls: 'font-semibold',   num: '600' },
  { label: 'bold',       cls: 'font-bold',       num: '700' },
  { label: 'extrabold',  cls: 'font-extrabold',  num: '800' },
  { label: 'black',      cls: 'font-black',      num: '900' },
]

const LEADINGS = [
  { label: 'none',    cls: 'leading-none',    val: '1' },
  { label: 'tight',   cls: 'leading-tight',   val: '1.25' },
  { label: 'snug',    cls: 'leading-snug',    val: '1.375' },
  { label: 'normal',  cls: 'leading-normal',  val: '1.5' },
  { label: 'relaxed', cls: 'leading-relaxed', val: '1.625' },
  { label: 'loose',   cls: 'leading-loose',   val: '2' },
]

const TRACKINGS = [
  { label: 'tighter', cls: 'tracking-tighter', val: '-0.05em' },
  { label: 'tight',   cls: 'tracking-tight',   val: '-0.025em' },
  { label: 'normal',  cls: 'tracking-normal',  val: '0em' },
  { label: 'wide',    cls: 'tracking-wide',    val: '0.025em' },
  { label: 'wider',   cls: 'tracking-wider',   val: '0.05em' },
  { label: 'widest',  cls: 'tracking-widest',  val: '0.1em' },
]

function OptionRow({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs font-semibold text-gray-400 dark:text-slate-500 w-20 shrink-0">{label}</span>
      <div className="flex flex-wrap gap-1">
        {options.map(opt => (
          <button
            key={opt.cls}
            onClick={() => onChange(opt.cls)}
            className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
              value === opt.cls
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Typography() {
  const [size, setSize]       = useState('text-4xl')
  const [weight, setWeight]   = useState('font-bold')
  const [leading, setLeading] = useState('leading-tight')
  const [tracking, setTracking] = useState('tracking-normal')

  const classes = `${size} ${weight} ${leading} ${tracking} text-gray-900 dark:text-slate-100`

  return (
    <section id="typography">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1">Typography</h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
        Click any option to apply it live. See the class name below.
      </p>

      {/* Live preview */}
      <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-8 mb-6 min-h-32 flex items-center">
        <p className={classes}>
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>

      {/* Current class */}
      <div className="mb-6 px-4 py-3 bg-gray-900 dark:bg-slate-950 rounded-lg">
        <p className="text-xs text-gray-400 mb-1">className</p>
        <code className="text-sm text-green-400 font-mono break-all">"{classes}"</code>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <OptionRow label="font-size"      options={SIZES}     value={size}     onChange={setSize} />
        <OptionRow label="font-weight"    options={WEIGHTS}   value={weight}   onChange={setWeight} />
        <OptionRow label="line-height"    options={LEADINGS}  value={leading}  onChange={setLeading} />
        <OptionRow label="letter-spacing" options={TRACKINGS} value={tracking} onChange={setTracking} />
      </div>

      {/* Full scale reference */}
      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
        <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">Full Size Scale</p>
        <div className="space-y-3">
          {SIZES.map(s => (
            <div key={s.cls} className="flex items-baseline gap-4">
              <span className="w-16 text-xs font-mono text-gray-400 dark:text-slate-500 shrink-0">{s.cls}</span>
              <span className="w-12 text-xs text-gray-300 dark:text-slate-600 shrink-0">{s.px}</span>
              <span className={`${s.cls} font-semibold text-gray-900 dark:text-slate-100 leading-none`}>Aa</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
