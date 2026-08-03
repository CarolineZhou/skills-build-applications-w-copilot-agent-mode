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
