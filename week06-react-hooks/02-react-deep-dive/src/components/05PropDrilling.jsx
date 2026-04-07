import { useState } from 'react'

// ===================================================================
// PROP DRILLING
// ===================================================================
// prop drilling is the process of passing data from a parent component
// through many layers of children just to reach a deeply nested child.
// it's not always "bad", but it can make code harder to maintain.
// ===================================================================

export default function PropDrillingDemo() {
  const [user, setUser] = useState({ name: 'Shiv', theme: 'dark' })

  const toggleTheme = () => {
    setUser((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }))
  }

  return (
    <div className="card">
      <h2>5. Prop Drilling</h2>
      <p>
        the <code>user</code> object and <code>toggleTheme</code> function live
        here in the top-level component. watch how they have to pass through
        every layer just to reach the deeply nested component!
      </p>

      <div className="wrong-example card" style={{ marginTop: '15px' }}>
        <h3>❌ The Problem: Prop Drilling</h3>
        <p>
          <strong>GrandParent → Parent → Child → GrandChild</strong>
        </p>
        <p>
          each layer receives props it doesn't even use, just to forward them
          down. this is "prop drilling".
        </p>

        <GrandParent user={user} toggleTheme={toggleTheme} />
      </div>

      <div className="correct-example card" style={{ marginTop: '15px' }}>
        <h3>✅ Solutions to Prop Drilling</h3>
        <ul style={{ textAlign: 'left' }}>
          <li>
            <strong>Context API</strong> — React's built-in solution. Create a
            context, wrap the tree with a Provider, and consume it anywhere with{' '}
            <code>useContext</code>.
          </li>
          <li>
            <strong>State Management Libraries</strong> — Zustand, Redux, Jotai,
            etc. for larger apps.
          </li>
          <li>
            <strong>Component Composition</strong> — Restructure your components
            so deeply nested children don't need those props.
          </li>
        </ul>
      </div>
    </div>
  )
}

// --- Layer 1: GrandParent ---
// receives user & toggleTheme just to pass them down.
function GrandParent({ user, toggleTheme }) {
  return (
    <div
      className="card"
      style={{ marginTop: '10px', borderLeft: '3px solid #ff4a4a' }}
    >
      <p>
        <strong>GrandParent</strong> — I received <code>user</code> and{' '}
        <code>toggleTheme</code> as props. I don't use them. I just forward them
        down.
      </p>
      <Parent user={user} toggleTheme={toggleTheme} />
    </div>
  )
}

// --- Layer 2: Parent ---
// same story — receives and forwards.
function Parent({ user, toggleTheme }) {
  return (
    <div
      className="card"
      style={{ marginTop: '10px', borderLeft: '3px solid #ffa94a' }}
    >
      <p>
        <strong>Parent</strong> — same thing. forwarding props I don't need.
      </p>
      <Child user={user} toggleTheme={toggleTheme} />
    </div>
  )
}

// --- Layer 3: Child ---
// one more hop...
function Child({ user, toggleTheme }) {
  return (
    <div
      className="card"
      style={{ marginTop: '10px', borderLeft: '3px solid #ffe04a' }}
    >
      <p>
        <strong>Child</strong> — still just passing things along...
      </p>
      <GrandChild user={user} toggleTheme={toggleTheme} />
    </div>
  )
}

// --- Layer 4: GrandChild ---
// FINALLY the component that actually USES the props!
function GrandChild({ user, toggleTheme }) {
  return (
    <div
      className="card"
      style={{
        marginTop: '10px',
        borderLeft: '3px solid #4aff74',
        backgroundColor: user.theme === 'dark' ? '#1a1a1a' : '#e8e8e8',
        color: user.theme === 'dark' ? 'white' : 'black',
      }}
    >
      <p>
        <strong>GrandChild</strong> — I FINALLY get to use the props!
      </p>
      <p>
        user: <strong>{user.name}</strong> | theme:{' '}
        <strong>{user.theme}</strong>
      </p>
      <button onClick={toggleTheme}>toggle theme</button>
      <p style={{ marginTop: '10px', fontSize: '0.85em', opacity: 0.7 }}>
        notice how every component above me had to receive and pass these props,
        even though only I needed them. that's the prop drilling problem!
      </p>
    </div>
  )
}
