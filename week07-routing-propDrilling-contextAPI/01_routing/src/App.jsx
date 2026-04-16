// importing routing tools from react-router-dom
// BrowserRouter -> wraps the app, enables url-based routing using the browser's history api
// Routes -> acts as a container that looks at the current url and decides which route to render
// Route -> maps a specific url path to a component
// Link -> like an <a> tag, but navigates without a full page reload (client-side navigation)
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// importing the page components that will be rendered based on the url
import Landing from './components/Landing'
import Class11Program from './components/Class11Program'
import Class12Program from './components/Class12Program'
import ErrorPage from './components/ErrorPage'

function App() {
  return (
    <div>
      {/* BrowserRouter must wrap everything that uses routing
          it listens to the browser url and provides routing context to all children */}
      <BrowserRouter>

        {/* Link components render as <a> tags in the dom
            but they use react-router to change the url without refreshing the page
            the "to" prop is the path you want to navigate to */}
        <Link to="/">Allen</Link> |{' '}
        <Link to="/neet/online-coaching-class-11">Class 11</Link> |{' '}
        <Link to="/neet/online-coaching-class-12">Class 12</Link>

        {/* Routes looks at the current url and renders only the first matching Route */}
        <Routes>

          {/* path="/" -> renders the Landing component when url is exactly "/" */}
          <Route path="/" element={<Landing />} />

          <Route path="/neet/online-coaching-class-11" element={<Class11Program />} />

          <Route path="/neet/online-coaching-class-12" element={<Class12Program />} />

          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
