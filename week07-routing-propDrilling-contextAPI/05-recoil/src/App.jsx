// import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
// recoilRoot is a wrapper component that is used to provide the recoil state to the components that need it
// useRecoilValue is a hook that is used to access the state
// useSetRecoilState is a hook that is used to set the state
// we also have useRecoilState which is a hook that is used to access and set the state, just like useState
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { countAtom } from './store/atoms/count'
import './App.css'

function App() {
  // we won't be needing state anymore
  // wrapping the components that need state in recoilroot
  return (
    <RecoilRoot>
      <div className="card">
        <h1>recoil basics example</h1>
        <Counter />
      </div>
    </RecoilRoot>
  )
}

function Counter() {
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  )
}

function CountRenderer() {
  // accessing the state using userecoilvalue since it only needs to read
  const count = useRecoilValue(countAtom)
  return <h2>count is: {count}</h2>
}

function Buttons() {
  // setting the state using usesetrecoilstate for optimization
  const setCount = useSetRecoilState(countAtom)

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
      <button onClick={() => setCount((c) => c + 1)}>increase</button>
      <button onClick={() => setCount((c) => c - 1)}>decrease</button>
    </div>
  )
}

export default App
