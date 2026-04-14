import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../services/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await api.post('/auth/login', credentials)
      return data
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      queryClient.clear()
      toast.success('Logged in successfully')
      navigate('/')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Login failed')
    },
  })

  const signupMutation = useMutation({
    mutationFn: async (credentials) => {
      const { data } = await api.post('/auth/signup', credentials)
      return data
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      queryClient.clear()
      toast.success('Account created successfully')
      navigate('/')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Signup failed')
    },
  })

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    queryClient.clear()
    navigate('/login')
  }

  const isAuthenticated = !!localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  return { loginMutation, signupMutation, logout, isAuthenticated, user }
}
