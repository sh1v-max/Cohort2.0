import { useState, useCallback } from 'react'

/**
 * useLocalStorage — same API as useState, but value persists across page refreshes.
 *
 * @param {string} key        — localStorage key
 * @param {*}      initial    — default value if key doesn't exist yet
 * @returns [storedValue, setValue, removeValue]
 */
export function useLocalStorage(key, initial) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initial
    } catch {
      return initial
    }
  })

  const setValue = useCallback((value) => {
    try {
      const toStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(toStore)
      window.localStorage.setItem(key, JSON.stringify(toStore))
    } catch (err) {
      console.error('[useLocalStorage] set error:', err)
    }
  }, [key, storedValue])

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initial)
    } catch (err) {
      console.error('[useLocalStorage] remove error:', err)
    }
  }, [key, initial])

  return [storedValue, setValue, removeValue]
}
