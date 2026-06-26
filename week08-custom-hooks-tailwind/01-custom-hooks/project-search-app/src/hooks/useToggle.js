import { useState, useCallback } from 'react'

/**
 * useToggle — manages a boolean that can be flipped on/off.
 * Returns [value, toggle, setTrue, setFalse]
 *
 * Use for: modals, dropdowns, dark mode, show/hide password, etc.
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle   = useCallback(() => setValue(v => !v), [])
  const setTrue  = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return [value, toggle, setTrue, setFalse]
}
