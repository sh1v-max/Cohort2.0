// 6 variants — all dark mode ready
// rounded-full = pill shape

const variants = {
  default: 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300',
  blue:    'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  green:   'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  red:     'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  yellow:  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  purple:  'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
}

export function Badge({ variant = 'default', children }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${variants[variant]}`}>
      {children}
    </span>
  )
}
