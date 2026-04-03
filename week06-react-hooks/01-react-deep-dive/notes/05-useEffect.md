# Deep Dive: useEffect

## What is it?
`useEffect` lets you synchronize a component with an external system (network, DOM, timers, subscriptions). It is a "side effect" of rendering.

## The Mental Model
React components should ideally be "pure functions" (give it data `A`, it returns UI `B`). But sometimes you have to step outside of React's world to fetch data or listen to the window size. `useEffect` is the bridge between React's pure world and the messy outside world.

## The Three Forms of Dependencies

1. **No Array:** `useEffect(() => {})`
   - Runs on mount AND after *every single re-render*. (Rarely what you want).
2. **Empty Array:** `useEffect(() => {}, [])`
   - Runs *exactly once* after the initial render (on mount).
3. **Array with Variables:** `useEffect(() => {}, [x, y])`
   - Runs on mount, AND whenever `x` or `y` changes.

## Cleanup Functions
If your effect does something ongoing (like `setInterval`, or listening to a WebSocket), you MUST provide a cleanup function. If you don't, when the component disappears, the timer stays alive in the background (Memory Leak!).

## Common Mistakes

**❌ Wrong (Infinite Loop):**
```jsx
// no dependency array + setting state = infinite loop crash!
useEffect(() => {
  setCount(count + 1);
});
```

**❌ Wrong (Forgetting Cleanup):**
```jsx
useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  // BAD! when this component dies, it keeps listening to scroll!
}, []);
```

**✅ Correct (With Cleanup):**
```jsx
useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll); // GOOD!
}, []);
```
