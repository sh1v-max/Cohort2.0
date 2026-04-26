import { useRecoilValue } from 'recoil'
import { filteredTodoListState } from '../recoil/selectors'
import TodoItem from './TodoItem'
import { ClipboardList } from 'lucide-react'

export default function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState)

  if (todoList.length === 0) {
    return (
      <div className="text-center py-12 px-4 text-slate-500 flex flex-col items-center gap-4">
        <ClipboardList size={48} className="text-slate-300" />
        <p className="text-base font-medium">
          No tasks found. Add your first one above!
        </p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </ul>
  )
}
