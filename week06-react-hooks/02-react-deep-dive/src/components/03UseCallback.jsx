import { useState, useCallback, memo } from 'react'

export default function UseCallbackDeepDive() {
  const [count, setCount] = useState(0)
  const [otherState, setOtherState] = useState(false)

  // wrong way: this function is re-created from scratch on EVERY render.
  // this causes the MemoizedChild to re-render because it thinks it received a new prop!
  // const showAlert = () => alert("clicked!");

  // correct way: useCallback caches the function definition itself.
  // it only re-creates the function if dependencies change.

  // useCallback is not about minimizing the amount of code that is run
  // useCallback is about not rendering a child component, if the function hasn't/doesn't change across renders

  const showAlert = useCallback(() => {
    alert('button clicked! count is: ' + count)
  }, [count])

  return (
    <div className="card">
      <h2>3. useCallback</h2>

      <p>main count: {count}</p>
      <button onClick={() => setCount(count + 1)}>increase count</button>
  
      <br />

      <button onClick={() => setOtherState(!otherState)}>
        toggle unrelated state (causes re-render)
      </button>

      <div className="correct-example card" style={{ marginTop: '20px' }}>
        <MemoizedChild onClick={showAlert} />
      </div>
    </div>
  )
}

// React.memo wraps a component so it ONLY re-renders if its props change.
const MemoizedChild = memo(function Child({ onClick }) {
  console.log('child rendered!')
  return (
    <div>
      <h3>I am a protected child</h3>
      <p>
        if you click the "toggle unrelated state" button, watch the console. I
        won't re-render! Because useCallback protected my onClick prop.
      </p>
      <button onClick={onClick}>alert</button>
    </div>
  )
})
