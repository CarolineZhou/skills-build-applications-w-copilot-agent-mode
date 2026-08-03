import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

interface UserSeed {
  name: string;
  email: string;
  role: string;
}

interface TeamSeed {
  name: string;
  sport: string;
  members: string[];
}

interface ActivitySeed {
  userName: string;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  points: number;
}

interface WorkoutSeed {
  title: string;
  focus: string;
  difficulty: string;
  durationMinutes: number;
}

interface LeaderboardSeed {
  name: string;
  points: number;
  team: string;
}

interface SeedData {
  users: UserSeed[];
  teams: TeamSeed[];
  activities: ActivitySeed[];
  workouts: WorkoutSeed[];
  leaderboard: LeaderboardSeed[];
}

/**
 * Build sample test data for the OctoFit database covering users, teams,
 * activities, workouts, and leaderboard entries.
 */
export function buildSeedData(): SeedData {
  return {
    users: [
      { name: 'Maya Chen', email: 'maya.chen@mergington.edu', role: 'student' },
      { name: 'Noah Patel', email: 'noah.patel@mergington.edu', role: 'student' },
      { name: 'Sofia Rivera', email: 'sofia.rivera@mergington.edu', role: 'student' },
      { name: 'Liam Brooks', email: 'liam.brooks@mergington.edu', role: 'teacher' }
    ],
    teams: [
      { name: 'Thunder Falcons', sport: 'Cross Country', members: ['Maya Chen', 'Noah Patel'] },
      { name: 'Ocean Striders', sport: 'Swimming', members: ['Sofia Rivera', 'Liam Brooks'] }
    ],
    activities: [
      { userName: 'Maya Chen', type: 'Run', durationMinutes: 35, distanceKm: 5.2, points: 120 },
      { userName: 'Noah Patel', type: 'Strength', durationMinutes: 45, points: 90 },
      { userName: 'Sofia Rivera', type: 'Swim', durationMinutes: 30, distanceKm: 2.8, points: 110 },
      { userName: 'Liam Brooks', type: 'Walk', durationMinutes: 25, distanceKm: 3.4, points: 70 },
      { userName: 'Maya Chen', type: 'Cycling', durationMinutes: 40, distanceKm: 12.5, points: 140 },
      { userName: 'Noah Patel', type: 'Yoga', durationMinutes: 20, points: 60 }
    ],
    workouts: [
      { title: 'Sprint Intervals', focus: 'Cardio', difficulty: 'Intermediate', durationMinutes: 25 },
      { title: 'Core Strength', focus: 'Core', difficulty: 'Beginner', durationMinutes: 20 },
      { title: 'Endurance Loop', focus: 'Stamina', difficulty: 'Advanced', durationMinutes: 35 },
      { title: 'Mobility Flow', focus: 'Recovery', difficulty: 'Beginner', durationMinutes: 15 }
    ],
    leaderboard: [
      { name: 'Maya Chen', points: 260, team: 'Thunder Falcons' },
      { name: 'Sofia Rivera', points: 110, team: 'Ocean Striders' },
      { name: 'Noah Patel', points: 150, team: 'Thunder Falcons' },
      { name: 'Liam Brooks', points: 70, team: 'Ocean Striders' }
    ]
  };
}

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    const data = buildSeedData();
    const db = mongoose.connection.db;

    if (!db) {
      throw new Error('Database connection is not available');
    }

    await db.collection('users').deleteMany({});
    await db.collection('teams').deleteMany({});
    await db.collection('activities').deleteMany({});
    await db.collection('workouts').deleteMany({});
    await db.collection('leaderboard').deleteMany({});

    await db.collection('users').insertMany(data.users);
    await db.collection('teams').insertMany(data.teams);
    await db.collection('activities').insertMany(data.activities);
    await db.collection('workouts').insertMany(data.workouts);
    await db.collection('leaderboard').insertMany(data.leaderboard);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}
