# Deep Dive: useState

## What is it?
`useState` is the most fundamental React hook. It lets you add **reactive state** to a function component. When the state changes, React re-renders the component with the new value.

## The Mental Model
Think of `useState` like a sticky note on a component. React remembers the value between renders. When you update it, React tears off the old note, writes the new value, and re-paints the component.

## Syntax
```jsx
const [value, setValue] = useState(initialValue)
```
- `value` — the current state
- `setValue` — a function to update the state and trigger a re-render
- `initialValue` — the starting value (only used on the first render)

## Key Concepts

### 1. Functional Updater
When the new value depends on the old value, pass a **function** to the setter:
```jsx
// ❌ can cause bugs with batched updates
setCount(count + 1)
setCount(count + 1) // still uses the OLD count!

// ✅ always uses the latest value
setCount(prev => prev + 1)
setCount(prev => prev + 1) // correctly uses the updated value
```

### 2. Object & Array State — Never Mutate!
React compares state by **reference**, not by deep equality. You must create a new object or array to trigger a re-render.
```jsx
// ✅ correct — spread to create a new object
setUser(prev => ({ ...prev, age: prev.age + 1 }))

// ❌ wrong — mutating the existing object
user.age = 22
setUser(user) // same reference → React skips the re-render!
```
Same rule for arrays:
```jsx
// ✅ correct
setFruits(prev => [...prev, '🍇'])

// ❌ wrong
fruits.push('🍇')
setFruits(fruits)
```

### 3. Lazy Initialization
If the initial value is expensive to compute, pass a **function** so it only runs on the first render:
```jsx
// ✅ lazy — runs once
const [data] = useState(() => expensiveComputation())

// ❌ eager — runs every render, even though the result is thrown away
const [data] = useState(expensiveComputation())
```

## Common Mistakes
1. **Mutating state directly** — always create a new value. React uses `Object.is()` comparison.
2. **Stale closures** — inside `setTimeout` or old event handlers, the captured state may be outdated. Use the functional updater to stay safe.
3. **Setting state in the render body** — causes an infinite render loop. State updates should happen inside event handlers or `useEffect`.
4. **Expecting synchronous updates** — `setState` does not update the value immediately; the new value is available on the next render.

## Key Takeaway
`useState` is simple on the surface but has important nuances: always use immutable updates, prefer the functional updater when the new value depends on the old one, and use lazy initialization for expensive computations.
