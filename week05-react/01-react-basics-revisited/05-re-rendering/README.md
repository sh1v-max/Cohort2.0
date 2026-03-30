# Re-rendering in React

## What is Re-rendering?
When a component's state or props change, React needs to update the UI to reflect those changes. 
React handles this by executing the component function again. This process is called **Re-rendering**.

## How React Updates the DOM
1. **Trigger**: State or Props are updated (e.g., calling `setState()`).
2. **Render**: React calls the component function again to generate a new virtual representation (Virtual DOM) of what the UI should look like.
3. **Reconciliation (Diffing)**: React compares the new Virtual DOM with the old Virtual DOM to see what exactly changed.
4. **Commit**: React updates only the specific parts of the real DOM that actually changed. This is what makes React incredibly fast.

## Important Note
Every time a parent component re-renders, **all of its child components** will also re-render by default (unless optimized with things like `React.memo`).

## Example File
Open `index.html` and check the **Developer Console**. You will see exactly when and how components re-render when state changes.


## How to Run
This example has been upgraded to a full React App.
To run it:
1. Open terminal in this folder.
2. Run `npm install`
3. Run `npm run dev`
4. Open the provided localhost URL in your browser.
