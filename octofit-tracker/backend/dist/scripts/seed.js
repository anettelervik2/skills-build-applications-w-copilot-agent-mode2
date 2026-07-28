"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activity_js_1 = require("../models/activity.js");
const leaderboard_js_1 = require("../models/leaderboard.js");
const team_js_1 = require("../models/team.js");
const user_js_1 = require("../models/user.js");
const workout_js_1 = require("../models/workout.js");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const users = [
    { name: 'Mona Octavius', email: 'mona.octavius@example.com', age: 31, team: 'Octo Striders' },
    { name: 'Terry Fitton', email: 'terry.fitton@example.com', age: 28, team: 'Core Committers' },
    { name: 'Priya Sprint', email: 'priya.sprint@example.com', age: 35, team: 'Octo Striders' },
    { name: 'Diego Flex', email: 'diego.flex@example.com', age: 24, team: 'Rep Runners' }
];
const teams = [
    { name: 'Octo Striders', members: ['Mona Octavius', 'Priya Sprint'], motto: 'Eight arms, one pace.' },
    { name: 'Core Committers', members: ['Terry Fitton'], motto: 'Strong commits, stronger cores.' },
    { name: 'Rep Runners', members: ['Diego Flex'], motto: 'Ship reps daily.' }
];
const activities = [
    {
        user: 'Mona Octavius',
        team: 'Octo Striders',
        type: 'Trail Run',
        durationMinutes: 42,
        caloriesBurned: 430,
        completedAt: new Date('2026-07-22T07:30:00Z')
    },
    {
        user: 'Terry Fitton',
        team: 'Core Committers',
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 510,
        completedAt: new Date('2026-07-23T18:15:00Z')
    },
    {
        user: 'Priya Sprint',
        team: 'Octo Striders',
        type: 'Cycling',
        durationMinutes: 63,
        caloriesBurned: 620,
        completedAt: new Date('2026-07-24T06:45:00Z')
    },
    {
        user: 'Diego Flex',
        team: 'Rep Runners',
        type: 'Yoga Flow',
        durationMinutes: 35,
        caloriesBurned: 180,
        completedAt: new Date('2026-07-25T12:00:00Z')
    }
];
const leaderboard = [
    { rank: 1, user: 'Priya Sprint', team: 'Octo Striders', points: 1840 },
    { rank: 2, user: 'Mona Octavius', team: 'Octo Striders', points: 1725 },
    { rank: 3, user: 'Terry Fitton', team: 'Core Committers', points: 1580 },
    { rank: 4, user: 'Diego Flex', team: 'Rep Runners', points: 1210 }
];
const workouts = [
    {
        name: 'Morning 5K Builder',
        focus: 'Cardio endurance',
        difficulty: 'beginner',
        durationMinutes: 30,
        suggestedFor: 'New runners building consistency'
    },
    {
        name: 'Core Commit Circuit',
        focus: 'Core strength',
        difficulty: 'intermediate',
        durationMinutes: 40,
        suggestedFor: 'Athletes improving trunk stability'
    },
    {
        name: 'Sprint Merge Intervals',
        focus: 'Speed work',
        difficulty: 'advanced',
        durationMinutes: 45,
        suggestedFor: 'Competitive runners chasing leaderboard points'
    },
    {
        name: 'Recovery Stretch Stack',
        focus: 'Mobility',
        difficulty: 'beginner',
        durationMinutes: 20,
        suggestedFor: 'Anyone recovering after a high-volume week'
    }
];
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            user_js_1.UserModel.deleteMany({}),
            team_js_1.TeamModel.deleteMany({}),
            activity_js_1.ActivityModel.deleteMany({}),
            leaderboard_js_1.LeaderboardModel.deleteMany({}),
            workout_js_1.WorkoutModel.deleteMany({})
        ]);
        await Promise.all([
            user_js_1.UserModel.insertMany(users),
            team_js_1.TeamModel.insertMany(teams),
            activity_js_1.ActivityModel.insertMany(activities),
            leaderboard_js_1.LeaderboardModel.insertMany(leaderboard),
            workout_js_1.WorkoutModel.insertMany(workouts)
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
