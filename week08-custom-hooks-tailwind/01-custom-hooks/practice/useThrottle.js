import { useState, useRef, useEffect } from 'react'

/**
 * useThrottle — fires the first call immediately, then blocks for `limit` ms.
 *
 * @param {*}      value  — the raw value to throttle
 * @param {number} limit  — minimum ms between updates (default 300ms)
 * @returns throttledValue
 *
 * Difference from debounce:
 *   Debounce → waits for quiet period, fires ONCE at the end (typing search)
 *   Throttle → fires immediately, then one more at the end of limit (scroll/resize)
 */
export function useThrottle(value, limit = 300) {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastFired = useRef(Date.now())
  const timerRef  = useRef(null)

  useEffect(() => {
    const now     = Date.now()
    const elapsed = now - lastFired.current

    if (elapsed >= limit) {
      // Enough time has passed — fire immediately
      lastFired.current = now
      setThrottledValue(value)
    } else {
      // Schedule trailing update so we don't drop the final value
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        lastFired.current = Date.now()
        setThrottledValue(value)
      }, limit - elapsed)
    }

    return () => clearTimeout(timerRef.current)
  }, [value, limit])

  return throttledValue
}
