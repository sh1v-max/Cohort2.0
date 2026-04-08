# Deep Dive: useRef

## What is it?
`useRef` is a React Hook that lets you reference a value that's not needed for rendering.

## The Mental Model
Think of `useRef` as a secret box that React doesn't look at during rendering. 
If you put a value in state using `useState`, React watches it closely. Whenever it changes, React panics and re-draws the entire UI to make sure the screen matches the state.
If you put a value in `useRef`, React ignores it. You can change it 10,000 times, and the screen will *never* update because of it.

## The Two Main Uses cases

### 1. Storing Mutable Values (Silent State)
You want to keep track of a value between renders (like an interval ID, or counting how many times a user clicked a tracking link), but you DO NOT want the user's screen to re-render when the tracking number goes up.

### 2. Accessing DOM Elements Directly
Sometimes React's declarative way isn't enough. You need to actually touch an HTML element (for example, to call `.focus()` on an input, or measure its width in pixels).

```jsx
const inputRef = useRef(null);
// React gives you the literal HTML element inside `.current`
inputRef.current.focus(); 
```

## Common Mistakes

**❌ Wrong (Reading/Writing Ref during Render):**
```jsx
function MyComponent() {
  const myRef = useRef(0);
  // BAD: don't mutate or read it during the rendering phase!
  myRef.current = myRef.current + 1; 

  return <p>{myRef.current}</p>; // BAD: won't update on screen automatically!
}
```

**✅ Correct (Reading/Writing in Event Handlers or Effects):**
```jsx
function MyComponent() {
  const myRef = useRef(0);
  
  const handleClick = () => {
    // GOOD: safely mutate it in an event handler.
    myRef.current = myRef.current + 1;
  };

  return <button onClick={handleClick}>Click</button>;
}
```
