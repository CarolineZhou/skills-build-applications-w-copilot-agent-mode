import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export function getApiBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
  });

  app.get('/api', (_req, res) => {
    res.json({ message: 'Welcome to the OctoFit Tracker API', baseUrl: getApiBaseUrl() });
  });

  app.get('/api/users', (_req, res) => {
    res.json([
      { name: 'Maya Chen', email: 'maya.chen@mergington.edu', role: 'student' },
      { name: 'Noah Patel', email: 'noah.patel@mergington.edu', role: 'student' },
      { name: 'Sofia Rivera', email: 'sofia.rivera@mergington.edu', role: 'student' },
      { name: 'Liam Brooks', email: 'liam.brooks@mergington.edu', role: 'teacher' }
    ]);
  });

  app.get('/api/activities', (_req, res) => {
    res.json([
      { userName: 'Maya Chen', type: 'Run', durationMinutes: 35, distanceKm: 5.2, points: 120 },
      { userName: 'Noah Patel', type: 'Strength', durationMinutes: 45, points: 90 },
      { userName: 'Sofia Rivera', type: 'Swim', durationMinutes: 30, distanceKm: 2.8, points: 110 },
      { userName: 'Liam Brooks', type: 'Walk', durationMinutes: 25, distanceKm: 3.4, points: 70 },
      { userName: 'Maya Chen', type: 'Cycling', durationMinutes: 40, distanceKm: 12.5, points: 140 },
      { userName: 'Noah Patel', type: 'Yoga', durationMinutes: 20, points: 60 }
    ]);
  });

  return app;
}
