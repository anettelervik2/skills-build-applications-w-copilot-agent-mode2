import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logoUrl from '../../../docs/octofitapp-small.png'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  const forwardedHostMatch = window.location.hostname.match(/^(.+)-5173\.app\.github\.dev$/)

  if (forwardedHostMatch) {
    return `https://${forwardedHostMatch[1]}-8000.app.github.dev/api`
  }

  return 'http://localhost:8000/api'
}

const API_BASE_URL = getApiBaseUrl()

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-lockup">
          <img src={logoUrl} alt="Octofit Tracker" />
          <div>
          <p className="eyebrow">Octofit Tracker</p>
          <h1>Fitness data for teams that compete together.</h1>
          </div>
        </div>
        <nav className="app-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="content-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users apiBaseUrl={API_BASE_URL} />} />
          <Route path="/teams" element={<Teams apiBaseUrl={API_BASE_URL} />} />
          <Route path="/activities" element={<Activities apiBaseUrl={API_BASE_URL} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={API_BASE_URL} />} />
          <Route path="/workouts" element={<Workouts apiBaseUrl={API_BASE_URL} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
