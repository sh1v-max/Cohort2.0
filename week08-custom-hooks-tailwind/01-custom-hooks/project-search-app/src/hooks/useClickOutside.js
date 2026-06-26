import { useEffect } from 'react'

/**
 * useClickOutside — fires a callback when the user clicks outside a given element.
 *
 * @param {React.RefObject} ref      — ref attached to the element to watch
 * @param {Function}        callback — called when a click happens outside
 *
 * Use for: closing dropdowns, modals, popups on outside click.
 */
export function useClickOutside(ref, callback) {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [ref, callback])
}
