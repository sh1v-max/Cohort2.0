# Deep Dive: useCallback

## What is it?
`useCallback` is a React Hook that lets you cache a *function definition* between re-renders. 

## useMemo vs useCallback
- `useMemo` caches the **return value** of a function.
- `useCallback` caches the **function itself**.

## The Mental Model
Every time a component re-renders, it runs from top to bottom. If you define a function inside the component `const myFunc = () => {}`, React creates a brand new function in memory. 

Usually, this is fine and very fast. But if you pass `myFunc` as a prop to a child component, the child says "Ah! A new prop! I must re-render!". `useCallback` tells React not to create a new function memory reference unless necessary.

## When to use it?
1. When you are passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (components wrapped in `React.memo`).
2. When a function is used as a dependency in a `useEffect`.

## Common Mistakes

**❌ Wrong (Using it everywhere):**
```jsx
// Unnecessary! Button is a standard HTML element, we don't need to save renders here.
const handleClick = useCallback(() => console.log('click'), []);
return <button onClick={handleClick}>Click Me</button>
```

**✅ Correct (Protecting heavily rendered children):**
```jsx
// Here, HugeChart takes a long time to render. 
// We use useCallback so HugeChart doesn't re-render unless it absolutely must!
const onDataClick = useCallback((id) => setSelection(id), []);
return <HugeChart data={data} onDataClick={onDataClick} />
```
