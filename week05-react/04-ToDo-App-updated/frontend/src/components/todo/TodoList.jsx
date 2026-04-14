import TodoItem from './TodoItem'

export default function TodoList({
  todos,
  isLoading,
  isError,
  onToggle,
  onDelete,
}) {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 bg-zinc-900 rounded-xl border border-zinc-800"
          />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-4 border border-red-900/50 bg-red-900/10 text-red-400 rounded-xl text-center text-sm">
        Failed to load tasks. Please try again.
      </div>
    )
  }

  if (!todos?.length) {
    return (
      <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/50">
        <p className="text-zinc-500 text-lg">No tasks found</p>
        <p className="text-zinc-600 text-sm mt-1">
          Create a new task to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
