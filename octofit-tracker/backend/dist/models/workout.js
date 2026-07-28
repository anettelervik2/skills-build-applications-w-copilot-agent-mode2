"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    focus: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    suggestedFor: { type: String, required: true }
}, { collection: 'workouts', timestamps: true });
exports.WorkoutModel = (0, mongoose_1.model)('Workout', workoutSchema);
