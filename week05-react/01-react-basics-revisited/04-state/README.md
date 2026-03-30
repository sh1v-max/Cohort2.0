# State in React

## What is State?
In React, **State** is a built-in object that allows components to create and manage their own data.
State is what allows you to create components that are dynamic and interactive. 
When the state object changes, the component re-renders to reflect those changes on the UI.

## Why not use regular variables?
If you change a regular JavaScript variable (e.g. `let counter = 0; counter++;`), React **does not know** that the variable has changed. Therefore, it will **not** trigger a UI re-render, and the user will not see the updated value on the screen.

State, on the other hand, tells React: "Hey, data has changed! Please re-render this component to show the new data."

## `useState` Hook
In functional components, we use the `useState` hook to add state.
`const [count, setCount] = React.useState(0);`
- `count` is the variable storing the current state value.
- `setCount` is the function we use to update `count`.

## Example File
Open `index.html` to play with a simple Counter app that demonstrates state.


## How to Run
This example has been upgraded to a full React App.
To run it:
1. Open terminal in this folder.
2. Run `npm install`
3. Run `npm run dev`
4. Open the provided localhost URL in your browser.
