"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityModel = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    team: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    completedAt: { type: Date, required: true }
}, { collection: 'activities', timestamps: true });
exports.ActivityModel = (0, mongoose_1.model)('Activity', activitySchema);
