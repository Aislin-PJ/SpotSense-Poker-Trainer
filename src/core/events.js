export function buildSpotKey(input = {}) {
  const parts = [
    input.mode || 'UNKNOWN',
    input.heroPosition || input.position || 'NA',
    input.villainPosition || input.openerPosition || 'NA',
    input.stackDepth || input.stack || 'NA',
    input.actionLine || input.spotType || input.spot || 'decision',
    input.sourceId || 'UNKNOWN_SOURCE'
  ];
  return parts.map(part => String(part).trim().replace(/\s+/g, '-')).join(':');
}

export function validateTrainingEvent(event) {
  const required = ['id', 'createdAt', 'mode', 'spotKey', 'combo', 'actionTaken', 'correctAction', 'isCorrect', 'sourceId', 'sessionId'];
  const missing = required.filter(key => event[key] === undefined || event[key] === null || event[key] === '');
  return { valid: missing.length === 0, missing };
}

export function normalizeEvLoss(value) {
  if (value === undefined || value === null || value === '') return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

export function createTrainingEvent(input = {}) {
  const createdAt = input.createdAt || new Date().toISOString();
  const sourceId = input.sourceId || 'INTERNAL_SIMPLIFIED_BASELINE';
  const event = {
    id: input.id || `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt,
    mode: input.mode || 'UNKNOWN',
    spotKey: input.spotKey || buildSpotKey({ ...input, sourceId }),
    combo: input.combo || '',
    actionTaken: input.actionTaken || '',
    correctAction: input.correctAction || '',
    isCorrect: input.isCorrect === true,
    sourceId,
    sessionId: input.sessionId || 'local_session',
    grade: input.grade || null,
    evLoss: normalizeEvLoss(input.evLoss),
    heroPosition: input.heroPosition || input.position || null,
    villainPosition: input.villainPosition || null,
    openerPosition: input.openerPosition || null,
    stackDepth: input.stackDepth || input.stack || null,
    actionLine: input.actionLine || input.spotType || input.spot || null,
    spotType: input.spotType || input.spot || null,
    drillId: input.drillId || null,
    scenarioId: input.scenarioId || input.allStreetScenarioId || null,
    qualityTier: input.qualityTier || null
  };
  const validation = validateTrainingEvent(event);
  if (!validation.valid) {
    const error = new Error(`Invalid TrainingEvent: ${validation.missing.join(', ')}`);
    error.validation = validation;
    throw error;
  }
  return event;
}
