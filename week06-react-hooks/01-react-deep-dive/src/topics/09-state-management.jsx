import { useState } from 'react';

export default function StateManagement() {
  const [theme, setTheme] = useState('dark');

  return (
    <div className="card">
      <h2>9. State Management Basics</h2>
      <p>lifting state up and prop drilling.</p>

      <div className="correct-example card" style={{ backgroundColor: theme === 'dark' ? '#333' : '#ddd', color: theme === 'dark' ? '#fff' : '#000' }}>
        <h3>Parent Component</h3>
        <p>the parent holds the state. it passes state DOWN as props, and passes the setter DOWN as props.</p>
        
        {/* passing props down is called "prop drilling" */}
        <ChildComponent theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      </div>

      <div className="wrong-example card">
        <h3>Common Mistake (Trapped State)</h3>
        <p>if the child creates the state, the parent can never access it or pass it to a sibling!</p>
        <BadChildComponent />
      </div>
    </div>
  );
}

// ✅ Correct: receives state and behavior from above
function ChildComponent({ theme, onToggleTheme }) {
  return (
    <div className="card" style={{ border: '2px dashed gray' }}>
      <h4>Good Child</h4>
      <p>current theme is: {theme}</p>
      {/* calls the parent's function to change state */}
      <button onClick={onToggleTheme}>toggle theme from child</button>
      
      {/* what if this grandchild needs it? we prop drill again! */}
      <GrandchildComponent theme={theme} />
    </div>
  );
}

function GrandchildComponent({ theme }) {
  return <p style={{ fontSize: '0.8em' }}>grandchild sees theme: {theme}</p>
}

// ❌ Wrong: state is trapped here. 
// state should be "lifted up" to the closest common parent if others need it.
function BadChildComponent() {
  const [trappedState, setTrappedState] = useState("secret");
  return (
    <div style={{ padding: 10, border: '1px solid red' }}>
      <h4>Bad Child</h4>
      <p>i have state: {trappedState}</p>
      <p>but my parent component can never read this value!</p>
    </div>
  );
}
