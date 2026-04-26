import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { todoListState } from '../recoil/atoms'
import { Trash2, Edit2, Check, X } from 'lucide-react'

export default function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(item.text)

  const index = todoList.findIndex((listItem) => listItem === item)

  const editItemText = () => {
    if (!editValue.trim()) return
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: editValue.trim(),
    })
    setTodoList(newList)
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setEditValue(item.text)
    setIsEditing(false)
  }

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    })
    setTodoList(newList)
  }

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index)
    setTodoList(newList)
  }

  return (
    <li
      className={`group flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white border rounded-xl transition-all animate-slide-in ${item.isComplete ? 'border-slate-200 bg-slate-50 opacity-70 hover:opacity-100' : 'border-slate-200 hover:border-indigo-400 hover:shadow-md'}`}
    >
      <div className="flex items-center gap-4 flex-1 overflow-hidden">
        {!isEditing && (
          <input
            type="checkbox"
            className="todo-checkbox shrink-0"
            checked={item.isComplete}
            onChange={toggleItemCompletion}
          />
        )}

        {isEditing ? (
          <input
            type="text"
            className="flex-1 p-2 text-base border border-indigo-400 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') editItemText()
              if (e.key === 'Escape') cancelEdit()
            }}
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 text-base transition-colors break-words ${item.isComplete ? 'line-through text-slate-500' : 'text-slate-900'}`}
          >
            {item.text}
          </span>
        )}
      </div>

      <div className="flex justify-end gap-1 opacity-100 sm:opacity-0 transition-opacity group-hover:opacity-100 mt-2 sm:mt-0">
        {isEditing ? (
          <>
            <button
              className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              onClick={editItemText}
            >
              <Check size={18} />
            </button>
            <button
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              onClick={cancelEdit}
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 size={18} />
            </button>
            <button
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              onClick={deleteItem}
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </li>
  )
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}
