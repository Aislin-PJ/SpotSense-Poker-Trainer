export const ACTION_FREQUENCY_ORDER = Object.freeze(['Raise', 'All-In', 'Call', 'Fold']);

export function normalizeActionFrequencies(frequencies, fallbackAction = 'Fold') {
  const normalized = {};
  let total = 0;

  for (const action of ACTION_FREQUENCY_ORDER) {
    const value = Number(frequencies && frequencies[action]);
    const percent = Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
    normalized[action] = percent;
    total += percent;
  }

  if (total <= 0) {
    for (const action of ACTION_FREQUENCY_ORDER) normalized[action] = 0;
    normalized[fallbackAction] = 100;
    return normalized;
  }

  if (total !== 100) {
    let remaining = 100;
    ACTION_FREQUENCY_ORDER.forEach((action, index) => {
      if (index === ACTION_FREQUENCY_ORDER.length - 1) {
        normalized[action] = Math.max(0, remaining);
      } else {
        normalized[action] = Math.min(normalized[action], remaining);
        remaining -= normalized[action];
      }
    });
  }

  return normalized;
}

export function getPositiveFrequencyActions(frequencies) {
  return ACTION_FREQUENCY_ORDER.filter(action => Number(frequencies && frequencies[action]) > 0);
}

export function getDominantFrequencyAction(frequencies, fallbackAction = 'Fold') {
  let bestAction = fallbackAction;
  let bestFrequency = -1;
  for (const action of ACTION_FREQUENCY_ORDER) {
    const frequency = Number(frequencies && frequencies[action]) || 0;
    if (frequency > bestFrequency) {
      bestAction = action;
      bestFrequency = frequency;
    }
  }
  return bestFrequency > 0 ? bestAction : fallbackAction;
}

export function getRfiActionFrequencies(position, combo, tables = {}, fallbackRanges = {}) {
  const sourceTable = tables[position];
  if (sourceTable) {
    const sourced = sourceTable[combo];
    return normalizeActionFrequencies(sourced || { Fold: 100 }, sourced ? 'Raise' : 'Fold');
  }
  const fallbackRange = fallbackRanges[position];
  const fallbackAction = fallbackRange && fallbackRange.has(combo) ? 'Raise' : 'Fold';
  return normalizeActionFrequencies({ [fallbackAction]: 100 }, fallbackAction);
}

export function getPushFoldActionFrequencies(position, stack, combo, rangesByStack = {}, headsUpThresholds = {}) {
  const numericStack = Number(stack);
  const headsUpSbThreshold = Number(headsUpThresholds[combo]);
  if (position === 'SB' && Number.isFinite(numericStack) && Number.isFinite(headsUpSbThreshold)) {
    const sourcedAction = numericStack <= headsUpSbThreshold ? 'All-In' : 'Fold';
    return normalizeActionFrequencies({ [sourcedAction]: 100 }, sourcedAction);
  }

  const ranges = rangesByStack[String(stack)] || rangesByStack['10'] || {};
  const range = ranges[position] || ranges.UTG || new Set();
  const fallbackAction = range.has(combo) ? 'All-In' : 'Fold';
  return normalizeActionFrequencies({ [fallbackAction]: 100 }, fallbackAction);
}

export function getActionRangeFrequencies(combo, raiseRange, callRange) {
  if (raiseRange && raiseRange.has(combo)) return normalizeActionFrequencies({ Raise: 100 }, 'Raise');
  if (callRange && callRange.has(combo)) return normalizeActionFrequencies({ Call: 100 }, 'Call');
  return normalizeActionFrequencies({ Fold: 100 }, 'Fold');
}
