import { Link, Route, Routes } from 'react-router-dom'

function Overview() {
  return (
    <main className="container py-5">
      <h1 className="h2 mb-3">Your fitness, in motion</h1>
      <p className="text-body-secondary mb-0">
        Your OctoFit activity dashboard is ready to build.
      </p>
    </main>
  )
}

function NotFound() {
  return (
    <main className="container py-5">
      <h1 className="h2 mb-3">Page not found</h1>
      <Link to="/">Return to overview</Link>
    </main>
  )
}

function App() {
  return (
    <>
      <header className="border-bottom">
        <nav className="container navbar">
          <Link className="navbar-brand fw-semibold" to="/">
            OctoFit Tracker
          </Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
