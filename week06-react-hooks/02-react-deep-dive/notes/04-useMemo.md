# Deep Dive: useMemo

## What is it?
`useMemo` is a React Hook that lets you cache the *result* of a calculation between re-renders. 

## The Mental Model
Imagine you work in a bakery and someone orders a custom 5-tier wedding cake. You bake it (expensive calculation). 
If the same person comes back 5 minutes later and asks for the exact same cake, do you bake a new one? No! You give them the one you already made (caching). 
BUT, if they ask for chocolate instead of vanilla, you *have* to bake a new one (dependency changed).

## When to use it?
1. When you have a noticeably slow calculation (heavy math, sorting large arrays, filtering thousands of items).
2. When you want to pass an object/array as a prop to a child, and don't want the child to re-render needlessly (because React sees new objects as "different" on every render).

## Common Mistakes

**❌ Wrong (Overusing it):**
```jsx
// bad! calculating 2 + 2 is instantly fast. 
// useMemo actually ADDS overhead. don't use it for simple things!
const result = useMemo(() => 2 + 2, []); 
```

**✅ Correct (Expensive operations):**
```jsx
const sortedList = useMemo(() => {
  return largeDataset.sort((a,b) => a.value - b.value);
}, [largeDataset]);
```
