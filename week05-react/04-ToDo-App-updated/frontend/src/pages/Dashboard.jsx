import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useTodos } from '../hooks/useTodos'
import { LogOut, Plus, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import TodoList from '../components/todo/TodoList'
import TodoInput from '../components/todo/TodoInput'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [page, setPage] = useState(1)
  const [showInput, setShowInput] = useState(false)

  const {
    data,
    isLoading,
    isError,
    toggleTodo,
    deleteTodo,
    createTodo,
    isCreating,
    isFetching,
  } = useTodos(page, 5)

  const pagination = data?.pagination

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="font-medium truncate max-w-[150px] sm:max-w-full text-zinc-200">
              {user?.email}
            </span>
          </div>
          <button
            onClick={logout}
            className="text-sm font-medium text-zinc-400 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12 relative min-h-[calc(100vh-64px)] pb-32">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              Your Tasks
            </h1>
            <p className="text-zinc-400 text-sm">
              {isLoading
                ? 'Loading tasks...'
                : `${pagination?.total || 0} total tasks`}
            </p>
          </div>
          <button
            onClick={() => setShowInput(!showInput)}
            className="h-10 w-10 sm:h-auto sm:w-auto sm:px-4 rounded-full sm:rounded-md bg-white text-black flex items-center justify-center gap-2 hover:bg-zinc-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all cursor-pointer font-medium"
          >
            <Plus
              className={`h-5 w-5 transition-transform duration-300 ${showInput ? 'rotate-45' : ''}`}
            />
            <span className="hidden sm:inline">
              {showInput ? 'Cancel' : 'New Task'}
            </span>
          </button>
        </div>

        {showInput && (
          <div className="mb-8 animate-in slide-in-from-top-4 fade-in duration-300">
            <TodoInput
              onAdd={(data) => {
                createTodo(data)
                setShowInput(false)
              }}
              isCreating={isCreating}
            />
          </div>
        )}

        <div className="relative">
          <TodoList
            todos={data?.data?.todos || []}
            isLoading={isLoading}
            isError={isError}
            onToggle={(id, completed) => toggleTodo({ id, completed })}
            onDelete={deleteTodo}
          />
          {isFetching && !isLoading && (
            <div className="absolute top-0 right-0 p-2 text-zinc-500">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-6">
            <p className="text-sm text-zinc-400">
              Showing page{' '}
              <span className="text-white font-medium">{pagination.page}</span>{' '}
              of{' '}
              <span className="text-white font-medium">
                {pagination.totalPages}
              </span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isFetching}
                className="h-9 px-3 rounded border border-zinc-800 flex items-center gap-1 text-sm bg-zinc-950 hover:bg-zinc-900 disabled:opacity-50 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <button
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={page === pagination.totalPages || isFetching}
                className="h-9 px-3 rounded border border-zinc-800 flex items-center gap-1 text-sm bg-zinc-950 hover:bg-zinc-900 disabled:opacity-50 transition-colors cursor-pointer"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
