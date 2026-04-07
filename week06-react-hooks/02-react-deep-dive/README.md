# React Deep Dive — Part 2 ⚛️

Welcome to the second part of your React deep dive learning environment. 
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

The project is split into two connected spaces: **Notes** and **Components**. 
For the best learning experience, follow this workflow:

### Suggested Workflow:
1. **Read the Note:** Open `notes/01-useEffect.md`. Read the mental model and the explanations of right/wrong ways to do things.
2. **Open the Code:** Open `src/components/01UseEffectDeepDive.jsx`. Look at how the theory connects to real React code. 
3. **Experiment:** 
   - Open `src/App.jsx`.
   - Comment/uncomment the import lines and components for the current topic you are studying.
   - Save the file and view your changes live in the browser.
   - Try breaking the code or tweaking the values to see what fails!

## 📚 Topics Covered

- `01-useEffect` - Managing side effects, dependencies, and cleanups.
- `02-useCallback` - Caching function *definitions* to prevent unnecessary re-renders.
- `03-useMemo` - Caching expensive function *returns*.
- `04-custom-hooks` - Extracting and reusing stateful logic (useWindowWidth, useLocalStorage, useToggle).
- `05-prop-drilling` - Understanding the prop drilling problem and its solutions.

## ⚠️ Important Constraint
This project is deliberately minimal. 
Do not install Tailwind, Bootstrap, or any UI libraries. Stick to pure JS/React logic.
If you need styling, modify `src/index.css`.
