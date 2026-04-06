import React from 'react'

import ReactReturns from './components/01ReactReturns'
import ReRendering from './components/02ReRendering';
import KeyProp from './components/03KeyProp';
import WrapperComponents from './components/04WrapperComponents';
import UseEffectDeepDive from './components/05UseEffectDeepDive';
import UseMemoDeepDive from './components/06UseMemoDeepDive';
import UseCallbackDeepDive from './components/07UseCallbackDeepDive';
import UseRefDeepDive from './components/08UseRefDeepDive';
import StateManagement from './components/09StateManagement';
import HelperComponent from './components/10HelperComponent';

const App = () => {
  return (
    <div className="container">
      <h1>React Core Concepts</h1>

      <ReactReturns />
      <ReRendering />
      <KeyProp />
      <WrapperComponents />
      <UseEffectDeepDive />
      <UseMemoDeepDive />
      <UseCallbackDeepDive />
      <UseRefDeepDive />
      <StateManagement />
      <HelperComponent />
    </div>
  )
}

export default App
