"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardModel = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    rank: { type: Number, required: true },
    user: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true }
}, { collection: 'leaderboard', timestamps: true });
exports.LeaderboardModel = (0, mongoose_1.model)('LeaderboardEntry', leaderboardSchema);
