let globalId = 1
let todoState = []
let oldTodoState = []

// This was previously named "addTodo" but there was another addTodo below. Renamed to avoid collision.
function addTodoToDom(todo) {
  const child = document.createElement('div')
  child.setAttribute('id', todo.id)

  const titleDiv = document.createElement('div')
  titleDiv.innerHTML = todo.title

  const descDiv = document.createElement('div')
  descDiv.innerHTML = todo.description

  const button = document.createElement('button')
  button.innerHTML = todo.completed ? 'Done' : 'Mark as done'
  button.onclick = function () {
    markAsDone(todo.id)
  }

  child.appendChild(titleDiv)
  child.appendChild(descDiv)
  child.appendChild(button)

  document.getElementById('container').appendChild(child)
}

function removeTodo(todo) {
  const element = document.getElementById(todo.id)
  if (element) {
    element.parentElement.removeChild(element)
  }
}

function updateTodo(oldTodo, newTodo) {
  const element = document.getElementById(oldTodo.id)
  if (element) {
    element.children[0].innerHTML = newTodo.title
    element.children[1].innerHTML = newTodo.description
    element.children[2].innerHTML = newTodo.completed ? 'Done' : 'Mark as done'
  }
}

function updateState(newTodos) {
  // calculate the diff b/w newTodos and oldTodos.
  // More specifically, find out what todos are -
  // 1. added
  // 2. deleted
  // 3. updated
  const added = []
  const deleted = []
  const updated = []

  console.log('Added:', added)
  console.log('Deleted:', deleted)
  console.log('Updated:', updated)

  // find out what todos are added or updated
  for (let i = 0; i < newTodos.length; i++) {
    const newTodo = newTodos[i]
    const oldTodoItem = oldTodoState.find((old) => old.id === newTodo.id)

    if (!oldTodoItem) {
      added.push(newTodo)
    } else {
      if (
        oldTodoItem.title !== newTodo.title ||
        oldTodoItem.description !== newTodo.description ||
        oldTodoItem.completed !== newTodo.completed
      ) {
        updated.push({ oldTodo: oldTodoItem, newTodo: newTodo })
      }
    }
  }

  // find out what todos are deleted
  for (let i = 0; i < oldTodoState.length; i++) {
    const oldTodo = oldTodoState[i]
    const newTodoItem = newTodos.find((newT) => newT.id === oldTodo.id)

    if (!newTodoItem) {
      deleted.push(oldTodo)
    }
  }

  // call functions to update DOM based on differences
  added.forEach((todo) => addTodoToDom(todo))
  deleted.forEach((todo) => removeTodo(todo))
  updated.forEach((updateObj) =>
    updateTodo(updateObj.oldTodo, updateObj.newTodo),
  )

  // Update oldTodoState by making a deep copy so future mutations don't affect it directly
  oldTodoState = newTodos.map((todo) => ({ ...todo }))
}

function addTodo() {
  const title = document.getElementById('title').value
  const description = document.getElementById('description').value

  if (!title || !description) return // Prevent empty todos

  todoState.push({
    title: title,
    description: description,
    id: globalId++,
    completed: false,
  })

  // Clear inputs after adding
  document.getElementById('title').value = ''
  document.getElementById('description').value = ''

  updateState(todoState)
}

// Added this to allow users to toggle completion state
function markAsDone(id) {
  const todoIndex = todoState.findIndex((todo) => todo.id === id)
  if (todoIndex > -1) {
    todoState[todoIndex].completed = !todoState[todoIndex].completed
    updateState(todoState)
  }
}
