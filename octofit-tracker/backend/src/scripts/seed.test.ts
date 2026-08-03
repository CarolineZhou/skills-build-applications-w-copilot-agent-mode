import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSeedData } from './seed';

test('buildSeedData returns populated sample collections', () => {
  const data = buildSeedData();

  assert.equal(data.users.length, 4);
  assert.equal(data.teams.length, 2);
  assert.equal(data.activities.length, 6);
  assert.equal(data.workouts.length, 4);
  assert.equal(data.leaderboard.length, 4);
  assert.ok(data.users.every((user) => user.email.includes('@')));
  assert.ok(data.teams.every((team) => team.members.length > 0));
});
