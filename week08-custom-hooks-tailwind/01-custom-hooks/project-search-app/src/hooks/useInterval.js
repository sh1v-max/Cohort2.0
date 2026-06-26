import { useEffect, useRef } from 'react'

/**
 * useInterval — safe wrapper around setInterval.
 *
 * @param {Function}     callback — function to run on each tick
 * @param {number|null}  delay    — ms between ticks; pass null to pause
 *
 * Why useRef for callback: a plain setInterval captures a stale closure.
 * Storing the callback in a ref means the interval always calls the latest version
 * without needing to restart the interval on every render.
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef(callback)

  // Keep ref in sync with latest callback without restarting the interval
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return  // null = paused
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}
