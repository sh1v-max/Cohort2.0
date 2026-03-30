import React, { useState } from 'react'
import './index.css'

function ChildComponent({ message }) {
  console.log('ChildComponent function executed! (Re-rendered)')
  return (
    <div className="child-box">
      <h3>I am the Child Component</h3>
      <p>Message from Parent: {message}</p>
    </div>
  )
}

function App() {
  const [clicks, setClicks] = useState(0)
  console.log(`Parent App function executed! Current Clicks: ${clicks}`)

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Check the Developer Console (F12)</h1>
      <div className="parent-box">
        <h2>I am the Parent Component</h2>
        <p>Click Count: {clicks}</p>
        <button onClick={() => setClicks(clicks + 1)}>
          Update State (Triggers Re-render)
        </button>
        <hr />
        <ChildComponent message="Hello from below!" />
      </div>
    </div>
  )
}

export default App
