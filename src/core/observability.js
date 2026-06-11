const SENSITIVE_KEYS = new Set([
  'handHistory',
  'customRanges',
  'customDrills',
  'backup',
  'backupPayload',
  'trainingEvents',
  'message',
  'email',
  'name'
]);

export function sanitizeObservabilityPayload(value, depth = 0) {
  if (depth > 4) return '[truncated]';
  if (Array.isArray(value)) return value.slice(0, 20).map(item => sanitizeObservabilityPayload(item, depth + 1));
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => {
    if (SENSITIVE_KEYS.has(key)) return [key, '[redacted]'];
    return [key, sanitizeObservabilityPayload(item, depth + 1)];
  }));
}

export function createErrorRecord(error, context = {}) {
  return sanitizeObservabilityPayload({
    id: `err_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    name: error && error.name ? error.name : 'Error',
    errorMessage: error && error.message ? error.message : String(error || 'Unknown error'),
    stack: error && error.stack ? String(error.stack).split('\n').slice(0, 6).join('\n') : '',
    context
  });
}
