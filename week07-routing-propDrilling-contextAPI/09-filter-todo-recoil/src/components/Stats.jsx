import { useRecoilValue } from 'recoil'
import { todoListStatsState } from '../recoil/selectors'

export default function Stats() {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
    useRecoilValue(todoListStatsState)

  return (
    <div className="flex justify-between gap-2 sm:gap-4 mb-6">
      <div className="flex-1 bg-slate-50 p-3 sm:p-4 rounded-xl text-center border border-slate-200 transition-all hover:-translate-y-1 hover:shadow-md">
        <div className="text-2xl sm:text-3xl font-bold text-indigo-500 mb-1">
          {totalNum}
        </div>
        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold">
          Total
        </div>
      </div>
      <div className="flex-1 bg-slate-50 p-3 sm:p-4 rounded-xl text-center border border-slate-200 transition-all hover:-translate-y-1 hover:shadow-md">
        <div className="text-2xl sm:text-3xl font-bold text-indigo-500 mb-1">
          {totalCompletedNum}
        </div>
        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold">
          Done
        </div>
      </div>
      <div className="flex-1 bg-slate-50 p-3 sm:p-4 rounded-xl text-center border border-slate-200 transition-all hover:-translate-y-1 hover:shadow-md">
        <div className="text-2xl sm:text-3xl font-bold text-indigo-500 mb-1">
          {totalUncompletedNum}
        </div>
        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold">
          Pending
        </div>
      </div>
      <div className="flex-1 bg-slate-50 p-3 sm:p-4 rounded-xl text-center border border-slate-200 transition-all hover:-translate-y-1 hover:shadow-md">
        <div className="text-2xl sm:text-3xl font-bold text-indigo-500 mb-1">
          {percentCompleted}%
        </div>
        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-semibold">
          Completed
        </div>
      </div>
    </div>
  )
}
