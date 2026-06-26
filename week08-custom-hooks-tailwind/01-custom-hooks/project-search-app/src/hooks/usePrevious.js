import { useRef, useEffect } from 'react'

/**
 * usePrevious — returns the value from the previous render.
 * Returns undefined on the first render.
 *
 * Use for: detecting direction of change, animations, comparison logic.
 */
export function usePrevious(value) {
  const ref = useRef(undefined)

  // Runs AFTER render — so ref.current still holds the old value during the render
  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
