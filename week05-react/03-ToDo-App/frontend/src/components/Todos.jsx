const Todos = ({ todos }) => {
  return (
    <div>
      {todos &&
        todos.map(function (todo) {
          return (
            <div key={todo._id}>
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
              <button
                onClick={() => {
                  fetch('http://localhost:3000/completed', {
                    method: 'PUT',
                    body: JSON.stringify({
                      id: todo._id,
                    }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }).then(async function (response) {
                    const data = await response.json()
                    alert(data.msg)
                  })
                }}
              >
                {todo.completed == true ? 'Completed' : 'Mark as Complete'}
              </button>
            </div>
          )
        })}
    </div>
  )
}

export default Todos
