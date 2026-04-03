import React from 'react';
import { useState, useRef } from 'react';

export default function UseRefDeepDive() {
  const [renderCount, setRenderCount] = useState(0);
  const [refValue, setRefValue] = useState(0);
  
  // 1. using ref to hold mutable data without causing re-renders
  const clickCountRef = useRef(0);
  
  // 2. using ref to directly access DOM elements
  const inputRef = useRef(null);

  const handleSilentClick = () => {
    // modifying a ref does NOT cause a re-render!
    clickCountRef.current += 1;
    console.log("silent clicks:", clickCountRef.current);
  };

  const handleForceRender = () => {
    // using state forces the component to visually update
    setRenderCount(renderCount + 1);
    setRefValue(clickCountRef.current);
  };

  const handleFocusInput = () => {
    // directly talking to the DOM API
    inputRef.current.focus();
  };

  return (
    <div className="card">
      <h2>8. Deep Dive: useRef</h2>
      
      <div className="correct-example card" style={{ marginBottom: '20px' }}>
        <h3>useRef for Values</h3>
        <p>state updates trigger re-renders. ref updates are completely silent.</p>
        <button onClick={handleSilentClick}>
          increment ref silently (check console)
        </button>
        <button onClick={handleForceRender}>
           force re-render (current ref is: {refValue})
        </button>
      </div>

      <div className="correct-example card">
        <h3>useRef for DOM Access</h3>
        <p>we can bypass react and touch the dom directly.</p>
        {/* attaching the ref to the element */}
        <input ref={inputRef} type="text" placeholder="type here..." />
        <button onClick={handleFocusInput}>focus the input</button>
      </div>
    </div>
  );
}
