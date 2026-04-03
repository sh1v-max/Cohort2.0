# Re-rendering in React

## What is it?

A React component is a function. "Rendering" simply means React is executing this function again to figure out what the UI should look like now.

## The Mental Model

Imagine a painter painting a portrait. If you ask them to change the shirt color, they don't just magically update the shirt instantly. They look at the subject, evaluate what changed, and paint a new frame.
When state changes, React calls your function again from top to bottom, creates a new "Virtual DOM", compares it to the old one, and only updates the actual browser DOM where differences exist.

### What triggers a re-render?

1. **State changes** (e.g. `setCount(count + 1)`)
2. **Prop changes** (If a parent passes new data down)
3. **Context changes** (If a subscribed Context API value changes)
4. **Parent re-rendering** (Crucial! If a parent re-renders, _all_ its children re-render by default).

## Common Mistakes

**❌ Wrong (Mutating state directly):**

```jsx
let [user, setUser] = useState({ name: 'John' })
// this will NOT trigger a re-render because React doesn't know you changed it!
user.name = 'Jane'
```

**✅ Correct (Using the setter):**

```jsx
let [user, setUser] = useState({ name: 'John' })
// this triggers a re-render
setUser({ ...user, name: 'Jane' })
```

**❌ Wrong (Heavy Math in Component Body):**

```jsx
function App() {
  const [count, setCount] = useState(0)
  // this loops 10,000 times EVERY time you click the counter!
  let total = 0
  for (let i = 0; i < 10000; i++) total += i

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>
}
```
