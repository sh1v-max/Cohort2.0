# JSX and `class` vs `className`

## What is JSX?
**JSX** stands for JavaScript XML. It is a syntax extension for JavaScript that looks very similar to HTML.
In React, we use JSX to describe what the UI should look like.
Instead of artificially separating technologies by putting markup and logic in separate files, React separates concerns with loosely coupled units called "components" that contain both.

JSX is basically syntactic sugar for `React.createElement(...)`. It gets compiled into standard JavaScript by tools like Babel before reaching the browser.

## `class` vs `className`
Because JSX is actually JavaScript, some HTML attributes clash with JavaScript reserved keywords.
- `class` is a reserved keyword in JavaScript (used to define ES6 classes). 
- Therefore, in JSX, we must use `className` instead of `class` to add CSS classes to elements.

Under the hood, React translates `className` into the actual `class` attribute on the DOM node.

## Example File
Open `index.html` to see JSX and `className` in action. The file uses Babel via CDN to compile JSX directly in the browser.


## How to Run
This example has been upgraded to a full React App.
To run it:
1. Open terminal in this folder.
2. Run `npm install`
3. Run `npm run dev`
4. Open the provided localhost URL in your browser.
