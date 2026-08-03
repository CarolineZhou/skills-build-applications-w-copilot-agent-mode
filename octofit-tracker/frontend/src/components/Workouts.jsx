import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const fallbackWorkouts = [
  { name: 'Morning Run', difficulty: 'Easy', durationMinutes: 30 },
  { name: 'Strength Circuit', difficulty: 'Moderate', durationMinutes: 45 },
  { name: 'Recovery Flow', difficulty: 'Easy', durationMinutes: 20 },
];

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchCollection('workouts', fallbackWorkouts)
      .then((data) => {
        if (isMounted) {
          setWorkouts(data);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container py-5">
      <h1 className="h3 mb-1">Workouts</h1>
      <p className="text-muted mb-4">Explore suggested routines tailored to your goals.</p>

      {loading ? (
        <div className="alert alert-secondary">Loading workouts...</div>
      ) : workouts.length === 0 ? (
        <div className="alert alert-info">No workout suggestions are available yet.</div>
      ) : (
        <div className="row g-3">
          {workouts.map((workout, index) => (
            <div className="col-md-4" key={`${workout.name}-${index}`}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h2 className="h5">{workout.name}</h2>
                  <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty ?? 'General'}</p>
                  <p className="mb-0"><strong>Duration:</strong> {workout.durationMinutes ?? 0} min</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
