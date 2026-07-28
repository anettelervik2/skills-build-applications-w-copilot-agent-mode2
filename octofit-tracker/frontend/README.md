# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application. It uses Vite, Bootstrap, and `react-router-dom` for navigation between users, teams, activities, leaderboard, and workouts.

## Environment

Define `VITE_CODESPACE_NAME` before running the frontend in a GitHub Codespace. For local development, add it to `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds API URLs with Vite environment variables through `import.meta.env`:

```js
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is unset, the app first infers the Codespace name from the current `*-5173.app.github.dev` preview hostname. Outside Codespaces, it falls back to `http://localhost:8000/api` so it does not create `https://undefined-8000.app.github.dev` URLs.

## Scripts

```bash
npm run dev --prefix octofit-tracker/frontend
npm run build --prefix octofit-tracker/frontend
```
