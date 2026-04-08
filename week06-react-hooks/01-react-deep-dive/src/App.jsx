import React from 'react'

import ReactReturns from './components/01ReactReturns'
import ReRendering from './components/02ReRendering';
import KeyProp from './components/03KeyProp';
import WrapperComponents from './components/04WrapperComponents';
import UseState from './components/05UseState';
import UseEffect from './components/06UseEffect';
import UseMemo from './components/07UseMemo';
import UseCallback from './components/08UseCallback';
import UseRef from './components/09UseRef';
import StateManagement from './components/10StateManagement';
import HelperComponent from './components/11HelperComponent';

const App = () => {
  return (
    <div className="container">
      <h1>React Core Concepts</h1>

      <ReactReturns />
      <ReRendering />
      <KeyProp />
      <WrapperComponents />
      <UseState />
      <UseEffect />
      <UseMemo />
      <UseCallback />
      <UseRef />
      <StateManagement />
      <HelperComponent />
    </div>
  )
}

export default App
