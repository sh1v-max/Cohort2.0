# 01 — Custom Hooks

## What Is a Custom Hook?

A custom hook is a plain JavaScript function whose name starts with `use` and that calls other React hooks inside it. It lets you extract stateful logic out of a component so it can be reused across multiple components — without duplicating code or lifting state up.

**Rule:** If two components share the same stateful logic, that logic belongs in a custom hook.

---

## Why Custom Hooks Matter

Before custom hooks, you had two choices to share logic:
- **HOCs (Higher Order Components)** — wrapper hell, hard to debug
- **Render Props** — verbose, confusing JSX nesting

Custom hooks solve both problems cleanly. Every serious React codebase uses them heavily.

---

## Hooks To Build (in order)

### Level 1 — Fundamentals (build these first)

#### 1. `useToggle`
**What:** A boolean that can be flipped on/off.
**Why:** You'll use this for modals, dropdowns, dark mode, show/hide password — constantly.

```
State: value (boolean)
Actions: toggle(), setTrue(), setFalse()
```

**Implement:**
```jsx
// practice/useToggle.js
import { useState, useCallback } from 'react'

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return [value, toggle, setTrue, setFalse]
}
```

**Test it by building:** A dark/light mode toggle button component.

---

#### 2. `useLocalStorage`
**What:** Like useState, but the value persists across page refreshes via localStorage.
**Why:** User preferences, saved items, auth tokens — anything that should survive a refresh.

```
Inputs: key (string), initialValue (any)
Returns: [storedValue, setValue] — same API as useState
```

**Implement:**
```jsx
// practice/useLocalStorage.js
import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
```

**Test it by building:** A bookmarks list that persists after page refresh.

---

#### 3. `usePrevious`
**What:** Always holds the previous render's value.
**Why:** Useful for animations, detecting direction of change, comparison logic.

```
Input: value (any)
Returns: previous value (undefined on first render)
```

**Implement:**
```jsx
// practice/usePrevious.js
import { useRef, useEffect } from 'react'

export function usePrevious(value) {
  const ref = useRef(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
```

**Test it by building:** A counter that shows "went up" / "went down" based on previous value.

---

### Level 2 — Practical Utility Hooks

#### 4. `useDebounce`
**What:** Delays updating a value until the user stops typing (after N milliseconds).
**Why:** Without debounce, every keystroke in a search box fires an API call. Debounce waits until typing pauses.

```
Inputs: value, delay (ms)
Returns: debouncedValue (updates only after delay has passed with no new changes)
```

**Implement:**
```jsx
// practice/useDebounce.js
import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)  // cleanup: cancel if value changes before delay
  }, [value, delay])

  return debouncedValue
}
```

**Why the cleanup matters:** If the user types "r", "re", "rea", "reac", "react" fast — without cleanup, 5 timers fire and all 5 API calls go out. With cleanup, only the last one ("react") fires.

**Test it by building:** A search input that logs API calls — verify only 1 fires after typing stops.

---

#### 5. `useFetch`
**What:** Handles the entire fetch lifecycle — loading, data, error states.
**Why:** Every component that fetches data repeats the same pattern. This hook centralizes it.

```
Input: url (string)
Returns: { data, loading, error }
```

**Implement:**
```jsx
// practice/useFetch.js
import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    let cancelled = false  // prevent state update on unmounted component

    setLoading(true)
    setError(null)

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`)
        return res.json()
      })
      .then(data => {
        if (!cancelled) {
          setData(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }  // cleanup: ignore response if component unmounts
  }, [url])

  return { data, loading, error }
}
```

**Test it by building:** A component that displays GitHub user info fetched from `https://api.github.com/users/{username}`.

---

#### 6. `useWindowSize`
**What:** Tracks the browser window's width and height in real time.
**Why:** Needed for responsive behavior in JS logic (not just CSS media queries) — e.g., showing/hiding components, changing layout logic.

```
Returns: { width, height }
```

**Implement:**
```jsx
// practice/useWindowSize.js
import { useState, useEffect } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
```

**Test it by building:** A banner that says "Mobile View" / "Tablet View" / "Desktop View" based on width.

---

#### 7. `useClickOutside`
**What:** Calls a callback when the user clicks outside of a referenced element.
**Why:** Essential for closing dropdowns, modals, popups when clicking elsewhere on the page.

```
Inputs: ref (from useRef), callback (function)
```

**Implement:**
```jsx
// practice/useClickOutside.js
import { useEffect } from 'react'

export function useClickOutside(ref, callback) {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, callback])
}
```

**Test it by building:** A dropdown menu that closes when you click anywhere outside it.

---

### Level 3 — Advanced Hooks

#### 8. `useThrottle`
**What:** Like debounce but fires immediately, then ignores calls for N ms.
**Why:** For scroll events, resize handlers, mouse movements — you want the first call to fire, not wait.

**Difference from debounce:**
- Debounce: waits for quiet period, then fires ONCE at the end
- Throttle: fires immediately, then blocks for N ms, then allows the next call

```jsx
// practice/useThrottle.js
import { useState, useRef, useEffect } from 'react'

export function useThrottle(value, limit = 300) {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastRan = useRef(Date.now())

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value)
        lastRan.current = Date.now()
      }
    }, limit - (Date.now() - lastRan.current))

    return () => clearTimeout(timer)
  }, [value, limit])

  return throttledValue
}
```

---

#### 9. `useInterval`
**What:** A safe wrapper around setInterval that handles cleanup automatically.
**Why:** Raw setInterval in useEffect is error-prone — it captures stale closures. This hook solves that.

```jsx
// practice/useInterval.js
import { useEffect, useRef } from 'react'

export function useInterval(callback, delay) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return  // allow pausing by passing null
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}
```

**Test it by building:** A stopwatch / countdown timer component.

---

#### 10. `useAsync`
**What:** Handles any async operation (not just fetch) — tracks loading, result, error.
**Why:** More flexible than useFetch — works with any promise (db calls, file reads, etc.)

```jsx
// practice/useAsync.js
import { useState, useEffect, useCallback } from 'react'

export function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle')  // idle | loading | success | error
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const execute = useCallback(() => {
    setStatus('loading')
    setData(null)
    setError(null)

    return asyncFunction()
      .then(res => {
        setData(res)
        setStatus('success')
      })
      .catch(err => {
        setError(err)
        setStatus('error')
      })
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) execute()
  }, [execute, immediate])

  return { execute, status, data, error }
}
```

---

## Exercises After Building All Hooks

1. **Refactor your Week 7 Todo app** — replace all repeated fetch/loading/error logic with `useFetch`
2. **Refactor Week 5 Todo app** — replace localStorage calls with `useLocalStorage`
3. **Add debounced search** to the filter-todo from week 7 using `useDebounce`
4. **Build a dropdown** component using `useToggle` + `useClickOutside`

---

## Capstone Project: GitHub Profile Search App

Build a complete app using ALL the hooks above.

**Features:**
1. Search input (debounced with `useDebounce`)
2. Fetch GitHub user data (using `useFetch`)
3. Show window size badge (using `useWindowSize`)
4. Bookmark users (using `useLocalStorage`)
5. Dark/light mode toggle (using `useToggle`)
6. Auto-refresh bookmarks every 60s (using `useInterval`)
7. Show previous search (using `usePrevious`)

**File structure to create:**
```
project-search-app/
├── src/
│   ├── hooks/
│   │   ├── useToggle.js
│   │   ├── useLocalStorage.js
│   │   ├── usePrevious.js
│   │   ├── useDebounce.js
│   │   ├── useFetch.js
│   │   ├── useWindowSize.js
│   │   ├── useClickOutside.js
│   │   └── useInterval.js
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── UserCard.jsx
│   │   ├── BookmarkList.jsx
│   │   └── ThemeToggle.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── index.html
```

---

## Key Mental Models

| Concept | Remember This |
|---------|--------------|
| Cleanup in useEffect | Always cancel timers, event listeners, and fetch calls on unmount |
| Stale closures | useRef solves stale closure in intervals — `savedCallback.current` |
| Dependency arrays | Hooks that take functions as args — wrap them in `useCallback` at call site |
| Naming | Always start with `use` — React enforces hooks rules based on this |

---

## Checklist — Mark Off As You Complete

- [ ] useToggle built + tested
- [ ] useLocalStorage built + tested
- [ ] usePrevious built + tested
- [ ] useDebounce built + tested (verify only 1 API call fires)
- [ ] useFetch built + tested (loading/error/data states work)
- [ ] useWindowSize built + tested
- [ ] useClickOutside built + tested
- [ ] useThrottle built + tested
- [ ] useInterval built + tested
- [ ] useAsync built + tested
- [ ] Week 7 Todo refactored with custom hooks
- [ ] GitHub Search App capstone complete
