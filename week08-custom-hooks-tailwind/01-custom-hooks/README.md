# Custom Hooks

A collection of 10 production-grade React custom hooks built from scratch.

Each hook lives in `practice/` as a standalone file — copy any of them into your own projects directly.

---

## What Is a Custom Hook?

A custom hook is a JavaScript function whose name starts with `use` and that calls other React hooks inside it. It lets you **extract stateful logic out of a component** so it can be shared across multiple components without duplicating code.

```jsx
// Without custom hook — same logic copy-pasted in every component
function ComponentA() {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem('key-a')
    return saved ? JSON.parse(saved) : null
  })
  // ... save to localStorage every time value changes
}

function ComponentB() {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem('key-b')
    return saved ? JSON.parse(saved) : null
  })
  // ... same logic again
}

// With custom hook — logic written once, used everywhere
function ComponentA() {
  const [value, setValue] = useLocalStorage('key-a', null)
}
function ComponentB() {
  const [value, setValue] = useLocalStorage('key-b', null)
}
```

**The rule:** If two components share the same stateful logic, that logic belongs in a custom hook.

---

## Hook Index

| # | Hook | One-liner |
|---|------|-----------|
| 1 | [useToggle](#1-usetoggle) | Boolean with named setters |
| 2 | [useLocalStorage](#2-uselocalstorage) | `useState` that survives page refresh |
| 3 | [usePrevious](#3-useprevious) | Returns the value from the last render |
| 4 | [useDebounce](#4-usedebounce) | Delays a value until input stops changing |
| 5 | [useFetch](#5-usefetch) | Full fetch lifecycle in one call |
| 6 | [useWindowSize](#6-usewindowsize) | Live browser window dimensions |
| 7 | [useClickOutside](#7-useclickoutside) | Fires callback on outside click |
| 8 | [useThrottle](#8-usethrottle) | Limits how often a value can update |
| 9 | [useInterval](#9-useinterval) | Safe `setInterval` wrapper |
| 10 | [useAsync](#10-useasync) | Any async operation with status tracking |

---

## 1. `useToggle`

**File:** [practice/useToggle.js](practice/useToggle.js)

### What it does

Manages a boolean value with named, stable setter functions. Avoids writing `setValue(v => !v)` everywhere.

### Signature

```js
const [value, toggle, setTrue, setFalse] = useToggle(initialValue = false)
```

| Return | Type | Description |
|--------|------|-------------|
| `value` | `boolean` | Current state |
| `toggle` | `() => void` | Flips the value |
| `setTrue` | `() => void` | Forces value to `true` |
| `setFalse` | `() => void` | Forces value to `false` |

### Why `useCallback`?

All three setter functions are wrapped in `useCallback` so they never get recreated between renders. This matters when you pass them as props to child components — without `useCallback`, the child re-renders on every parent render even if nothing changed.

### Usage

```jsx
import { useToggle } from './hooks/useToggle'

function Modal() {
  const [isOpen, openModal, , closeModal] = useToggle(false)

  return (
    <>
      <button onClick={openModal}>Open</button>
      {isOpen && (
        <div className="modal">
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </>
  )
}
```

### Common use cases

- Modal open/close
- Dark/light mode toggle
- Dropdown open/close
- Show/hide password in an input
- Sidebar collapsed/expanded

---

## 2. `useLocalStorage`

**File:** [practice/useLocalStorage.js](practice/useLocalStorage.js)

### What it does

A drop-in replacement for `useState` that automatically reads from and writes to `localStorage`. The value survives page refreshes, browser closes, and tab switches.

### Signature

```js
const [storedValue, setValue, removeValue] = useLocalStorage(key, initialValue)
```

| Param / Return | Type | Description |
|----------------|------|-------------|
| `key` | `string` | The `localStorage` key to read/write |
| `initialValue` | `any` | Default value if key doesn't exist yet |
| `storedValue` | `any` | Current value (reads from localStorage on mount) |
| `setValue` | `(value) => void` | Updates state AND writes to localStorage |
| `removeValue` | `() => void` | Deletes the key and resets to `initialValue` |

### How it works

On the first render, a lazy initializer function reads from `localStorage` — this runs only once, not on every render. Every call to `setValue` updates both React state and `localStorage` simultaneously. All reads/writes are wrapped in `try/catch` because `localStorage` can throw in private browsing or when storage is full.

Supports the functional update pattern, just like `useState`:

```jsx
// Both of these work
setValue('new value')
setValue(prev => [...prev, 'new item'])
```

### Usage

```jsx
import { useLocalStorage } from './hooks/useLocalStorage'

function BookmarkList() {
  const [bookmarks, setBookmarks, clearBookmarks] = useLocalStorage('bookmarks', [])

  const addBookmark = (item) => setBookmarks(prev => [...prev, item])
  const removeBookmark = (id) => setBookmarks(prev => prev.filter(b => b.id !== id))

  return (
    <div>
      {bookmarks.map(b => <div key={b.id}>{b.name}</div>)}
      <button onClick={clearBookmarks}>Clear all</button>
    </div>
  )
}
```

### Common use cases

- User preferences (theme, language, font size)
- Bookmarked/saved items
- Form draft auto-save
- Recently searched terms
- Dismissed banners / onboarding state

---

## 3. `usePrevious`

**File:** [practice/usePrevious.js](practice/usePrevious.js)

### What it does

Returns the value that was passed in during the **previous render**. On the very first render it returns `undefined`.

### Signature

```js
const previousValue = usePrevious(value)
```

### How it works

React's `useRef` creates a box that persists across renders without triggering re-renders when changed. The `useEffect` runs **after** the render completes — so during the current render, `ref.current` still holds the old value. After the render, the effect updates it to the new value. This timing gap is what makes `usePrevious` work.

```
Render 1: value = "react"  → ref.current = undefined  → returns undefined
                              ↓ (effect runs after render)
                              ref.current = "react"

Render 2: value = "hooks"  → ref.current = "react"    → returns "react"
                              ↓ (effect runs after render)
                              ref.current = "hooks"
```

### Usage

```jsx
import { usePrevious } from './hooks/usePrevious'

function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

  return (
    <div>
      <p>Now: {count}</p>
      <p>Before: {prevCount ?? 'nothing yet'}</p>
      <p>Trend: {prevCount !== undefined && (count > prevCount ? '↑ up' : '↓ down')}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
    </div>
  )
}
```

### Common use cases

- Detecting direction of change (up/down, left/right)
- Running an effect only when a value changes from a specific previous value
- Showing "previous search: X" hints
- Animations that depend on transition direction
- Comparison logic (did the list grow or shrink?)

---

## 4. `useDebounce`

**File:** [practice/useDebounce.js](practice/useDebounce.js)

### What it does

Takes a rapidly-changing value and returns a "settled" version of it that only updates after the user has stopped changing it for a specified delay. This prevents expensive operations (API calls, filtering large lists) from running on every single keystroke.

### Signature

```js
const debouncedValue = useDebounce(value, delay = 500)
```

| Param | Type | Description |
|-------|------|-------------|
| `value` | `any` | The raw, fast-changing value |
| `delay` | `number` | Ms to wait after last change before updating (default: 500) |

### How it works — why cleanup is critical

Every time `value` changes, a `setTimeout` is scheduled. The `useEffect` **cleanup function** runs before the next effect, which cancels the previous timer. This means:

```
User types: "r" → "re" → "rea" → "reac" → "react"

Without cleanup:  5 timers fire → 5 API calls
With cleanup:     4 timers get cancelled → 1 API call fires (for "react")
```

Without the cleanup return, you'd hammer the API with every keystroke — defeating the entire purpose.

### Usage

```jsx
import { useState } from 'react'
import { useDebounce } from './hooks/useDebounce'
import { useFetch } from './hooks/useFetch'

function SearchUsers() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  // This URL only changes (and triggers a fetch) after 500ms of no typing
  const url = debouncedQuery ? `https://api.github.com/users/${debouncedQuery}` : null
  const { data, loading } = useFetch(url)

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <p>Searching...</p>}
      {data && <p>Found: {data.login}</p>}
    </div>
  )
}
```

### Debounce vs Throttle

| | Debounce | Throttle |
|-|----------|---------|
| **When it fires** | After quiet period ends | Immediately, then blocked for N ms |
| **Best for** | Search inputs, form validation | Scroll events, resize handlers, mouse move |
| **Pattern** | Wait → fire once | Fire → wait → allow again |

### Common use cases

- Search-as-you-type (API calls)
- Form field validation
- Auto-saving a draft
- Filtering large lists
- Any operation that's expensive to run on every keystroke

---

## 5. `useFetch`

**File:** [practice/useFetch.js](practice/useFetch.js)

### What it does

Handles the complete data-fetching lifecycle — loading, success, and error states — for any URL. Eliminates the repetitive pattern of setting up `loading/data/error` state in every component that makes a network request.

### Signature

```js
const { data, loading, error, refetch } = useFetch(url)
```

| Param / Return | Type | Description |
|----------------|------|-------------|
| `url` | `string \| null` | URL to fetch. Pass `null` to skip fetching. |
| `data` | `any \| null` | Parsed JSON response, or `null` |
| `loading` | `boolean` | `true` while the request is in flight |
| `error` | `string \| null` | Error message string, or `null` |
| `refetch` | `() => void` | Manually trigger the same request again |

### How it works — the `cancelled` flag

When a component unmounts while a fetch is in flight (e.g. user navigates away), the fetch callback still runs and tries to call `setData` / `setLoading` on an unmounted component. React used to warn about this ("Can't perform a React state update on an unmounted component"). The `cancelled` flag prevents this:

```js
let cancelled = false

fetch(url).then(data => {
  if (!cancelled) setData(data)  // only update if still mounted
})

return () => { cancelled = true }  // set flag on unmount
```

### Passing `null` to skip fetching

This pattern is very common when the URL depends on user input:

```jsx
// No URL = no fetch. Safe to do on every render.
const url = searchTerm ? `/api/search?q=${searchTerm}` : null
const { data } = useFetch(url)
```

### Usage

```jsx
import { useFetch } from './hooks/useFetch'

function UserProfile({ username }) {
  const { data: user, loading, error, refetch } = useFetch(
    `https://api.github.com/users/${username}`
  )

  if (loading) return <p>Loading...</p>
  if (error)   return <p>Error: {error} <button onClick={refetch}>Retry</button></p>
  if (!user)   return null

  return (
    <div>
      <img src={user.avatar_url} alt={user.login} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  )
}
```

### Common use cases

- Fetching user profiles, product data, blog posts
- Any component that loads data on mount
- Anything that needs loading skeletons and error states
- Paired with `useDebounce` for search-as-you-type

---

## 6. `useWindowSize`

**File:** [practice/useWindowSize.js](practice/useWindowSize.js)

### What it does

Tracks the browser window's `innerWidth` and `innerHeight` in real time and returns them as reactive state. Automatically updates on window resize.

### Signature

```js
const { width, height } = useWindowSize()
```

### When to use this vs CSS media queries

CSS media queries handle most responsive design. Use `useWindowSize` only when you need **JavaScript to react to the screen size** — things CSS can't do:

- Conditionally rendering a component (not just hiding it with `display: none`)
- Changing JavaScript logic based on screen size
- Passing screen-size-dependent values to a third-party library
- Showing/hiding elements where unmounting matters (modals, sidebars)

### Usage

```jsx
import { useWindowSize } from './hooks/useWindowSize'

function ResponsiveNav() {
  const { width } = useWindowSize()
  const isMobile = width < 768

  // On mobile: render bottom nav. On desktop: render sidebar.
  // CSS can't unmount/mount components — only JS can.
  return isMobile ? <BottomNav /> : <Sidebar />
}
```

```jsx
// Breakpoint helper
function useBreakpoint() {
  const { width } = useWindowSize()
  if (width < 640)  return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}
```

### Common use cases

- Conditionally mounting/unmounting mobile vs desktop layouts
- Responsive charts and data visualizations
- Dynamic column counts in masonry layouts
- Breakpoint badges in dev tools
- Opening a drawer vs modal based on screen size

---

## 7. `useClickOutside`

**File:** [practice/useClickOutside.js](practice/useClickOutside.js)

### What it does

Listens for mouse clicks anywhere on the document and fires a callback when the click happens **outside** a given element. Essential for closing dropdowns, popovers, and menus when the user clicks elsewhere.

### Signature

```js
useClickOutside(ref, callback)
```

| Param | Type | Description |
|-------|------|-------------|
| `ref` | `React.RefObject` | Ref attached to the container element to watch |
| `callback` | `() => void` | Fired when a click happens outside `ref.current` |

### How it works

The key check is `ref.current.contains(e.target)`. The DOM's `.contains()` method returns `true` if an element is the element itself OR any of its descendants. So clicking anywhere inside the element (including deeply nested children) won't trigger the callback — only clicks truly outside it will.

```
Click on the button inside dropdown → e.target is the button
→ ref.current.contains(button) = true → callback NOT called ✓

Click on the page backdrop → e.target is the body or some other element
→ ref.current.contains(body) = false → callback IS called ✓
```

### Usage

```jsx
import { useRef } from 'react'
import { useToggle } from './hooks/useToggle'
import { useClickOutside } from './hooks/useClickOutside'

function Dropdown({ options }) {
  const [isOpen, , , close] = useToggle(false)
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)

  useClickOutside(ref, close)  // close when clicking outside

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setIsOpen(v => !v)}>
        {selected ?? 'Select an option'} ▾
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map(opt => (
            <li key={opt} onClick={() => { setSelected(opt); close() }}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### Common use cases

- Closing dropdowns on outside click
- Closing modals/dialogs when clicking the backdrop
- Closing tooltip popovers
- Collapsing search suggestion lists
- Any floating UI that should dismiss on outside interaction

---

## 8. `useThrottle`

**File:** [practice/useThrottle.js](practice/useThrottle.js)

### What it does

Returns a throttled version of a value — one that updates immediately on the first change, then waits for a cooldown period before allowing another update. Prevents high-frequency events from overwhelming your UI.

### Signature

```js
const throttledValue = useThrottle(value, limit = 300)
```

### Debounce vs Throttle — detailed comparison

```
Raw value:        a----b--c-d------e

Debounce (300ms): wait until 300ms of silence, then fire
                  ----------------a (nope, b came)
                  -------b (nope, c came)
                  --c (nope, d came)
                  ------d (300ms passed, fire!) ----e (fire!)
Result:                          d              e

Throttle (300ms): fire immediately, then block for 300ms, fire again at end
                  a (fire!)
                  [300ms blocked] b,c,d dropped (but trailing d fires at end)
                  d (trailing fire) ----e (fire!)
Result:           a         d              e
```

**Use debounce when:** you only care about the final value (search input — you want the complete word, not every letter)

**Use throttle when:** you want regular updates but not every single one (scroll position, mouse coordinates, resize)

### Usage

```jsx
import { useThrottle } from './hooks/useThrottle'

function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0)
  const throttledScrollY = useThrottle(scrollY, 100)  // max 10 updates/second

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return <div>Scroll position: {throttledScrollY}px</div>
}
```

### Common use cases

- Scroll-position tracking
- Mouse/cursor position tracking
- Window resize handlers (when you need intermediate values, not just final)
- Rate-limiting button clicks
- Live search where you want updates during typing, not just at the end

---

## 9. `useInterval`

**File:** [practice/useInterval.js](practice/useInterval.js)

### What it does

A safe, idiomatic wrapper around `setInterval` that automatically handles cleanup and solves the **stale closure problem** that makes raw `setInterval` inside `useEffect` error-prone.

### Signature

```js
useInterval(callback, delay)
```

| Param | Type | Description |
|-------|------|-------------|
| `callback` | `() => void` | Function to call on each tick |
| `delay` | `number \| null` | Ms between ticks. Pass `null` to pause the interval. |

### The stale closure problem (why this hook exists)

Raw `setInterval` inside `useEffect` captures a closure over the component's state at the time the effect ran — this is called a **stale closure**:

```jsx
// BROKEN — stale closure bug
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1)  // 'count' is always 0 — captured at effect time!
    }, 1000)
    return () => clearInterval(id)
  }, [])  // [] means effect runs once, so 'count' is stale forever

  return <div>{count}</div>  // Never goes above 1
}
```

`useInterval` solves this by storing the callback in a `useRef`. The ref is updated on every render (via a separate `useEffect`), but the interval itself never restarts — it always reads `savedCallback.current`, which is always the latest version of the function.

```
Render 1: callback closes over count=0  → ref.current = fn(count=0)
Render 2: callback closes over count=1  → ref.current = fn(count=1)  ← always fresh
Render 3: callback closes over count=2  → ref.current = fn(count=2)  ← always fresh

setInterval always calls ref.current() → always uses the latest callback ✓
```

### Pausing with `null`

Pass `null` as the delay to pause the interval. Pass a number to resume it.

### Usage

```jsx
import { useState } from 'react'
import { useToggle } from './hooks/useToggle'
import { useInterval } from './hooks/useInterval'

function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
  const [running, , start, stop] = useToggle(false)

  useInterval(
    () => setSeconds(s => s + 1),
    running ? 1000 : null  // null = paused
  )

  const reset = () => { stop(); setSeconds(0) }

  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
```

### Common use cases

- Countdown timers and stopwatches
- Auto-refreshing data (polls an API every N seconds)
- Slideshow / carousel auto-advance
- Typing animation (reveals text character by character)
- Progress bars that advance automatically
- Live clock display

---

## 10. `useAsync`

**File:** [practice/useAsync.js](practice/useAsync.js)

### What it does

Wraps **any async operation** (not just `fetch`) with a standard status lifecycle: `idle → loading → success/error`. More flexible than `useFetch` because it works with any Promise — database calls, file reads, computed async operations, etc.

### Signature

```js
const { status, data, error, execute } = useAsync(asyncFn, immediate = true)
```

| Param / Return | Type | Description |
|----------------|------|-------------|
| `asyncFn` | `() => Promise<T>` | Async function to call |
| `immediate` | `boolean` | Run on mount automatically (default: `true`) |
| `status` | `'idle' \| 'loading' \| 'success' \| 'error'` | Current state |
| `data` | `T \| null` | Resolved value on success |
| `error` | `string \| null` | Error message on failure |
| `execute` | `() => Promise<void>` | Manually trigger the async function |

### Status machine

```
                     execute()
     ┌─────────────────────────┐
     ▼                         │
  'idle' ──execute()──► 'loading' ──success──► 'success'
                              │
                              └──error───► 'error'
```

### `useAsync` vs `useFetch`

| | `useFetch` | `useAsync` |
|-|------------|------------|
| **Input** | URL string | Any async function |
| **Triggered by** | URL changing | `execute()` or mount |
| **Use for** | GET requests | Any Promise |
| **Refetch** | `refetch()` | `execute()` |

### Usage

```jsx
import { useCallback } from 'react'
import { useAsync } from './hooks/useAsync'

// Example: sending a form (POST, not just GET)
function ContactForm() {
  const submitForm = useCallback(async () => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Shiv', message: 'Hello' }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) throw new Error('Failed to send')
    return res.json()
  }, [])

  const { status, error, execute } = useAsync(submitForm, false)  // false = don't run on mount

  return (
    <form onSubmit={e => { e.preventDefault(); execute() }}>
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send message'}
      </button>
      {status === 'success' && <p>Message sent!</p>}
      {status === 'error'   && <p>Error: {error}</p>}
    </form>
  )
}
```

### Common use cases

- Form submissions (POST, PUT, DELETE — not just GET)
- Operations that shouldn't run on mount (triggered by button click)
- Multi-step async workflows
- File uploads
- Any async operation where you need explicit `execute()` control

---

## How All Hooks Connect

These hooks are designed to compose with each other naturally:

```
useDebounce  ──► feeds debouncedValue into ──► useFetch (URL)
useToggle    ──► open/close state for    ──► useClickOutside (close on outside click)
useInterval  ──► ticks every N seconds   ──► useLocalStorage (save timestamp)
useFetch     ──► loading state shown via ──► usePrevious (compare with previous data)
useAsync     ──► status === 'loading'    ──► useToggle (show/hide spinner)
useWindowSize──► isMobile check         ──► conditional render of useClickOutside target
```

### Capstone: GitHub Search App

The [project-search-app/](project-search-app/) demonstrates all hooks working together in a real application:

```
useToggle       → dark/light mode toggle button
useLocalStorage → bookmarks persist across page refreshes
useDebounce     → 500ms delay before GitHub API is called
useFetch        → fetch lifecycle (loading skeleton, error state, user data)
useWindowSize   → breakpoint badge in the status bar
useInterval     → auto-updates a "last refreshed" timestamp every 60 seconds
usePrevious     → shows "previous search: X" hint below the input
```

Run it:
```bash
cd project-search-app
npm install
npm run dev
```

---

## Rules of Hooks (Required Reading)

1. **Only call hooks at the top level** — never inside loops, conditions, or nested functions. React tracks hooks by call order; changing that order breaks everything.

2. **Only call hooks from React functions** — either function components or other custom hooks. Never in plain JS functions, class components, or event handlers.

3. **Names must start with `use`** — this is how React's linter identifies hooks and enforces the rules above. It's also how other developers know the function uses hooks inside.

```jsx
// ✅ Correct
function MyComponent() {
  const [value] = useToggle(false)
}

// ❌ Wrong — hook called inside condition
function MyComponent() {
  if (someCondition) {
    const [value] = useToggle(false)  // breaks hook call order
  }
}

// ❌ Wrong — hook called inside event handler
function MyComponent() {
  const handleClick = () => {
    const [value] = useToggle(false)  // not a React function scope
  }
}
```
