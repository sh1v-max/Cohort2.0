# React Returns & Fragments

## What is it?
Every React component is fundamentally a JavaScript function that must return UI to be rendered. 

## The Mental Model
Think of a React component returning a single "box". You can put as many items as you want *inside* the box, but you can only hand *one box* back to React at a time. If you try to return two boxes without a parent, React's rendering engine (the reconciler) gets confused.

## Syntax & Examples

### Valid Returns:
- **JSX / DOM Elements:** `return <div>Hello</div>`
- **Strings or Numbers:** `return "Hello World"` or `return 42`
- **Booleans/Null (Renders nothing):** `return null` or `return true` (useful for conditional statements: `isTrue && <Component />`)
- **Arrays:** `return [<li key="1">1</li>, <li key="2">2</li>]`

### Fragments `<> ... </>`
If you need to return multiple items but don't want to add a useless `<div>` to your final HTML (which can mess up CSS Flexbox/Grid layouts), you use a React Fragment.

```jsx
// renders directly side-by-side in the DOM without a wrapper div
return (
  <>
    <h1>Title</h1>
    <p>Subtitle</p>
  </>
)
```

## Common Mistakes
Returning two sibling elements directly.

**❌ Wrong:**
```jsx
return (
  <header>Header</header>
  <main>Content</main>
)
```

**✅ Correct:**
```jsx
return (
  <>
    <header>Header</header>
    <main>Content</main>
  </>
)
```
