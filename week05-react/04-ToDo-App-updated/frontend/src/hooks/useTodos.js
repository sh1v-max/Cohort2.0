import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../services/api'
import toast from 'react-hot-toast'

export const useTodos = (page = 1, limit = 10) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['todos', page, limit],
    queryFn: async () => {
      const { data } = await api.get(`/todos?page=${page}&limit=${limit}`)
      return data
    },
    placeholderData: (previousData) => previousData, // Modern keepPreviousData equivalent in newer react-query
  })

  const createMutation = useMutation({
    mutationFn: async (newTodo) => {
      const { data } = await api.post('/todos', newTodo)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success('Todo added')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add todo')
    },
  })

  const toggleMutation = useMutation({
    mutationFn: async ({ id, completed }) => {
      const { data } = await api.put(`/todos/${id}`, { completed })
      return data
    },
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      const previousData = queryClient.getQueryData(['todos', page, limit])

      queryClient.setQueryData(['todos', page, limit], (old) => {
        if (!old) return old
        return {
          ...old,
          data: {
            todos: old.data.todos.map((todo) =>
              todo._id === id ? { ...todo, completed } : todo,
            ),
          },
        }
      })

      return { previousData }
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['todos', page, limit], context.previousData)
      }
      toast.error('Failed to update status')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/todos/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success('Todo deleted')
    },
    onError: () => {
      toast.error('Failed to delete todo')
    },
  })

  return {
    ...query,
    createTodo: createMutation.mutate,
    isCreating: createMutation.isPending,
    toggleTodo: toggleMutation.mutate,
    deleteTodo: deleteMutation.mutate,
  }
}
