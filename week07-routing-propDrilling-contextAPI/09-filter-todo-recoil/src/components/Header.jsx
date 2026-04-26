import { CheckSquare } from 'lucide-react'

export default function Header() {
  return (
    <div className="text-center mb-2">
      <h1 className="text-4xl font-bold text-slate-900 tracking-tight flex items-center justify-center gap-2">
        <CheckSquare className="text-indigo-500" size={36} />
        Tasks
      </h1>
      <p className="text-slate-500 mt-2 text-sm sm:text-base">
        Stay organized and manage your day.
      </p>
    </div>
  )
}
