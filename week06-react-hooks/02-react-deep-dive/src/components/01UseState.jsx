import { useState } from 'react'

// ===================================================================
// useState DEEP DIVE
// ===================================================================
// useState is the most fundamental React hook.
// it adds reactive state to function components.
// when you call the setter, React re-renders with the new value.
// ===================================================================

export default function UseStateDeepDive() {
  // 1. basic counter
  const [count, setCount] = useState(0)

  // 2. functional updater – always use when the new value depends on the old
  function incrementThrice() {
    // ❌ wrong way (only increments by 1, not 3):
    // setCount(count + 1)
    // setCount(count + 1)
    // setCount(count + 1)

    // ✅ right way (uses the previous value each time):
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
  }

  // 3. object state – you must spread the old state, never mutate directly
  const [user, setUser] = useState({ name: 'Shiv', age: 21 })

  // 4. array state – same rule: create a new array instead of mutating
  const [fruits, setFruits] = useState(['🍎', '🍌'])

  // 5. lazy initializer – expensive computation runs ONLY on first render
  const [expensiveValue] = useState(() => {
    console.log('lazy initializer runs only once!')
    return Array.from({ length: 5 }, (_, i) => i * i)
  })

  return (
    <div className="card">
      <h2>1. useState Deep Dive</h2>
      <p>
        <code>useState</code> returns a <strong>[value, setter]</strong> pair.
        the setter triggers a re-render with the new value.
      </p>

      {/* --- basic counter --- */}
      <div className="correct-example card">
        <h3>Basic Counter</h3>
        <p>count: {count}</p>
        <button onClick={() => setCount(count + 1)}>+1</button>{' '}
        <button onClick={() => setCount(0)}>reset</button>
      </div>

      {/* --- functional updater --- */}
      <div className="correct-example card">
        <h3>Functional Updater</h3>
        <p>
          when the next value depends on the previous one, pass a function to
          the setter: <code>setCount(prev =&gt; prev + 1)</code>
        </p>
        <button onClick={incrementThrice}>+3 (functional updater)</button>
        <p>count is still: {count}</p>
      </div>

      {/* --- object state --- */}
      <div className="correct-example card">
        <h3>Object State (Spread Correctly)</h3>
        <p>
          name: {user.name}, age: {user.age}
        </p>
        <button
          onClick={() =>
            setUser(prev => ({ ...prev, age: prev.age + 1 }))
          }
        >
          increment age
        </button>
        <pre style={{ fontSize: '0.8em', whiteSpace: 'pre-wrap' }}>
{`// ✅ correct
setUser(prev => ({ ...prev, age: prev.age + 1 }))

// ❌ wrong – mutating directly does NOT trigger a re-render
// user.age = 22
// setUser(user)  // same reference, React skips!`}
        </pre>
      </div>

      {/* --- array state --- */}
      <div className="correct-example card">
        <h3>Array State</h3>
        <p>fruits: {fruits.join(', ')}</p>
        <button onClick={() => setFruits(prev => [...prev, '🍇'])}>
          add grape
        </button>{' '}
        <button onClick={() => setFruits(prev => prev.slice(0, -1))}>
          remove last
        </button>
        <pre style={{ fontSize: '0.8em', whiteSpace: 'pre-wrap' }}>
{`// ✅ correct – create new array
setFruits(prev => [...prev, '🍇'])

// ❌ wrong – push mutates in place
// fruits.push('🍇')
// setFruits(fruits)`}
        </pre>
      </div>

      {/* --- lazy initialization --- */}
      <div className="correct-example card">
        <h3>Lazy Initialization</h3>
        <p>
          pass a <strong>function</strong> to <code>useState</code> so the
          expensive computation only runs on the first render.
        </p>
        <pre style={{ fontSize: '0.8em', whiteSpace: 'pre-wrap' }}>
{`// ✅ lazy – runs once
const [val] = useState(() => heavyCompute())

// ❌ eager – runs every render!
const [val] = useState(heavyCompute())`}
        </pre>
        <p>computed squares: [{expensiveValue.join(', ')}]</p>
      </div>

      {/* --- common mistakes --- */}
      <div className="wrong-example card">
        <h3>Common Mistakes</h3>
        <ul style={{ textAlign: 'left', lineHeight: 1.8 }}>
          <li>
            <strong>Mutating state directly</strong> — always create a new
            object / array. React compares references, not deep values.
          </li>
          <li>
            <strong>Using stale state in closures</strong> — inside
            <code> setTimeout</code> or event handlers, the closed-over value
            may be old. Use the functional updater to be safe.
          </li>
          <li>
            <strong>Calling the setter in the render body</strong> — this causes
            an infinite re-render loop!
          </li>
          <li>
            <strong>Forgetting that setState is async-like</strong> — the new
            value is not available until the next render.
          </li>
        </ul>
      </div>
    </div>
  )
}
