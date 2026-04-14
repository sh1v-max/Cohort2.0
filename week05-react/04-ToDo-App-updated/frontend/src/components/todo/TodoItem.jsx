import { Check, Trash2 } from 'lucide-react'

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div
      className={`group flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 ${
        todo.completed
          ? 'bg-zinc-950/50 border-zinc-800/50 opacity-60'
          : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
      }`}
    >
      <button
        onClick={() => onToggle(todo._id, !todo.completed)}
        className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
          todo.completed
            ? 'bg-white border-white text-black'
            : 'border-zinc-500 text-transparent hover:border-zinc-400'
        }`}
      >
        <Check className="h-3.5 w-3.5" />
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-base font-medium transition-colors ${
            todo.completed ? 'text-zinc-500 line-through' : 'text-zinc-100'
          }`}
        >
          {todo.title}
        </p>
        {todo.description && (
          <p
            className={`text-sm mt-1 truncate transition-colors ${
              todo.completed ? 'text-zinc-600' : 'text-zinc-400'
            }`}
          >
            {todo.description}
          </p>
        )}
      </div>

      <button
        onClick={() => onDelete(todo._id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-md cursor-pointer"
        aria-label="Delete todo"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
