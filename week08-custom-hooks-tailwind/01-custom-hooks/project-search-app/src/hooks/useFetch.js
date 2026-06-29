import { useState, useEffect } from 'react'

/**
 * useFetch — handles the complete fetch lifecycle: loading → data/error.
 *
 * @param {string|null} url — URL to fetch. Pass null to skip fetching.
 * @returns {{ data, loading, error, refetch }}
 *
 * Uses AbortController to cancel in-flight requests when:
 *   - The URL changes (new search)
 *   - The component unmounts
 * This prevents stale responses from overwriting newer results.
 */
export function useFetch(url) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    if (!url) {
      // Clear stale state when URL is removed (user cleared the input)
      setData(null)
      setError(null)
      setLoading(false)
      return
    }

    const controller = new AbortController()

    setLoading(true)
    setError(null)
    setData(null)

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        return res.json()
      })
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return  // request cancelled — not an error
        setError(err.message)
        setLoading(false)
      })

    // Cancel the request if URL changes or component unmounts
    return () => controller.abort()
  }, [url, trigger])

  const refetch = () => setTrigger(t => t + 1)

  return { data, loading, error, refetch }
}
