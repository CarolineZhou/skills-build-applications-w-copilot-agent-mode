const fallbackApiBase = 'http://localhost:8000/api';

function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return fallbackApiBase;
}

export function getApiBaseUrlForDisplay() {
  return getApiBaseUrl();
}

export function buildApiUrl(resource) {
  const sanitizedResource = String(resource).replace(/^\/+|\/+$/g, '');
  return `${getApiBaseUrl()}/${sanitizedResource}/`;
}

function unwrapCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const possibleKeys = ['results', 'items', 'data', 'users', 'activities', 'teams', 'workouts', 'leaderboard'];

  for (const key of possibleKeys) {
    if (Array.isArray(payload[key])) {
      return payload[key];
    }
  }

  return [];
}

export async function fetchCollection(resource, fallback = []) {
  try {
    const response = await fetch(buildApiUrl(resource));

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const payload = await response.json();
    const items = unwrapCollection(payload);

    return items.length > 0 ? items : fallback;
  } catch (error) {
    console.error(`Unable to load ${resource}`, error);
    return fallback;
  }
}
