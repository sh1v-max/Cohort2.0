# Wrapper Components & The Children Prop

## What is it?
The `children` prop is a special prop in React that passes whatever you put *between* a component's opening and closing tags directly into the component.

## The Mental Model
Think of a picture frame. The frame provides the structural wood and glass (the Wrapper Component), but it doesn't care what photo you put inside it (the `children`).

## When to use it?
- Layouts (e.g., A `SidebarLayout` that renders whatever page content you give it).
- Modals, Dialogs, Cards (UI shells).
- Preventing Prop Drilling (sometimes instead of passing data down 5 levels, you can just pass the component itself down).

## Common Mistakes

**❌ Wrong (Passing huge UI blocks as props):**
```jsx
// Very ugly to read, hard to write logic inside
<Modal 
  header="Warning" 
  body={<form><input /><button>Submit</button></form>} 
/>
```

**✅ Correct (Using composition):**
```jsx
// Clean, readable, feels like normal HTML
<Modal header="Warning">
  <form>
    <input />
    <button>Submit</button>
  </form>
</Modal>
```

**How to implement the `Modal` Component:**
```jsx
function Modal({ header, children }) {
  return (
    <div className="modal-shell">
      <h2>{header}</h2>
      <div className="modal-body">
        {/* THIS is where the form gets injected! */}
        {children} 
      </div>
    </div>
  )
}
```
