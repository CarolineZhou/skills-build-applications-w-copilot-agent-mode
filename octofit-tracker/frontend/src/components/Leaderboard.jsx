import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const fallbackLeaderboard = [
  { name: 'Maya Chen', points: 360, streak: 6 },
  { name: 'Noah Patel', points: 310, streak: 4 },
  { name: 'Sofia Rivera', points: 285, streak: 5 },
];

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchCollection('leaderboard', fallbackLeaderboard)
      .then((data) => {
        if (isMounted) {
          setLeaderboard(data);
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
      <h1 className="h3 mb-1">Leaderboard</h1>
      <p className="text-muted mb-4">See who is driving momentum through the week.</p>

      {loading ? (
        <div className="alert alert-secondary">Loading leaderboard...</div>
      ) : leaderboard.length === 0 ? (
        <div className="alert alert-info">No leaderboard data is available yet.</div>
      ) : (
        <div className="list-group">
          {leaderboard.map((entry, index) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={`${entry.name}-${index}`}>
              <div>
                <h2 className="h6 mb-1">#{index + 1} {entry.name}</h2>
                <p className="text-muted mb-0">Streak: {entry.streak ?? 0} days</p>
              </div>
              <span className="badge bg-success">{entry.points ?? 0} pts</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
