import { useState, useEffect } from 'react'

// ===================================================================
// CUSTOM HOOKS
// ===================================================================
// a custom hook is just a regular JS function that uses React hooks.
// the convention is to name them starting with "use".
// they let you extract and REUSE stateful logic across components.
// ===================================================================

// --- Custom Hook 1: useWindowWidth ---
// tracks the browser window width in real time.
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    // cleanup: remove the listener when the component using this hook unmounts
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}

// --- Custom Hook 2: useLocalStorage ---
// works like useState, but persists the value in localStorage.
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    setStoredValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}

// --- Custom Hook 3: useToggle ---
// a simple toggle hook for booleans.
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = () => setValue((prev) => !prev)
  return [value, toggle]
}

// ===================================================================
// COMPONENT: demonstrates all three custom hooks
// ===================================================================
export default function CustomHooksDemo() {
  // using our custom hooks just like built-in hooks!
  const windowWidth = useWindowWidth()
  const [name, setName] = useLocalStorage('userName', 'Guest')
  const [isDarkMode, toggleDarkMode] = useToggle(false)

  return (
    <div
      className="card"
      style={{
        backgroundColor: isDarkMode ? '#111' : '#2a2a2a',
        color: isDarkMode ? '#eee' : 'rgba(255, 255, 255, 0.87)',
      }}
    >
      <h2>5. Custom Hooks</h2>

      {/* useWindowWidth demo */}
      <div className="correct-example card" style={{ marginBottom: '15px' }}>
        <h3>useWindowWidth</h3>
        <p>
          current window width: <strong>{windowWidth}px</strong>
        </p>
        <p>try resizing your browser window to see this update in real time!</p>
      </div>

      {/* useLocalStorage demo */}
      <div className="correct-example card" style={{ marginBottom: '15px' }}>
        <h3>useLocalStorage</h3>
        <p>
          your name is: <strong>{name}</strong>
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="type your name..."
          style={{
            padding: '0.5em',
            borderRadius: '6px',
            border: '1px solid #555',
            background: '#1a1a1a',
            color: 'white',
            marginRight: '8px',
          }}
        />
        <p>refresh the page — your name will persist! (it's saved in localStorage)</p>
      </div>

      {/* useToggle demo */}
      <div className="correct-example card">
        <h3>useToggle</h3>
        <p>
          dark mode: <strong>{isDarkMode ? 'ON' : 'OFF'}</strong>
        </p>
        <button onClick={toggleDarkMode}>toggle dark mode</button>
        <p>a simple reusable boolean toggle hook.</p>
      </div>
    </div>
  )
}
