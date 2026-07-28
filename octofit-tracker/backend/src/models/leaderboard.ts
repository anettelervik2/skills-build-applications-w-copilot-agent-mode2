import { Schema, model } from 'mongoose';

export interface LeaderboardEntry {
  rank: number;
  user: string;
  team: string;
  points: number;
}

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    rank: { type: Number, required: true },
    user: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true }
  },
  { collection: 'leaderboard', timestamps: true }
);

export const LeaderboardModel = model<LeaderboardEntry>('LeaderboardEntry', leaderboardSchema);