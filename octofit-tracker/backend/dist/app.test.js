"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const app_1 = require("./app");
(0, node_test_1.default)('GET /api/health returns service status', async () => {
    const app = (0, app_1.createApp)();
    const server = app.listen(0);
    try {
        await new Promise((resolve) => {
            server.once('listening', resolve);
        });
        const address = server.address();
        const response = await fetch(`http://127.0.0.1:${address.port}/api/health`);
        const body = await response.json();
        strict_1.default.equal(response.status, 200);
        strict_1.default.deepEqual(body, { status: 'ok', service: 'octofit-backend' });
    }
    finally {
        await new Promise((resolve, reject) => {
            server.close((error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    }
});
(0, node_test_1.default)('GET /api/users returns seeded user data', async () => {
    const app = (0, app_1.createApp)();
    const server = app.listen(0);
    try {
        await new Promise((resolve) => {
            server.once('listening', resolve);
        });
        const address = server.address();
        const response = await fetch(`http://127.0.0.1:${address.port}/api/users`);
        const body = await response.json();
        strict_1.default.equal(response.status, 200);
        strict_1.default.ok(Array.isArray(body));
        strict_1.default.ok(body.length >= 4);
        strict_1.default.ok(body.some((user) => user.name === 'Maya Chen'));
    }
    finally {
        await new Promise((resolve, reject) => {
            server.close((error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    }
});
(0, node_test_1.default)('GET /api/activities returns recent activity data', async () => {
    const app = (0, app_1.createApp)();
    const server = app.listen(0);
    try {
        await new Promise((resolve) => {
            server.once('listening', resolve);
        });
        const address = server.address();
        const response = await fetch(`http://127.0.0.1:${address.port}/api/activities`);
        const body = await response.json();
        strict_1.default.equal(response.status, 200);
        strict_1.default.ok(Array.isArray(body));
        strict_1.default.ok(body.length >= 4);
        strict_1.default.ok(body.some((activity) => activity.type === 'Run'));
    }
    finally {
        await new Promise((resolve, reject) => {
            server.close((error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    }
});
