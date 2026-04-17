import { useContext } from 'react'

import { BulbContextProvider, BulbContext } from './BulbContextProvider'

function App() {
  return (
    // wrap the Light component with BulbContextProvider component
    <BulbContextProvider>
      <Light />
    </BulbContextProvider>
  )
}

// create a function component named Light that renders the LightBulb and LightSwitch components
function Light() {
  return (
    <div>
      <LightBulb />
      <LightSwitch />
    </div>
  )
}

// create a function component named LightBulb that displays the status of the bulb
function LightBulb() {
  // use the useContext hook to access the value of bulbOn from the BulbContext
  const { bulbOn } = useContext(BulbContext)

  return <div>{bulbOn ? 'Bulb is on' : 'Bulb is off'}</div>
}

// create a function component named LightSwitch that toggles the status of the bulb
function LightSwitch() {
  // use the useContext hook to access the value of bulbOn and setBulbOn from the BulbContext
  const { bulbOn, setBulbOn } = useContext(BulbContext)

  function toggleBulb() {
    setBulbOn(!bulbOn)
  }

  return (
    <div>
      <button onClick={toggleBulb}>Toggle the Bulb</button>
    </div>
  )
}

export default App
