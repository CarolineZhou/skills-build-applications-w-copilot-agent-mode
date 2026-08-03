import test from 'node:test';
import assert from 'node:assert/strict';
import { AddressInfo } from 'node:net';
import { createApp } from './app';

test('GET /api/health returns service status', async () => {
  const app = createApp();
  const server = app.listen(0);

  try {
    await new Promise<void>((resolve) => {
      server.once('listening', resolve);
    });

    const address = server.address() as AddressInfo;
    const response = await fetch(`http://127.0.0.1:${address.port}/api/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, { status: 'ok', service: 'octofit-backend' });
  } finally {
    await new Promise<void>((resolve, reject) => {
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

test('GET /api/users returns seeded user data', async () => {
  const app = createApp();
  const server = app.listen(0);

  try {
    await new Promise<void>((resolve) => {
      server.once('listening', resolve);
    });

    const address = server.address() as AddressInfo;
    const response = await fetch(`http://127.0.0.1:${address.port}/api/users`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(body));
    assert.ok(body.length >= 4);
    assert.ok(body.some((user: { name: string }) => user.name === 'Maya Chen'));
  } finally {
    await new Promise<void>((resolve, reject) => {
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

test('GET /api/activities returns recent activity data', async () => {
  const app = createApp();
  const server = app.listen(0);

  try {
    await new Promise<void>((resolve) => {
      server.once('listening', resolve);
    });

    const address = server.address() as AddressInfo;
    const response = await fetch(`http://127.0.0.1:${address.port}/api/activities`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(body));
    assert.ok(body.length >= 4);
    assert.ok(body.some((activity: { type: string }) => activity.type === 'Run'));
  } finally {
    await new Promise<void>((resolve, reject) => {
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
