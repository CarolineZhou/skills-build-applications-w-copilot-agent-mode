import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const fallbackTeams = [
  { name: 'Blue Wave', members: 7, focus: 'Endurance' },
  { name: 'Peak Builders', members: 5, focus: 'Strength' },
  { name: 'River Runners', members: 6, focus: 'Recovery' },
];

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchCollection('teams', fallbackTeams)
      .then((data) => {
        if (isMounted) {
          setTeams(data);
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
      <h1 className="h3 mb-1">Teams</h1>
      <p className="text-muted mb-4">Coordinate your squads and monitor training goals.</p>

      {loading ? (
        <div className="alert alert-secondary">Loading teams...</div>
      ) : teams.length === 0 ? (
        <div className="alert alert-info">No teams are available yet.</div>
      ) : (
        <div className="row g-3">
          {teams.map((team, index) => (
            <div className="col-md-4" key={`${team.name}-${index}`}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h2 className="h5">{team.name}</h2>
                  <p className="mb-1"><strong>Members:</strong> {team.members ?? 0}</p>
                  <p className="mb-0"><strong>Focus:</strong> {team.focus ?? 'General fitness'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
