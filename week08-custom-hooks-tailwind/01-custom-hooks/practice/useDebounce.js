import { useState, useEffect } from 'react'

/**
 * useDebounce — delays updating a value until the user stops changing it.
 *
 * @param {*}      value  — the raw value (e.g. search input)
 * @param {number} delay  — ms to wait after the last change (default 500ms)
 * @returns debouncedValue — only updates after the delay has passed with no new changes
 *
 * Why cleanup matters: each keystroke resets the timer. Without cleanup, every
 * intermediate value would fire. With cleanup, only the final value fires.
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
