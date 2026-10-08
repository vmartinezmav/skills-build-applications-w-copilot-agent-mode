import mongoose, { Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, min: 1 },
    exercises: [{ type: String }],
  },
  { timestamps: true },
);

const Workout = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema);

export default Workout;