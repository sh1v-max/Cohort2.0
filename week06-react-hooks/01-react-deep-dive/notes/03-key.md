# The Key Prop

## What is it?
When you render a list of elements in React using `.map()`, React needs a way to keep track of *which item is which* so it can efficiently update, re-order, or delete them. `key` is a special string attribute you need to include.

## The Mental Model
Imagine a teacher with 30 students where the students keep moving desks. If the teacher only remembers them by "desk number 1, desk number 2", they'll get confused when a student moves. But if they remember them by their "student ID number", it doesn't matter where they sit.
`key` is the student ID. It tells React: "This piece of UI represents this specific piece of data data, forever."

## Why Array Index is Often Bad
By default, if you don't provide a key, React uses the array index (0, 1, 2...). 

If the list is static (never changes order, never adds/deletes items), index is fine.
If the list *can* change order (sorting, filtering, adding to top), the index becomes dangerous. React will think item at index 0 is the same as the old item at index 0, even if the data shifted!

## Common Mistakes

**❌ Wrong:**
```jsx
// bad! if the items array gets reversed, the keys stay 0, 1, 2 top-to-bottom.
// React won't realize the elements actually swapped places!
{todos.map((todo, index) => (
  <TodoItem key={index} todo={todo} />
))}
```

**✅ Correct:**
```jsx
// perfect. 'id' comes from the database and never changes.
{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
))}
```
