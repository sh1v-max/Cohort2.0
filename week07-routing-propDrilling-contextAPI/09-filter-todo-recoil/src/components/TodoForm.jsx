import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { todoListState } from '../recoil/atoms'
import { Plus } from 'lucide-react'

export default function TodoForm() {
  const [inputValue, setInputValue] = useState('')
  const setTodoList = useSetRecoilState(todoListState)

  const addItem = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: crypto.randomUUID(),
        text: inputValue.trim(),
        isComplete: false,
      },
    ])
    setInputValue('')
  }

  return (
    <form className="flex flex-col sm:flex-row gap-3 mb-6" onSubmit={addItem}>
      <input
        type="text"
        className="flex-1 px-4 py-3 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:bg-white placeholder:text-slate-400"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-indigo-500 border border-transparent rounded-xl cursor-pointer transition-all hover:bg-indigo-600 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
      >
        <Plus size={20} />
        Add Task
      </button>
    </form>
  )
}
