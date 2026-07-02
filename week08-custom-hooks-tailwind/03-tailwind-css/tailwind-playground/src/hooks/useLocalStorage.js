import { useState, useCallback } from 'react'

export function useLocalStorage(key, initial) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initial
    } catch { return initial }
  })

  const setValue = useCallback((value) => {
    try {
      const toStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(toStore)
      window.localStorage.setItem(key, JSON.stringify(toStore))
    } catch (err) { console.error('[useLocalStorage]', err) }
  }, [key, storedValue])

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initial)
    } catch (err) { console.error('[useLocalStorage]', err) }
  }, [key, initial])

  return [storedValue, setValue, removeValue]
}
