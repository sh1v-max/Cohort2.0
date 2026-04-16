// useNavigate is a hook from react-router-dom
// it gives you a function to programmatically navigate to any route
// useful when you want to redirect AFTER some logic (e.g. button click, form submit, etc.)
import { useNavigate } from 'react-router-dom'

function Class12Program() {

  // navigate is a function, calling it with a path changes the url and renders that route
  // this is called "programmatic navigation" (as opposed to clicking a <Link>)
  const navigate = useNavigate()

  function redirectUser() {
    // calling navigate('/') takes the user back to the landing page
    // no page reload, just a url change handled by react-router
    navigate('/')
  }

  return (
    <div>
      <h2>Neet Programs for Class 12th</h2>

      {/* clicking this button triggers redirectUser(), which calls navigate('/') */}
      <button onClick={redirectUser}>Back to Landing Page</button>
    </div>
  )
}

export default Class12Program
