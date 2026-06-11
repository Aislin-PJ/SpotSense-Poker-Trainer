const STAT_COLLECTION_KEYS = Object.freeze(['byPosition', 'byMode', 'byCombo', 'byCustomDrill', 'byStackDepth', 'bySpotType']);

export function getEmptyStatsBucket() {
  return { totalHands: 0, totalCorrect: 0, byPosition: {}, byMode: {}, byCombo: {}, byCustomDrill: {}, byStackDepth: {}, bySpotType: {} };
}

export function getDefaultStats() {
  return { ...getEmptyStatsBucket(), byDate: {} };
}

export function normalizeStatCounter(value = {}) {
  const hands = Math.max(0, Math.floor(Number(value.hands) || 0));
  const correct = Math.min(hands, Math.max(0, Math.floor(Number(value.correct) || 0)));
  return { hands, correct };
}

export function normalizeStats(source = {}) {
  const raw = source && typeof source === 'object' && !Array.isArray(source) ? source : {};
  const stats = getDefaultStats();
  stats.totalHands = Math.max(0, Math.floor(Number(raw.totalHands) || 0));
  stats.totalCorrect = Math.min(stats.totalHands, Math.max(0, Math.floor(Number(raw.totalCorrect) || 0)));
  for (const key of STAT_COLLECTION_KEYS) {
    const collection = raw[key] && typeof raw[key] === 'object' && !Array.isArray(raw[key]) ? raw[key] : {};
    stats[key] = Object.fromEntries(Object.entries(collection).map(([itemKey, counter]) => [itemKey, normalizeStatCounter(counter)]));
  }
  if (raw.byDate && typeof raw.byDate === 'object' && !Array.isArray(raw.byDate)) {
    for (const [dateKey, bucket] of Object.entries(raw.byDate)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) stats.byDate[dateKey] = normalizeStats(bucket);
    }
  }
  return stats;
}

function increment(collection, key, isCorrect) {
  if (!key) return;
  if (!collection[key]) collection[key] = { hands: 0, correct: 0 };
  collection[key].hands += 1;
  if (isCorrect) collection[key].correct += 1;
}

function normalizeEvLoss(value) {
  if (value === undefined || value === null || value === '') return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function getLeakSeveritySource(event, evLoss) {
  if (evLoss !== null) return 'exact EV';
  if (event && (event.severitySource === 'estimated' || event.evLossEstimate !== undefined || event.estimatedEvLoss !== undefined)) return 'estimated';
  return 'placeholder';
}

export function deriveStatsFromEvents(events = []) {
  const stats = getDefaultStats();
  for (const event of events) {
    if (!event || !event.createdAt) continue;
    const isCorrect = event.isCorrect === true;
    stats.totalHands += 1;
    if (isCorrect) stats.totalCorrect += 1;
    increment(stats.byMode, event.mode, isCorrect);
    increment(stats.byPosition, event.heroPosition || event.position, isCorrect);
    increment(stats.byCombo, event.combo, isCorrect);
    increment(stats.byCustomDrill, event.drillId, isCorrect);
    increment(stats.byStackDepth, event.stackDepth || event.stack, isCorrect);
    increment(stats.bySpotType, event.spotType || event.mode, isCorrect);
    const dateKey = String(event.createdAt).slice(0, 10);
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
      if (!stats.byDate[dateKey]) stats.byDate[dateKey] = getEmptyStatsBucket();
      const bucket = stats.byDate[dateKey];
      bucket.totalHands += 1;
      if (isCorrect) bucket.totalCorrect += 1;
      increment(bucket.byMode, event.mode, isCorrect);
      increment(bucket.byPosition, event.heroPosition || event.position, isCorrect);
      increment(bucket.byCombo, event.combo, isCorrect);
      increment(bucket.byCustomDrill, event.drillId, isCorrect);
      increment(bucket.byStackDepth, event.stackDepth || event.stack, isCorrect);
      increment(bucket.bySpotType, event.spotType || event.mode, isCorrect);
    }
  }
  return stats;
}

export function computeComboMastery(events = [], filters = {}) {
  const buckets = new Map();
  for (const event of events) {
    if (!event || !event.combo) continue;
    if (filters.mode && event.mode !== filters.mode) continue;
    if (filters.spotKey && event.spotKey !== filters.spotKey) continue;
    if (filters.position && (event.heroPosition || event.position) !== filters.position) continue;
    if (filters.stackDepth && String(event.stackDepth || event.stack || '') !== String(filters.stackDepth)) continue;
    if (filters.combo && String(event.combo).toUpperCase() !== String(filters.combo).toUpperCase()) continue;
    const key = [event.mode || 'UNKNOWN', event.spotKey || 'unknown', event.heroPosition || event.position || '', event.combo].join('|');
    const bucket = buckets.get(key) || {
      mode: event.mode || 'UNKNOWN',
      spotKey: event.spotKey || '',
      position: event.heroPosition || event.position || '',
      combo: event.combo,
      hands: 0,
      correct: 0,
      accuracy: 0,
      level: 'unseen'
    };
    bucket.hands += 1;
    if (event.isCorrect) bucket.correct += 1;
    buckets.set(key, bucket);
  }
  return [...buckets.values()].map(bucket => {
    bucket.accuracy = bucket.hands ? Math.round((bucket.correct / bucket.hands) * 100) : 0;
    if (!bucket.hands) bucket.level = 'unseen';
    else if (bucket.hands < 3 || bucket.accuracy < 55) bucket.level = 'learning';
    else if (bucket.accuracy < 70) bucket.level = 'improving';
    else if (bucket.accuracy < 85 || bucket.hands < 8) bucket.level = 'strong';
    else bucket.level = 'mastered';
    return bucket;
  });
}

export function rankLeaksFromEvents(events = []) {
  const misses = new Map();
  for (const event of events) {
    if (!event || event.isCorrect) continue;
    const evLoss = normalizeEvLoss(event.evLoss);
    const severitySource = getLeakSeveritySource(event, evLoss);
    const key = event.spotKey || `${event.mode || 'UNKNOWN'}:${event.heroPosition || event.position || ''}:${event.combo || ''}`;
    const bucket = misses.get(key) || {
      key,
      mode: event.mode || 'UNKNOWN',
      spotKey: event.spotKey || '',
      combo: event.combo || '',
      position: event.heroPosition || event.position || '',
      count: 0,
      severitySource,
      evLoss: 0
    };
    bucket.count += 1;
    if (evLoss !== null) {
      bucket.evLoss += evLoss;
      bucket.severitySource = 'exact EV';
    } else if (bucket.severitySource === 'placeholder' && severitySource === 'estimated') {
      bucket.severitySource = 'estimated';
    }
    misses.set(key, bucket);
  }
  return [...misses.values()].sort((a, b) => b.count - a.count || b.evLoss - a.evLoss);
}
