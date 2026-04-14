import { useState, useMemo } from 'react'

export default function UseMemoDeepDive() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState('dark')

  // wrong way (will run every single time the component renders!)
  // const doubledCount = count * 2;

  // correct way: useMemo caches the result.
  // it ONLY re-runs if `count` changes, not if `theme` changes.
  const doubledCount = useMemo(() => {
    console.log('running expensive math...')
    for (let i = 0; i <= 10000000; i++) {
      // fake delay
    }
    return count * 2
  }, [count])

  return (
    <div
      className="card"
      style={{
        backgroundColor: theme === 'dark' ? '#222' : '#ddd',
        color: theme === 'dark' ? 'white' : 'black',
      }}
    >
      <h2>4. useMemo</h2>

      <p>count: {count}</p>
      <p>expensive doubled count: {doubledCount}</p>

      <button onClick={() => setCount(count + 1)}>
        increase count (runs math)
      </button>

      <div
        className="correct-example card"
        style={{ marginTop: '20px', color: 'black' }}
      >
        <h3>Toggle Theme</h3>
        <p>
          watch the console. clicking this changes state and causes a re-render.
          but useMemo stops the expensive math from running again!
        </p>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          toggle theme: {theme}
        </button>
      </div>
    </div>
  )
}
