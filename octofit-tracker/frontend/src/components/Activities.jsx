import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const fallbackActivities = [
  { userName: 'Maya Chen', type: 'Run', durationMinutes: 35, distanceKm: 5.2, points: 120 },
  { userName: 'Noah Patel', type: 'Strength', durationMinutes: 45, points: 90 },
  { userName: 'Sofia Rivera', type: 'Swim', durationMinutes: 30, distanceKm: 2.8, points: 110 },
];

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchCollection('activities', fallbackActivities)
      .then((data) => {
        if (isMounted) {
          setActivities(data);
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Recent activities</h1>
          <p className="text-muted mb-0">Track the latest workouts and milestones from your community.</p>
        </div>
      </div>

      {loading ? (
        <div className="alert alert-secondary">Loading activities...</div>
      ) : activities.length === 0 ? (
        <div className="alert alert-info">No activity data is available yet.</div>
      ) : (
        <div className="row g-3">
          {activities.map((activity, index) => (
            <div className="col-md-6" key={`${activity.userName}-${activity.type}-${index}`}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <h2 className="h5 mb-3">{activity.type}</h2>
                    <span className="badge bg-primary">{activity.points ?? 0} pts</span>
                  </div>
                  <p className="mb-1"><strong>User:</strong> {activity.userName}</p>
                  <p className="mb-1"><strong>Duration:</strong> {activity.durationMinutes ?? '—'} min</p>
                  <p className="mb-0"><strong>Distance:</strong> {activity.distanceKm ?? '—'} km</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
