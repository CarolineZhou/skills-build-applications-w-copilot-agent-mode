import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-5">
      <h1 className="display-4 mb-3">OctoFit Tracker</h1>
      <p className="lead">A modern multi-tier fitness tracking experience.</p>
      <Link to="/about" className="btn btn-primary">Learn more</Link>
    </div>
  );
}

function About() {
  return (
    <div className="container py-5">
      <h2 className="mb-3">About OctoFit</h2>
      <p>Track workouts, manage teams, and stay motivated with your fitness community.</p>
      <Link to="/" className="btn btn-outline-secondary">Back home</Link>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
