export const BACKUP_VERSION = 1;

export function createBackupPayload(data = {}) {
  return {
    version: BACKUP_VERSION,
    exportedAt: data.exportedAt || new Date().toISOString(),
    settings: data.settings || {},
    customRanges: data.customRanges || {},
    customDrills: data.customDrills || {},
    reviewQueue: Array.isArray(data.reviewQueue) ? data.reviewQueue : [],
    trainingEvents: Array.isArray(data.trainingEvents) ? data.trainingEvents : [],
    unknown: data.unknown && typeof data.unknown === 'object' ? data.unknown : {}
  };
}

export function validateBackupPayload(payload) {
  const required = ['version', 'exportedAt', 'settings', 'customRanges', 'customDrills', 'reviewQueue', 'trainingEvents'];
  const missing = required.filter(key => payload == null || payload[key] === undefined);
  const invalid = [];
  if (payload && payload.version !== BACKUP_VERSION) invalid.push('version');
  if (payload && !Array.isArray(payload.reviewQueue)) invalid.push('reviewQueue');
  if (payload && !Array.isArray(payload.trainingEvents)) invalid.push('trainingEvents');
  return { valid: missing.length === 0 && invalid.length === 0, missing, invalid };
}

export function parseBackupPayload(raw) {
  const payload = typeof raw === 'string' ? JSON.parse(raw) : raw;
  const validation = validateBackupPayload(payload);
  if (!validation.valid) {
    const error = new Error('Invalid backup payload');
    error.validation = validation;
    throw error;
  }
  return payload;
}
