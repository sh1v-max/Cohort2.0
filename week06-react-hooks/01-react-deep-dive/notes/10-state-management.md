# State Management: Basics & Prop Drilling

## What is it?
In React, data flows strictly **one-way: downwards.** 
Parents can pass data (props) to children. Children *cannot* pass data up to parents directly.

## The Mental Model (Lifting State Up)
Imagine a water tower (Parent) supplying two houses (Siblings). 
If House A has its own private well (state), House B cannot get water from it. 
If both houses need the same water, you must "lift the water up" into the main water tower. Then the tower can flow the water down to both houses.

If two sibling components need to see or change the same state, that state MUST live in their closest common parent component.

## Prop Drilling
When you lift state up high in the tree, you often have to pass it through middle-man components that don't care about the data, just to reach a grandchild.

`App -> Navbar -> UserMenu -> ProfilePicture` (passing `user` prop all the way down).

This is completely normal and fine in React, until it gets painful (e.g., passing 10 layers deep).

## The Solution for Severe Prop Drilling
If prop drilling becomes too messy, you solve it by using:
1. **Context API** (React's built-in global state)
2. **Redux / Zustand** (External global state libraries)

## Common Mistakes

**❌ Wrong (Trying to pass data magically upward):**
```jsx
function Parent() {
  // Parent tries to read child's state. ERROR!
  console.log(childData); 
  return <Child />
}
```

**✅ Correct (Pass a callback downward to receive data upward):**
```jsx
function Parent() {
  const [data, setData] = useState("");

  // Parent gives the child a radio to call back home
  return <Child onChange={(val) => setData(val)} />
}

function Child({ onChange }) {
  // Child uses the radio
  return <button onClick={() => onChange("hello from child")}>Send to Parent</button>
}
```
