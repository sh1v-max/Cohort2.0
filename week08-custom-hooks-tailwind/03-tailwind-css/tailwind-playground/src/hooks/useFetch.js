import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    if (!url) {
      setData(null); setError(null); setLoading(false)
      return
    }
    const controller = new AbortController()
    setLoading(true); setError(null); setData(null)

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        return res.json()
      })
      .then(json => { setData(json); setLoading(false) })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError(err.message); setLoading(false)
      })

    return () => controller.abort()
  }, [url, trigger])

  const refetch = () => setTrigger(t => t + 1)
  return { data, loading, error, refetch }
}
