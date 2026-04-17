/**
 * ============================================================
 *  CONTEXT API — Simple Explanation & Demo
 * ============================================================
 *
 *  THE PROBLEM (Prop Drilling):
 *  ─────────────────────────────
 *  Imagine you have a deeply nested component tree:
 *
 *    App
 *     └── Parent
 *          └── Child
 *               └── GrandChild   ← needs "theme" data
 *
 *  Without Context, you'd have to pass props through every
 *  single level — even components that don't use the data.
 *  This is called "Prop Drilling" and gets messy fast.
 *
 *  THE SOLUTION (Context API):
 *  ────────────────────────────
 *  Context lets you broadcast data globally to any component
 *  that needs it, without manually threading props.
 *
 *  HOW IT WORKS — 3 Steps:
 *  ─────────────────────────
 *  1. createContext()   → Create a context object (like a "channel")
 *  2. <Context.Provider> → Wrap your tree; provide the data
 *  3. useContext()      → Any deeply nested child can "tune in"
 *
 * ============================================================
 */

import { createContext, useContext, useState } from 'react'

// ─────────────────────────────────────────────────
// STEP 1: Create the context
//   Think of this as creating a "radio channel".
//   The default value (null here) is used only if
//   a component reads the context with NO Provider above it.
// ─────────────────────────────────────────────────
const ThemeContext = createContext(null)

// ─────────────────────────────────────────────────
// STEP 2: Create the Provider
//   This is the "broadcaster". It holds the state
//   and makes it available to ALL children below it.
//   Any component wrapped inside this can access the data.
// ─────────────────────────────────────────────────
function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)

  function toggleTheme() {
    setIsDark((prev) => !prev)
  }

  // The `value` prop is what gets shared with consumers
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ─────────────────────────────────────────────────
// STEP 3: Consume the context with useContext()
//   Any component — no matter how deeply nested —
//   can read the context value using useContext().
//   No props needed! It just "tunes in" to the channel.
// ─────────────────────────────────────────────────

// GrandChild is buried deep in the tree
// but reads theme directly — no props passed from Parent!
function GrandChild() {
  const { isDark, toggleTheme } = useContext(ThemeContext)

  const style = {
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    background: isDark ? '#1e1e1e' : '#f0f0f0',
    color: isDark ? '#ffffff' : '#000000',
    transition: 'all 0.3s ease',
  }

  return (
    <div style={style}>
      <p>🎨 Current Theme: <strong>{isDark ? 'Dark 🌙' : 'Light ☀️'}</strong></p>
      {/* GrandChild can also TRIGGER changes — not just read */}
      <button onClick={toggleTheme} style={{ cursor: 'pointer', padding: '8px 16px' }}>
        Toggle Theme
      </button>
    </div>
  )
}

// Parent and Child don't receive or pass any theme props.
// They're completely unaware of the theme — that's the point!
function Child() {
  return (
    <div>
      <p style={{ fontSize: '12px', color: 'gray' }}>
        👆 I'm Child — I don't know about the theme. I just render GrandChild.
      </p>
      <GrandChild />
    </div>
  )
}

function Parent() {
  return (
    <div>
      <p style={{ fontSize: '12px', color: 'gray' }}>
        👆 I'm Parent — I also don't know about the theme. I just render Child.
      </p>
      <Child />
    </div>
  )
}

// ─────────────────────────────────────────────────
// Root component — wraps everything in ThemeProvider
//   Only the root needs to know about the Provider.
// ─────────────────────────────────────────────────
function ContextAPIExplained() {
  return (
    <ThemeProvider>
      {/* Provider wraps the tree; all children can access ThemeContext */}
      <h2>Context API Demo</h2>
      <p>
        <strong>App → Parent → Child → GrandChild</strong>
        <br />
        Only GrandChild uses the theme, but NO props are drilled through the chain.
      </p>
      <Parent />
    </ThemeProvider>
  )
}

export default ContextAPIExplained

/**
 * ─────────────────────────────────────────────────
 * QUICK REFERENCE SUMMARY
 * ─────────────────────────────────────────────────
 *
 *  | Step          | What to use           | Purpose                         |
 *  |---------------|-----------------------|---------------------------------|
 *  | Create        | createContext()       | Sets up the "channel"           |
 *  | Provide data  | <Context.Provider>    | Makes data available to tree    |
 *  | Read data     | useContext(Context)   | Any child can access the data   |
 *
 *  WHEN TO USE CONTEXT:
 *  ✅ Global state: theme, language, auth, user data
 *  ✅ Data needed by many deeply nested components
 *
 *  WHEN NOT TO USE CONTEXT:
 *  ❌ Data only needed by 1-2 closely related components
 *     (prop drilling is fine for shallow trees)
 *  ❌ Frequently changing data (causes re-renders on all consumers)
 *     → Use Zustand / Redux for high-frequency updates
 *
 * ─────────────────────────────────────────────────
 */
