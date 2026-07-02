// States: default, focus (ring), error (red ring), disabled

export function Input({ label, error, helperText, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-3 py-2 text-sm rounded-lg border outline-none transition-all duration-150
          bg-white dark:bg-slate-800
          text-gray-900 dark:text-slate-100
          placeholder:text-gray-400 dark:placeholder:text-slate-500
          disabled:bg-gray-50 dark:disabled:bg-slate-900 disabled:text-gray-400 disabled:cursor-not-allowed
          ${error
            ? 'border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900'
            : 'border-gray-300 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900'
          }
          ${className}
        `}
        {...props}
      />
      {error      && <p className="text-xs text-red-500">{error}</p>}
      {helperText && !error && <p className="text-xs text-gray-400 dark:text-slate-500">{helperText}</p>}
    </div>
  )
}
