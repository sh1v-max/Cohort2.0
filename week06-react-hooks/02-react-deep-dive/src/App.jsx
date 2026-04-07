import React from 'react'

import UseEffectDeepDive from './components/01UseEffectDeepDive'
import UseCallbackDeepDive from './components/02UseCallbackDeepDive'
import UseMemoDeepDive from './components/03UseMemoDeepDive'
import CustomHooksDemo from './components/04CustomHooks'
import PropDrillingDemo from './components/05PropDrilling'

const App = () => {
  return (
    <div className="container">
      <h1>React Deep Dive — Part 2</h1>

      <UseEffectDeepDive />
      <UseCallbackDeepDive />
      <UseMemoDeepDive />
      <CustomHooksDemo />
      <PropDrillingDemo />
    </div>
  )
}

export default App
