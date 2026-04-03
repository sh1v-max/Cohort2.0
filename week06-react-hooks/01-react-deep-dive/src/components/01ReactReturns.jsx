import React from 'react'

export default function ReactReturns() {
  // you must return exactly ONE root top-level element from a component
  // you can return strings, arrays, booleans (renders nothing), or fragments

  // wrong way:
  // return (
  //   <div>first</div>
  //   <div>second</div>
  // )

  // correct way using fragments to avoid unnecessary divs in the dom
  return (
    <div className="card">
      <h2>1. React Returns &amp; Fragments</h2>

      <div className="correct-example card">
        <h3>Correct Usage </h3>
        <p>
          this wrapper component uses an empty tag `&lt;&gt;&lt;/&gt;` called a
          fragment
        </p>
        <ListExample />
      </div>

      <div className="wrong-example card">
        <h3>Common Mistake</h3>
        <p>
          trying to return multiple siblings without a parent wrapper. React
          needs a single parent to build the tree!
        </p>
      </div>
    </div>
  )
}

// child component to show fragments
function ListExample() {
  return (
    <>
      <p>item 1</p>
      <p>item 2</p>
    </>
  )
}
