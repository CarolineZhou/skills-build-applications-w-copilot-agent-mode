import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
  });

  app.get('/api', (_req, res) => {
    res.json({ message: 'Welcome to the OctoFit Tracker API' });
  });

  return app;
}
