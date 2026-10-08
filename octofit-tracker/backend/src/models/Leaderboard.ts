import mongoose, { Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, min: 1 },
    period: { type: String, default: 'all-time' },
  },
  { timestamps: true },
);

const Leaderboard = mongoose.models.Leaderboard ?? mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;