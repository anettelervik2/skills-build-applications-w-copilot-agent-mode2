"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database.js");
const activity_js_1 = require("./models/activity.js");
const leaderboard_js_1 = require("./models/leaderboard.js");
const team_js_1 = require("./models/team.js");
const user_js_1 = require("./models/user.js");
const workout_js_1 = require("./models/workout.js");
const app = (0, express_1.default)();
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
app.use(express_1.default.json());
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
        const users = await user_js_1.UserModel.find().sort({ name: 1 }).lean();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/teams', async (_req, res, next) => {
    try {
        const teams = await team_js_1.TeamModel.find().sort({ name: 1 }).lean();
        res.status(200).json(teams);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/activities', async (_req, res, next) => {
    try {
        const activities = await activity_js_1.ActivityModel.find().sort({ completedAt: -1 }).lean();
        res.status(200).json(activities);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/leaderboard', async (_req, res, next) => {
    try {
        const leaderboard = await leaderboard_js_1.LeaderboardModel.find().sort({ rank: 1 }).lean();
        res.status(200).json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/workouts', async (_req, res, next) => {
    try {
        const workouts = await workout_js_1.WorkoutModel.find().sort({ difficulty: 1, name: 1 }).lean();
        res.status(200).json(workouts);
    }
    catch (error) {
        next(error);
    }
});
app.use((error, _req, res, _next) => {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal server error' });
});
app.listen(port, host, () => {
    console.log(`Octofit backend running at ${apiBaseUrl}`);
});
