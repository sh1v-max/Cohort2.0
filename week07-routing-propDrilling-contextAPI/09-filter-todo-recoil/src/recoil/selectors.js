import { selector } from 'recoil'
import { todoListState, todoFilterState } from './atoms'

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoFilterState)
    const list = get(todoListState)

    switch (filter) {
      case 'completed':
        return list.filter((item) => item.isComplete)
      case 'pending':
        return list.filter((item) => !item.isComplete)
      default:
        return list
    }
  },
})

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState)
    const totalNum = todoList.length
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length
    const totalUncompletedNum = totalNum - totalCompletedNum
    const percentCompleted =
      totalNum === 0 ? 0 : Math.round((totalCompletedNum / totalNum) * 100)

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    }
  },
})
