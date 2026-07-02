// Variants: primary, secondary, outline, ghost, danger
// Sizes: sm, md, lg
// States: default, hover, active:scale-95, disabled, loading

const base = [
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg',
  'transition-all duration-150 active:scale-95',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
  'focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900',
].join(' ')

const variants = {
  primary:   'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100 focus:ring-gray-400',
  outline:   'border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 focus:ring-gray-400',
  ghost:     'hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-300 focus:ring-gray-400',
  danger:    'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  )
}

export function Button({ variant = 'primary', size = 'md', loading = false, disabled, children, ...props }) {
  return (
    <button
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}
