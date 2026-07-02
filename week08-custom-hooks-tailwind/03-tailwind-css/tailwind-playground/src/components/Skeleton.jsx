// animate-pulse = pulsing gray placeholder
// Use instead of spinners — shows the SHAPE of what's loading

function SkeletonBox({ className = '' }) {
  return <div className={`bg-gray-200 dark:bg-slate-700 rounded animate-pulse ${className}`} />
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5 space-y-3">
      <SkeletonBox className="h-4 w-3/4" />
      <SkeletonBox className="h-3 w-full" />
      <SkeletonBox className="h-3 w-5/6" />
      <SkeletonBox className="h-3 w-4/6" />
    </div>
  )
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBox key={i} className={`h-3 ${i === lines - 1 ? 'w-4/6' : 'w-full'}`} />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = 'md' }) {
  const sizes = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-16 w-16' }
  return <SkeletonBox className={`${sizes[size]} rounded-full flex-shrink-0`} />
}

// Full user card skeleton — mirrors UserCard layout exactly
export function SkeletonUserCard() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5 flex gap-4">
      <SkeletonAvatar size="lg" />
      <div className="flex-1 space-y-2 py-1">
        <SkeletonBox className="h-4 w-1/2" />
        <SkeletonBox className="h-3 w-1/3" />
        <SkeletonBox className="h-3 w-full" />
        <SkeletonBox className="h-3 w-4/5" />
      </div>
    </div>
  )
}
