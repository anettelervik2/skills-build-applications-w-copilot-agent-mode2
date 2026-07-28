import express from 'express';
import './config/database.js';
import { ActivityModel } from './models/activity.js';
import { LeaderboardModel } from './models/leaderboard.js';
import { TeamModel } from './models/team.js';
import { UserModel } from './models/user.js';
import { WorkoutModel } from './models/workout.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users/', async (_req, res, next) => {
  try {
    const users = await UserModel.find().sort({ name: 1 }).lean();

  res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_req, res, next) => {
  try {
    const teams = await TeamModel.find().sort({ name: 1 }).lean();

  res.status(200).json(teams);
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find().sort({ completedAt: -1 }).lean();

  res.status(200).json(activities);
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).lean();

  res.status(200).json(leaderboard);
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_req, res, next) => {
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

app.listen(port, () => {
  console.log(`Octofit backend running at ${apiBaseUrl}`);
});
