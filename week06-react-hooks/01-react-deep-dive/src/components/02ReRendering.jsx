import { useState } from 'react'

export default function ReRendering() {
  const [count, setCount] = useState(0)

  // a component only re-renders when its state, props, or context changes.
  // when this parent re-renders, ALL its children re-render by default!
  console.log('parent is rendering!')

  return (
    <div className="card">
      <h2>2. Re-rendering in React</h2>
      <button onClick={() => setCount(count + 1)}>
        trigger re-render ({count})
      </button>

      <div className="container">
        {/* this child will re-render every time we click the parent's button */}
        <ChildComponent />

        <div className="wrong-example card">
          <h3>Common Mistake</h3>
          <p>
            putting expensive calculations directly in the component body. they
            will run on every single render!
          </p>
          {/* wrong: const x = superHeavyMathFunction() directly in here */}
        </div>
      </div>
    </div>
  )
}

function ChildComponent() {
  console.log('child is rendering!')
  return (
    <div className="card">
      <p>i am a child component.</p>
      <p>
        check the console! i re-render every time the parent's state changes,
        even though my code hasn't changed.
      </p>
    </div>
  )
}
