import { useState } from 'react'

export default function KeyProp() {
  const [items, setItems] = useState([
    { id: 1, name: 'apple' },
    { id: 2, name: 'banana' },
    { id: 3, name: 'cherry' },
  ])

  const shuffle = () => {
    // simple shuffle for demonstration
    setItems([...items].sort(() => Math.random() - 0.5))
  }

  return (
    <div className="card">
      <h2>3. The Key Prop</h2>
      <button onClick={shuffle}>shuffle list</button>

      <div className="container">
        <div className="wrong-example card">
          <h3>Common Mistake (using Index as key)</h3>
          <p>
            type in the inputs, then hit shuffle. watch how the text doesn't
            stay with the right fruit!
          </p>
          {items.map((item, index) => (
            // ❌ WRONG: using array index as key when the order can change
            <div key={index} style={{ marginBottom: '10px' }}>
              <span>{item.name} </span>
              <input type="text" placeholder={`notes on ${item.name}`} />
            </div>
          ))}
        </div>

        <div className="correct-example card">
          <h3>Correct (using Unique ID as key)</h3>
          <p>
            this one will correctly keep your typed text associated with the
            right fruit after shuffling.
          </p>
          {items.map((item) => (
            // ✅ CORRECT: using a stable, unique ID
            <div key={item.id} style={{ marginBottom: '10px' }}>
              <span>{item.name} </span>
              <input type="text" placeholder={`notes on ${item.name}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
