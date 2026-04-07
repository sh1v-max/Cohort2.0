# Deep Dive: Prop Drilling

## What is it?
Prop drilling is the process of passing data through multiple layers of components via props, even though intermediate components don't actually use that data. They only receive it to forward it to a child further down.

## The Mental Model
Imagine you're in a relay race but you need to pass the baton through 5 runners just to get it to the last one. Runners 2, 3, and 4 don't care about the baton — they just hold it for a second and pass it along. That's prop drilling. It works, but it's tedious and fragile.

## Why is it a problem?
1. **Hard to maintain** — If you rename a prop or change its type, you have to update every single component in the chain.
2. **Unnecessary coupling** — Intermediate components know about props they don't care about.
3. **Harder to refactor** — Moving a component in the tree means re-wiring all the props.

## The Drilling Pattern
```
TopComponent (owns the state)
  └── GrandParent (receives & forwards)
        └── Parent (receives & forwards)
              └── Child (receives & forwards)
                    └── GrandChild (FINALLY uses it!)
```

## Solutions

### 1. Context API (Built-in)
```jsx
const UserContext = React.createContext();

function TopComponent() {
  const [user, setUser] = useState({ name: "Shiv" });
  return (
    <UserContext.Provider value={user}>
      <GrandParent /> {/* No props needed! */}
    </UserContext.Provider>
  );
}

function GrandChild() {
  const user = useContext(UserContext); // Direct access!
  return <p>{user.name}</p>;
}
```

### 2. State Management Libraries
- **Zustand** — lightweight, minimal boilerplate
- **Redux Toolkit** — for large, complex apps
- **Jotai / Recoil** — atomic state management

### 3. Component Composition
Restructure your component tree so that the component needing the data is closer to where the data lives. Sometimes the simplest fix is just moving things around.

## When is Prop Drilling OK?
- When you only go 1-2 levels deep — that's totally normal!
- When the intermediate components actually use some of the props.
- In small apps where adding Context would be overkill.

## Key Takeaway
Prop drilling is a **code smell**, not a bug. It's a signal that your component structure might benefit from Context, composition, or a state management solution. Don't reach for a library the moment you pass a single prop — but do refactor when the chain gets long and painful.
