import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

const fallbackUsers = [
  { name: 'Maya Chen', email: 'maya.chen@mergington.edu', role: 'student' },
  { name: 'Noah Patel', email: 'noah.patel@mergington.edu', role: 'student' },
  { name: 'Liam Brooks', email: 'liam.brooks@mergington.edu', role: 'teacher' },
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchCollection('users', fallbackUsers)
      .then((data) => {
        if (isMounted) {
          setUsers(data);
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
      <h1 className="h3 mb-1">Users</h1>
      <p className="text-muted mb-4">Browse community members and their roles.</p>

      {loading ? (
        <div className="alert alert-secondary">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="alert alert-info">No users are available yet.</div>
      ) : (
        <div className="row g-3">
          {users.map((user, index) => (
            <div className="col-md-4" key={`${user.email ?? user.name}-${index}`}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h2 className="h5">{user.name}</h2>
                  <p className="mb-1"><strong>Email:</strong> {user.email ?? '—'}</p>
                  <p className="mb-0"><strong>Role:</strong> {user.role ?? 'member'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
