import dotenv from 'dotenv';
import { createApp } from './app';
import './config/database';

dotenv.config();

const port = Number(process.env.PORT || 8000);
const app = createApp();

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
