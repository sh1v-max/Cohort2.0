import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function TodoInput({ onAdd, isCreating }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({ title, description })
    setTitle('')
    setDescription('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-zinc-800 bg-zinc-900/50 p-4 rounded-xl shadow-lg space-y-4"
    >
      <div>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-lg font-medium text-white placeholder-zinc-500 focus:outline-none"
          autoFocus
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-transparent text-sm text-zinc-400 placeholder-zinc-600 focus:outline-none"
        />
      </div>
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={!title.trim() || isCreating}
          className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer"
        >
          {isCreating && <Loader2 className="h-4 w-4 animate-spin" />}
          Add Task
        </button>
      </div>
    </form>
  )
}
