import { useState, useEffect } from 'react'

export default function UseEffectDeepDive() {
  const [toggle, setToggle] = useState(false)

  return (
    <div className="card">
      <h2>6. useEffect</h2>
      <p>open your console to see the effects in action!</p>

      <button onClick={() => setToggle(!toggle)}>
        {toggle ? 'unmount component' : 'mount component'}
      </button>

      <div className="container">{toggle && <Timer />}</div>
    </div>
  )
}

function Timer() {
  const [seconds, setSeconds] = useState(0)

  // ✅ correct way: interval setup with a cleanup function!
  useEffect(() => {
    console.log('timer mounted! starting interval...')

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    // CLEANUP FUNCTION: this runs strictly BEFORE the component unmounts,
    // or before the effect runs again.
    return () => {
      console.log('timer unmounting! cleaning up interval...')
      clearInterval(intervalId)
    }
  }, []) // empty dependency array = run ONCE on mount

  // ❌ wrong way (uncomment at your own risk!):
  // useEffect(() => {
  //   // missing dependency array means this runs on EVERY render.
  //   // setting state here triggers a render, causing an infinite loop!
  //   setSeconds(seconds + 1);
  // });

  return (
    <div className="correct-example card">
      <h3>Timer Component</h3>
      <p>seconds alive: {seconds}</p>
      <p>
        watch the console when you unmount me. if there was no cleanup, i would
        cause a memory leak!
      </p>
    </div>
  )
}
