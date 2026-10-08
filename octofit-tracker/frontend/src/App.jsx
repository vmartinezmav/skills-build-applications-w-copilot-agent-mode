import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function NotFound() {
  return (
    <main className="container py-5">
      <h1 className="h2 mb-3">Page not found</h1>
      <Link to="/activities">View activities</Link>
    </main>
  )
}

function App() {
  return (
    <>
      <header className="app-header">
        <nav className="container navbar app-nav" aria-label="Main navigation">
          <Link className="navbar-brand fw-semibold" to="/activities" aria-label="OctoFit Tracker home">
            <img src={octofitLogo} alt="" width="36" height="36" className="me-2" />
            OctoFit Tracker
          </Link>
          <div className="app-nav-links">
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/activities" replace />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="app-footer">
        <div className="container">OctoFit Tracker <span>·</span> Move well, together.</div>
      </footer>
    </>
  )
}

export default App
