import { useRecoilState } from 'recoil'
import { todoFilterState } from '../recoil/atoms'

export default function FilterBar() {
  const [filter, setFilter] = useRecoilState(todoFilterState)

  const updateFilter = (newFilter) => () => {
    setFilter(newFilter)
  }

  return (
    <div className="flex bg-slate-50 p-1.5 rounded-full mb-6 border border-slate-200">
      <button
        className={`flex-1 py-2 px-4 text-sm font-semibold rounded-full cursor-pointer transition-all ${filter === 'all' ? 'bg-white text-indigo-600 shadow' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'}`}
        onClick={updateFilter('all')}
      >
        All
      </button>
      <button
        className={`flex-1 py-2 px-4 text-sm font-semibold rounded-full cursor-pointer transition-all ${filter === 'pending' ? 'bg-white text-indigo-600 shadow' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'}`}
        onClick={updateFilter('pending')}
      >
        Pending
      </button>
      <button
        className={`flex-1 py-2 px-4 text-sm font-semibold rounded-full cursor-pointer transition-all ${filter === 'completed' ? 'bg-white text-indigo-600 shadow' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'}`}
        onClick={updateFilter('completed')}
      >
        Completed
      </button>
    </div>
  )
}
