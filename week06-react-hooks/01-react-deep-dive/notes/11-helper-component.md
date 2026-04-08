# Helper Components

## What are they?
Helper components are small, **single-purpose** components that encapsulate a common UI pattern — conditional rendering, loading states, empty states, list iteration, etc.

They exist to keep your main component's JSX **clean and readable** by extracting repetitive logic into reusable pieces.

## The Mental Model
Think of helper components like kitchen utensils. You *could* do everything with a knife, but having a peeler, a whisk, and tongs makes your workflow cleaner and faster. Each tool does one thing well.

Similarly, instead of cramming ternaries, `.map()` calls, and null-checks inline, you hand each job off to a tiny component built for that job.

## Common Helper Patterns

### 1. `ShowIf` — Conditional Rendering
```jsx
// ❌ Messy inline:
{isLoggedIn ? <Dashboard /> : null}
{!isLoggedIn ? <LoginPrompt /> : null}

// ✅ Clean with helper:
<ShowIf condition={isLoggedIn}>
  <Dashboard />
</ShowIf>
```
```jsx
function ShowIf({ condition, children }) {
  if (!condition) return null;
  return <>{children}</>;
}
```

### 2. `Loader` — Loading State
```jsx
// ❌ Messy inline:
{isLoading ? <Spinner /> : <Content />}

// ✅ Clean with helper:
<Loader isLoading={isLoading}>
  <Content />
</Loader>
```
```jsx
function Loader({ isLoading, children }) {
  if (isLoading) return <p>Loading...</p>;
  return <>{children}</>;
}
```

### 3. `EachItem` — List Rendering (Render Props)
```jsx
// ❌ Inline .map() cluttering JSX:
<ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>

// ✅ Clean with helper:
<EachItem items={items} render={(item) => <li key={item.id}>{item.name}</li>} />
```
```jsx
function EachItem({ items, render }) {
  if (!items || items.length === 0) return <p>No items.</p>;
  return <ul>{items.map(render)}</ul>;
}
```

## Key Takeaways
- Helper components **don't hold state** — they receive everything via props.
- They follow the **single responsibility principle** — one component, one job.
- The **render props** pattern (passing a function as a prop) gives the parent full control over what gets rendered, while the helper handles the *when* and *how*.
- These patterns scale well: once you create a `ShowIf`, you use it everywhere instead of writing ternaries.
