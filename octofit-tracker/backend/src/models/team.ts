import { Schema, model } from 'mongoose';

export interface Team {
  name: string;
  members: string[];
  motto: string;
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true },
    members: [{ type: String, required: true }],
    motto: { type: String, required: true }
  },
  { collection: 'teams', timestamps: true }
);

export const TeamModel = model<Team>('Team', teamSchema);