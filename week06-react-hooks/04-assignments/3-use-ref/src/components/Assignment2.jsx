import { useState } from 'react'
import { useRef } from 'react'

// Create a component that tracks and displays the number of times it has been rendered.
// use useRef to create a variable that persists across renders without causing additional renders when it changes

export function Assignment2() {
  const [count, setCount] = useState(0)

  const numberOfTimesReRendered = useRef(0)

  const handleReRender = () => {
    // Update state to force re-render
    setCount(count + 1)
  }

  numberOfTimesReRendered.current = numberOfTimesReRendered.current + 1

  return (
    <div>
      <p>
        This component has rendered {numberOfTimesReRendered.current} times.
      </p>
      <button onClick={handleReRender}>Force Re-render</button>
    </div>
  )
}

// react keeps the same object between renders
// so when components re-renders, the object survives
// but when the component is unmounted and mounted again, the object is recreated
