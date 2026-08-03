import { NavLink, Route, Routes, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Home() {
  return (
    <div className="container py-5">
      <div className="p-4 p-md-5 rounded-4 bg-light border">
        <h1 className="display-5 mb-3">OctoFit Tracker</h1>
        <p className="lead mb-4">A modern multi-tier fitness experience for tracking activity, teams, and workouts.</p>
        <p className="mb-4">
          <strong>API target:</strong> {apiBaseUrl}
        </p>
        <p className="text-muted mb-4">
          {codespaceName
            ? `VITE_CODESPACE_NAME is set to ${codespaceName}, so the app uses the public GitHub Codespaces endpoint.`
            : 'VITE_CODESPACE_NAME is not set, so the app falls back to the local backend.'}
        </p>
        <div className="d-flex flex-wrap gap-2">
          <Link to="/activities" className="btn btn-primary">Explore activities</Link>
          <Link to="/leaderboard" className="btn btn-outline-secondary">View leaderboard</Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand me-4" to="/">OctoFit</Link>
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}
