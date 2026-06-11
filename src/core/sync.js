export function createSyncEnvelope({ deviceId, accountId = null, cursor = null, events = [], clientTime = new Date().toISOString() } = {}) {
  return {
    protocol: 'spotsense-event-sync-v1',
    deviceId: deviceId || `device_${Math.random().toString(36).slice(2, 10)}`,
    accountId,
    cursor,
    clientTime,
    events: Array.isArray(events) ? events : []
  };
}

export function mergeEventLogs(localEvents = [], remoteEvents = []) {
  const byId = new Map();
  for (const event of [...localEvents, ...remoteEvents]) {
    if (event && event.id && !byId.has(event.id)) byId.set(event.id, event);
  }
  return [...byId.values()].sort((a, b) => String(a.createdAt || '').localeCompare(String(b.createdAt || '')));
}
