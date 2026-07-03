import { useState } from 'react'

export function CodeBlock({ children, label, className = '' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = typeof children === 'string' ? children : String(children)
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={`relative px-4 py-3 bg-gray-900 dark:bg-slate-950 rounded-lg ${className}`}>
      {label && <p className="text-xs text-gray-500 mb-1">{label}</p>}
      <code className="text-sm text-green-400 font-mono break-all pr-20">{children}</code>
      <button
        onClick={handleCopy}
        className={`absolute top-2.5 right-3 text-xs px-2 py-0.5 rounded font-medium transition-colors ${
          copied
            ? 'bg-green-700 text-green-200'
            : 'bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-gray-200'
        }`}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  )
}
