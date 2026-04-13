import React from 'react'

import UseState from './components/01UseState'
import UseEffect from './components/02UseEffect'
import UseCallback from './components/03UseCallback'
import UseMemo from './components/04UseMemo'
import CustomHooksDemo from './components/05CustomHooks'
import PropDrillingDemo from './components/06PropDrilling'

const App = () => {
  return (
    <div className="container">
      <h1>React Deep Dive — Part 2</h1>

      <UseState />
      <UseEffect />
      <UseCallback />
      <UseMemo />
      <CustomHooksDemo />
      <PropDrillingDemo />
    </div>
  )
}

export default App
