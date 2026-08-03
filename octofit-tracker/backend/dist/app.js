"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = getApiBaseUrl;
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
}
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.get('/api/health', (_req, res) => {
        res.json({ status: 'ok', service: 'octofit-backend' });
    });
    app.get('/api', (_req, res) => {
        res.json({ message: 'Welcome to the OctoFit Tracker API', baseUrl: getApiBaseUrl() });
    });
    app.get('/api/users', (_req, res) => {
        res.json([
            { name: 'Maya Chen', email: 'maya.chen@mergington.edu', role: 'student' },
            { name: 'Noah Patel', email: 'noah.patel@mergington.edu', role: 'student' },
            { name: 'Sofia Rivera', email: 'sofia.rivera@mergington.edu', role: 'student' },
            { name: 'Liam Brooks', email: 'liam.brooks@mergington.edu', role: 'teacher' }
        ]);
    });
    app.get('/api/activities', (_req, res) => {
        res.json([
            { userName: 'Maya Chen', type: 'Run', durationMinutes: 35, distanceKm: 5.2, points: 120 },
            { userName: 'Noah Patel', type: 'Strength', durationMinutes: 45, points: 90 },
            { userName: 'Sofia Rivera', type: 'Swim', durationMinutes: 30, distanceKm: 2.8, points: 110 },
            { userName: 'Liam Brooks', type: 'Walk', durationMinutes: 25, distanceKm: 3.4, points: 70 },
            { userName: 'Maya Chen', type: 'Cycling', durationMinutes: 40, distanceKm: 12.5, points: 140 },
            { userName: 'Noah Patel', type: 'Yoga', durationMinutes: 20, points: 60 }
        ]);
    });
    return app;
}
