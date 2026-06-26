import { useState, useEffect } from 'react'

/**
 * useWindowSize — tracks browser window dimensions in real time.
 * @returns {{ width, height }}
 *
 * Use for: JS-driven responsive behavior (e.g. hiding components, changing
 * grid logic) that CSS media queries alone can't handle.
 */
export function useWindowSize() {
  const [size, setSize] = useState({
    width:  window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
