# Deep Dive: Custom Hooks

## What is it?
A custom hook is a regular JavaScript function whose name starts with `use` and that can call other React hooks inside it. It's the primary mechanism for **reusing stateful logic** across components.

## The Mental Model
Think of custom hooks as your own personal toolbox. React gives you basic tools (useState, useEffect, etc.). Custom hooks let you combine those tools into higher-level, reusable power tools. For example, instead of writing the same `useEffect` + `useState` combo for fetching data in 10 components, you write a `useFetch` hook once.

## Rules of Custom Hooks
1. **Name must start with `use`** — React uses this convention to enforce the Rules of Hooks.
2. **Can call other hooks** — useState, useEffect, useRef, useMemo, and even other custom hooks.
3. **Each call gets its own state** — if two components use `useToggle()`, they each get their own independent `value`.

## When to create a custom hook?
1. When you find yourself duplicating the same `useState` + `useEffect` pattern across multiple components.
2. When a piece of logic is complex and you want to abstract it behind a clean API.
3. When you want to share behavior, not UI (if you want to share UI, use a component instead).

## Common Patterns

**useLocalStorage:**
```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

**useWindowWidth:**
```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return width;
}
```

**useToggle:**
```jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(prev => !prev);
  return [value, toggle];
}
```

## Key Takeaway
Custom hooks are not a special React feature — they are a **convention**. Any function that starts with `use` and calls hooks is a custom hook. They're the backbone of clean, DRY React code.
