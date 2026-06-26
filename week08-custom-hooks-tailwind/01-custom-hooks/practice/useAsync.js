import { useState, useEffect, useCallback } from 'react'

/**
 * useAsync — handles any async operation with loading/success/error tracking.
 *
 * @param {Function} asyncFn    — a function that returns a Promise
 * @param {boolean}  immediate  — run on mount automatically (default: true)
 * @returns {{ status, data, error, execute }}
 *
 * status is one of: 'idle' | 'loading' | 'success' | 'error'
 *
 * More flexible than useFetch — works with any Promise, not just network calls.
 */
export function useAsync(asyncFn, immediate = true) {
  const [status, setStatus] = useState('idle')
  const [data,   setData]   = useState(null)
  const [error,  setError]  = useState(null)

  const execute = useCallback(() => {
    setStatus('loading')
    setData(null)
    setError(null)

    return asyncFn()
      .then(result => {
        setData(result)
        setStatus('success')
        return result
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : String(err))
        setStatus('error')
        throw err
      })
  }, [asyncFn])

  useEffect(() => {
    if (immediate) execute()
  }, [execute, immediate])

  return { execute, status, data, error }
}
