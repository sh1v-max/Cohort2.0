import React, { useState } from 'react'
import './index.css'

function App() {
  let normalVariableCount = 0

  function incrementNormalVariable() {
    normalVariableCount++
    console.log('Normal Variable is now:', normalVariableCount)
  }

  const [stateCount, setStateCount] = useState(0)

  function incrementStateVariable() {
    setStateCount(stateCount + 1)
  }

  return (
    <div className="counter-container">
      <h1>Understanding State</h1>

      <div className="section wrong-way">
        <h3>Normal Variable (Fails to update UI)</h3>
        <p>Value: {normalVariableCount}</p>
        <button onClick={incrementNormalVariable}>
          Increase Normal (Check Console)
        </button>
      </div>

      <hr />

      <div className="section right-way">
        <h3>State Variable (Updates UI correctly)</h3>
        <p>Value: {stateCount}</p>
        <button onClick={incrementStateVariable}>Increase State</button>
      </div>
    </div>
  )
}

export default App
