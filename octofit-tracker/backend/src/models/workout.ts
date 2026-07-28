import { Schema, model } from 'mongoose';

export interface Workout {
  name: string;
  focus: string;
  difficulty: string;
  durationMinutes: number;
  suggestedFor: string;
}

const workoutSchema = new Schema<Workout>(
  {
    name: { type: String, required: true },
    focus: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    suggestedFor: { type: String, required: true }
  },
  { collection: 'workouts', timestamps: true }
);

export const WorkoutModel = model<Workout>('Workout', workoutSchema);