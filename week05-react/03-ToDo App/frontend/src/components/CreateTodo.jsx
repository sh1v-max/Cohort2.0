import { useState } from 'react'

const CreateTodo = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div>
      <input
        id="title"
        type="text"
        placeholder="title"
        onChange={function (e) {
          setTitle(e.target.value)
        }}
      />{' '}
      <br />
      <input
        id="desc"
        type="text"
        placeholder="description"
        onChange={function (e) {
          setDescription(e.target.value)
        }}
      />{' '}
      <br />
      <button
        onClick={() => {
          fetch('http://localhost:3000/todo', {
            method: 'POST',
            body: JSON.stringify({
              title: title,
              description: description,
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
        Add Todo
      </button>
    </div>
  )
}

export default CreateTodo
