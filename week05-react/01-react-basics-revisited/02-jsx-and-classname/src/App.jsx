import React from 'react'
import './index.css'

function App() {
  const topicName = 'JSX'
  const isImportant = true

  return (
    <div
      className="container"
      style={{ margin: '20px', padding: '20px', border: '2px solid #ccc' }}
    >
      <h1>Understanding {topicName}</h1>
      <p>
        JSX helps us write HTML inside React. Under the hood, Babel compiles
        this to <code>React.createElement()</code>.
      </p>

      <div
        className={isImportant ? 'highlight' : null}
        style={{
          backgroundColor: isImportant ? 'yellow' : 'transparent',
          padding: '10px',
          borderRadius: '5px',
        }}
      >
        This box has a dynamic style and className based on the `isImportant`
        variable!
      </div>

      <p style={{ marginTop: '20px' }}>
        Always remember: use <strong>className</strong> for CSS classes, and{' '}
        <strong>htmlFor</strong> instead of <strong>for</strong> in labels.
      </p>
    </div>
  )
}

export default App
