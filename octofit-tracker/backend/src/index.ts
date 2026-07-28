import express from 'express';
import './config/database.js';
import { ActivityModel } from './models/activity.js';
import { LeaderboardModel } from './models/leaderboard.js';
import { TeamModel } from './models/team.js';
import { UserModel } from './models/user.js';
import { WorkoutModel } from './models/workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const host = '0.0.0.0';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : [])
]);

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users', async (_req, res, next) => {
  try {
    const users = await UserModel.find().sort({ name: 1 }).lean();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams', async (_req, res, next) => {
  try {
    const teams = await TeamModel.find().sort({ name: 1 }).lean();

    res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find().sort({ completedAt: -1 }).lean();

    res.status(200).json(activities);
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).lean();

    res.status(200).json(leaderboard);
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts', async (_req, res, next) => {
  try {
    const workouts = await WorkoutModel.find().sort({ difficulty: 1, name: 1 }).lean();

    res.status(200).json(workouts);
  } catch (error) {
    next(error);
  }
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('API error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, host, () => {
  console.log(`Octofit backend running at ${apiBaseUrl}`);
});
