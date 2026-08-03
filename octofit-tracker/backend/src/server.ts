import dotenv from 'dotenv';
import { createApp, getApiBaseUrl } from './app';

dotenv.config();

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const port = Number(process.env.PORT || 8000);
const app = createApp();

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${baseUrl}`);
  console.log(`Resolved base URL helper: ${getApiBaseUrl()}`);
});
