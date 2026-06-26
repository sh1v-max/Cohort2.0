import { useState, useEffect } from 'react'

/**
 * useFetch — handles the complete fetch lifecycle: loading → data/error.
 *
 * @param {string} url — the URL to fetch. Pass null/undefined to skip fetching.
 * @returns {{ data, loading, error, refetch }}
 *
 * The `cancelled` flag prevents setting state on an unmounted component,
 * which would cause a React memory leak warning.
 */
export function useFetch(url) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    if (!url) return

    let cancelled = false

    setLoading(true)
    setError(null)
    setData(null)

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        return res.json()
      })
      .then(json => {
        if (!cancelled) {
          setData(json)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [url, trigger])

  const refetch = () => setTrigger(t => t + 1)

  return { data, loading, error, refetch }
}
