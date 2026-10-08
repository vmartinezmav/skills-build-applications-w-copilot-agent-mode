import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      { name: 'Trail Blazers', points: 2450 },
      { name: 'Pace Makers', points: 2180 },
    ]);

    const users = await User.insertMany([
      { name: 'Maya Chen', email: 'maya.chen@example.com', teamId: teams[0]._id },
      { name: 'Jordan Rivera', email: 'jordan.rivera@example.com', teamId: teams[0]._id },
      { name: 'Sam Patel', email: 'sam.patel@example.com', teamId: teams[1]._id },
      { name: 'Alex Morgan', email: 'alex.morgan@example.com', teamId: teams[1]._id },
    ]);

    teams[0].members = [users[0]._id, users[1]._id];
    teams[1].members = [users[2]._id, users[3]._id];
    await Promise.all(teams.map((team) => team.save()));

    await Activity.insertMany([
      { userId: users[0]._id, activityType: 'running', durationMinutes: 35, distanceKm: 5.2, points: 520 },
      { userId: users[1]._id, activityType: 'cycling', durationMinutes: 48, distanceKm: 16.4, points: 410 },
      { userId: users[2]._id, activityType: 'walking', durationMinutes: 42, distanceKm: 3.8, points: 300 },
      { userId: users[3]._id, activityType: 'strength training', durationMinutes: 40, points: 350 },
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id, points: 1240, rank: 1, period: 'weekly' },
      { userId: users[1]._id, points: 960, rank: 2, period: 'weekly' },
      { userId: users[2]._id, points: 880, rank: 3, period: 'weekly' },
      { userId: users[3]._id, points: 760, rank: 4, period: 'weekly' },
      { teamId: teams[0]._id, points: teams[0].points, rank: 1, period: 'all-time' },
      { teamId: teams[1]._id, points: teams[1].points, rank: 2, period: 'all-time' },
    ]);

    await Workout.insertMany([
      {
        title: 'Steady 5K Run',
        description: 'An approachable endurance run at a conversational pace.',
        difficulty: 'beginner',
        durationMinutes: 35,
        exercises: ['5-minute warm-up walk', '25-minute steady run', '5-minute cool-down'],
      },
      {
        title: 'Outdoor Cycling Tempo',
        description: 'Build aerobic fitness with controlled tempo intervals.',
        difficulty: 'intermediate',
        durationMinutes: 45,
        exercises: ['10-minute easy ride', '3 x 7-minute tempo intervals', '5-minute recovery ride'],
      },
      {
        title: 'Full-Body Strength',
        description: 'A balanced strength session using basic compound movements.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: ['Squats', 'Push-ups', 'Dumbbell rows', 'Plank'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
