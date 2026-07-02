// useToast() — custom hook that manages toast state
// ToastContainer — renders all active toasts in corner
//
// Patterns:
//   fixed bottom-4 right-4 z-50   = corner position
//   transition-all opacity-0/100  = slide-in fade animation
//   setTimeout auto-dismiss        = gone after 3.5s

import { useEffect, useState, useCallback, useRef } from 'react'

// SVG icons per type
const icons = {
  success: (
    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-4 h-4 text-yellow-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  info: (
    <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

const borders = {
  success: 'border-green-200 dark:border-green-800',
  error:   'border-red-200 dark:border-red-800',
  warning: 'border-yellow-200 dark:border-yellow-800',
  info:    'border-blue-200 dark:border-blue-800',
}

function ToastItem({ id, message, type = 'info', onRemove }) {
  const [visible, setVisible] = useState(true)

  // Auto-dismiss after 3.5s
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3500)
    return () => clearTimeout(t)
  }, [])

  // Remove from DOM after fade-out animation (300ms)
  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => onRemove(id), 300)
      return () => clearTimeout(t)
    }
  }, [visible, id, onRemove])

  return (
    <div className={`
      flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg w-72
      bg-white dark:bg-slate-800 ${borders[type]}
      transition-all duration-300
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
    `}>
      <span className="mt-0.5">{icons[type]}</span>
      <p className="text-sm text-gray-700 dark:text-slate-200 flex-1">{message}</p>
      <button
        onClick={() => setVisible(false)}
        className="flex-shrink-0 p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end">
      {toasts.map(t => <ToastItem key={t.id} {...t} onRemove={onRemove} />)}
    </div>
  )
}

// Hook — returns { toast, toasts, remove }
// Usage: const { toast, toasts, remove } = useToast()
//        toast('Saved!', 'success')
//        <ToastContainer toasts={toasts} onRemove={remove} />
export function useToast() {
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)

  const remove = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = useCallback((message, type = 'info') => {
    const id = ++counter.current
    setToasts(prev => [...prev, { id, message, type }])
  }, [])

  return { toasts, toast, remove }
}
