import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function AuthPage({ mode }) {
  const isLogin = mode === 'login'
  const { loginMutation, signupMutation } = useAuth()
  const mutation = isLogin ? loginMutation : signupMutation

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-12 md:w-1/2 lg:px-24 bg-black">
        <div className="mx-auto w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-zinc-400">
              {isLogin
                ? 'Enter your details to access your tasks.'
                : 'Sign up to start organizing your life.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-zinc-300"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                className="block w-full appearance-none rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white sm:text-sm transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-zinc-300"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, password: e.target.value }))
                }
                className="block w-full appearance-none rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-white placeholder-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white sm:text-sm transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="group relative flex w-full justify-center rounded-md bg-white py-2.5 px-3 text-sm font-semibold text-black hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-70 transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {mutation.isPending
                  ? 'Processing...'
                  : isLogin
                    ? 'Sign in'
                    : 'Sign up'}
                {!mutation.isPending && (
                  <ArrowRight className="h-4 w-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                )}
              </span>
            </button>
          </form>

          <p className="text-center text-sm text-zinc-400">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <Link
              to={isLogin ? '/signup' : '/login'}
              className="font-semibold text-white hover:text-zinc-300 hover:underline underline-offset-4 transition-all"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden md:flex w-1/2 bg-zinc-900 border-l border-zinc-800 items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 max-w-md p-8 text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black shadow-2xl">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Focus on what matters
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            A minimalist workspace for your tasks. No clutter, just you and your
            goals. Designed for speed and simplicity.
          </p>
        </div>
      </div>
    </div>
  )
}
