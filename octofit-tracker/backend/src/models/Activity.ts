import mongoose, { Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, default: 0 },
    loggedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Activity = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema);

export default Activity;