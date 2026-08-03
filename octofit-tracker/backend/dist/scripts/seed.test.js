"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const seed_1 = require("./seed");
(0, node_test_1.default)('buildSeedData returns populated sample collections', () => {
    const data = (0, seed_1.buildSeedData)();
    strict_1.default.equal(data.users.length, 4);
    strict_1.default.equal(data.teams.length, 2);
    strict_1.default.equal(data.activities.length, 6);
    strict_1.default.equal(data.workouts.length, 4);
    strict_1.default.equal(data.leaderboard.length, 4);
    strict_1.default.ok(data.users.every((user) => user.email.includes('@')));
    strict_1.default.ok(data.teams.every((team) => team.members.length > 0));
});
