import { atom } from 'recoil'

const loadTodos = () => {
  const saved = localStorage.getItem('recoil-todos')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (e) {
      console.error('Failed to parse todos', e)
    }
  }
  return []
}

export const todoListState = atom({
  key: 'todoListState',
  default: loadTodos(),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newTodos) => {
        localStorage.setItem('recoil-todos', JSON.stringify(newTodos))
      })
    },
  ],
})

export const todoFilterState = atom({
  key: 'todoFilterState',
  default: 'all', // 'all', 'completed', 'pending'
})
