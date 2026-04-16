// importing routing tools from react-router-dom
// BrowserRouter -> wraps the app, enables url-based routing using the browser's history api
// Routes -> acts as a container that looks at the current url and decides which route to render
// Route -> maps a specific url path to a component
// Link -> like an <a> tag, but navigates without a full page reload (client-side navigation)
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// lazy -> lets you defer loading a component until it is actually needed
// Suspense -> wraps lazy components and shows a fallback ui while they are being loaded
import { lazy, Suspense } from 'react'

// -- lazy loading --
// normally you'd do: import Landing from './components/Landing'
// that would load ALL components upfront when the app first starts (eager loading)
// with lazy(), each component gets its own separate js "chunk" file
// that chunk is only downloaded when the user actually navigates to that route

// loaded only when user visits "/"
const Landing = lazy(() => import('./components/Landing'))
const Class11Program = lazy(() => import('./components/Class11Program'))
const Class12Program = lazy(() => import('./components/Class12Program'))
const ErrorPage = lazy(() => import('./components/ErrorPage'))

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
        {/* Suspense is required whenever you use lazy()
            while the lazy component is being fetched, react shows the fallback ui
            here it's a simple "loading..." text, but you can put any component here
            (e.g. a spinner, skeleton screen, etc.) */}
        <Suspense fallback={<div>loading...</div>}>
          {/* Routes looks at the current url and renders only the first matching Route */}
          <Routes>
            {/* Landing is lazy loaded, so it's fetched the first time user visits "/" */}
            <Route path="/" element={<Landing />} />

            <Route
              path="/neet/online-coaching-class-11"
              element={<Class11Program />}
            />

            <Route
              path="/neet/online-coaching-class-12"
              element={<Class12Program />}
            />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
