# React + Vite

This frontend uses React 19, Vite, Bootstrap, and react-router-dom for the OctoFit multi-tier experience.

## Environment configuration

The presentation tier uses the GitHub Codespaces public URL when the environment variable `VITE_CODESPACE_NAME` is defined. Define it in a local environment file such as `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

If `VITE_CODESPACE_NAME` is not set, the app falls back to the local backend at `http://localhost:8000/api`.

## Development

Run the frontend with:

```bash
npm --prefix octofit-tracker/frontend run dev -- --host 0.0.0.0
```
