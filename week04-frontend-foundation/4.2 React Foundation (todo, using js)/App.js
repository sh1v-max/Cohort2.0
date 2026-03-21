// dom manipulation based on state (vanilla js)
// this file demonstrates the foundational concept behind libraries like react.
// instead of writing hardcoded html for every todo item, we define a "state" (an array of todos),
// fetch it from a backend, and programmatically generate and update the dom elements
// (divs, buttons) to reflect that state.

// let globalId = 1;

function createChild(todo) {
  const child = document.createElement('div')

  const titleDiv = document.createElement('div')
  titleDiv.innerHTML = todo.title

  const descDiv = document.createElement('div')
  descDiv.innerHTML = todo.description

  const button = document.createElement('button')

  button.innerHTML = todo.completed ? 'Done' : 'Mark as done'

  button.addEventListener('click', () => {
    toggleTodo(todo.id)
  })

  child.appendChild(titleDiv)
  child.appendChild(descDiv)
  child.appendChild(button)

  child.setAttribute('id', todo.id)

  return child
}

//State will always be an array
//every element of state will be have an title, description and id

function updateDomAccToState(state) {
  const parent = document.getElementById('container')

  parent.innerHTML = ''

  for (let i = 0; i < state.length; i++) {
    const child = createChild(state[i])
    parent.appendChild(child)
  }
}

async function fetchTodos() {
  const res = await fetch('http://localhost:3000/todos')
  const json = await res.json()
  updateDomAccToState(json.todos)
}

setInterval(fetchTodos, 5000)

async function toggleTodo(id) {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'PUT',
  })

  const res = await fetch('http://localhost:3000/todos')
  const json = await res.json()
  updateDomAccToState(json.todos)
}

// function addTodo() {
//   const title = document.getElementById('title').value
//   const description = document.getElementById('description').value
//   const parent = document.getElementById('todos')

//   parent.appendChild(createChild(title, description, globalId++))
// }

// explanation of the ugly approach (string concatenation):
// the commented code below is considered "ugly" and inefficient because:
// 1. parsing and rendering: using `innerHtml = original container + ...` forces the browser to re-parse and re-render the entire container's html from scratch on every addition.
// 2. state loss: it destroys all existing child nodes and recreates them. any current user interactions (like input focus) and attached javascript event listeners will be permanently lost during the re-render.
// 3. security: string concatenation for rendering html is more prone to xss (cross-site scripting) vulnerabilities if inputs are not properly sanitized.
//
// modern ui programming (like react, or the dom element creation at the top of this file) updates efficiently by creating/updating only the necessary elements rather than wiping out the entire container.

// ugly approach
// const originalContainer = document.getElementById('container').innerHTML
// document.getElementById('container').innerHTML =
//   originalContainer +
//   `
//        <br />
//        <div>
//         <div>${title}</div>
//         <div>${description}</div>
//         <br />
//         <button>Mark as done</button>
//       </div>
//       `
