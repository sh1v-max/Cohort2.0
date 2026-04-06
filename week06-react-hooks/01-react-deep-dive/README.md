# React Deep Dive Learning Environment ⚛️

Welcome to your focused, distraction-free environment for mastering React fundamentals. 
This project is built with Vite and features zero UI libraries, ensuring you only focus on pure React mechanics.

## 🚀 How to Run the Project

1. Open a terminal in this folder.
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Click the `http://localhost:5173/` link in your terminal to view the app in your browser.

## 🧠 How to Use This Learning Environment

The project is split into two connected spaces: **Notes** and **Topics**. 
For the best learning experience, follow this workflow:

### Suggested Workflow:
1. **Read the Note:** Open `notes/01-react-returns.md`. Read the mental model and the explanations of right/wrong ways to do things.
2. **Open the Code:** Open `src/topics/01-react-returns.jsx`. Look at how the theory connects to real React code. 
3. **Experiment:** 
   - Open `src/App.jsx`.
   - Uncomment the import line and component for the current topic you are studying.
   - Save the file and view your changes live in the browser.
   - Try breaking the code or tweaking the `useState` values to see what fails!

## 📚 Topics Covered

- `01-react-returns` - Valid React returns and Fragments.
- `02-re-rendering` - Understanding what triggers renders and visual updates.
- `03-key` - Why the `key` prop matters in mapping algorithms.
- `04-wrapper-components` - Using the `children` prop effectively.
- `05-useEffect` - Managing side effects, dependencies, and cleanups.
- `06-useMemo` - Caching expensive function *returns*.
- `07-useCallback` - Caching function *definitions*.
- `08-useRef` - Accessing DOM and silently keeping states.
- `09-state-management` - Lifting state up and avoiding trapped state.
- `10-helper-component` - Reusable helper components (ShowIf, Loader, EachItem).

## ⚠️ Important Constraint
This project is deliberately minimal. 
Do not install Tailwind, Bootstrap, or any UI libraries. Stick to pure JS/React logic.
If you need styling, modify `src/index.css`.
