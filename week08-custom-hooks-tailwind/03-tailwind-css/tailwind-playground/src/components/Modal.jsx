// Patterns used:
//   fixed inset-0 bg-black/50 backdrop-blur-sm  = overlay backdrop
//   flex items-center justify-center             = center the panel
//   z-50                                         = above everything
//   useClickOutside                              = close on outside click
//   Escape key listener                          = keyboard accessibility
//   body overflow:hidden                         = prevent background scroll

import { useEffect, useRef } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'

export function Modal({ isOpen, onClose, title, children, footer }) {
  const ref = useRef(null)
  useClickOutside(ref, onClose)

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        ref={ref}
        className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md animate-fade-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-slate-100">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-slate-700">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
