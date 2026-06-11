export const REVIEW_GRADES = Object.freeze(['Again', 'Hard', 'Good', 'Easy']);

export function normalizeIsoDate(value, fallback = null) {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

export function normalizeMistakeReviewItem(item = {}, fallbackDueAt = new Date().toISOString()) {
  const attempts = Math.max(0, Math.floor(Number(item.attempts) || 0));
  const reviewCount = Math.max(0, Math.floor(Number(item.reviewCount ?? attempts) || 0));
  const lapseCount = Math.max(0, Math.floor(Number(item.lapseCount) || 0));
  const intervalDays = Math.max(0, Math.floor(Number(item.intervalDays) || 0));
  const stability = Number.isFinite(Number(item.stability))
    ? Math.max(0.1, Number(item.stability))
    : Math.max(1, intervalDays || 1);
  const difficulty = Number.isFinite(Number(item.difficulty))
    ? Math.min(10, Math.max(1, Number(item.difficulty)))
    : 5;
  const lastGrade = REVIEW_GRADES.includes(item.lastGrade) ? item.lastGrade : null;

  return {
    ...item,
    attempts,
    intervalDays,
    ease: Number.isFinite(Number(item.ease)) ? Math.max(1.3, Number(item.ease)) : 2.5,
    successStreak: Math.max(0, Math.floor(Number(item.successStreak) || 0)),
    lastResult: item.lastResult || 'new',
    dueAt: normalizeIsoDate(item.dueAt, fallbackDueAt),
    lastReviewedAt: normalizeIsoDate(item.lastReviewedAt, item.lastReviewedAt || null),
    stability,
    difficulty,
    reviewCount,
    lapseCount,
    lastGrade
  };
}

export function sortMistakeReviewQueue(queue, referenceDate = new Date()) {
  const referenceTime = referenceDate.getTime();
  return queue.slice().sort((a, b) => {
    const aDue = new Date(a.dueAt || 0).getTime();
    const bDue = new Date(b.dueAt || 0).getTime();
    const aIsDue = Number.isNaN(aDue) || aDue <= referenceTime;
    const bIsDue = Number.isNaN(bDue) || bDue <= referenceTime;
    if (aIsDue !== bIsDue) return aIsDue ? -1 : 1;
    if (aDue !== bDue) return aDue - bDue;
    return String(b.addedAt || '').localeCompare(String(a.addedAt || ''));
  });
}

export function isMistakeReviewDue(item, referenceDate = new Date()) {
  if (!item || !item.dueAt) return true;
  const due = new Date(item.dueAt);
  return Number.isNaN(due.getTime()) || due <= referenceDate;
}

export function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function scheduleReviewItem(item, grade, referenceDate = new Date()) {
  const normalized = normalizeMistakeReviewItem(item, referenceDate.toISOString());
  const normalizedGrade = REVIEW_GRADES.includes(grade) ? grade : 'Good';
  const result = {
    ...normalized,
    attempts: normalized.attempts + 1,
    reviewCount: normalized.reviewCount + 1,
    lastReviewedAt: referenceDate.toISOString(),
    lastGrade: normalizedGrade
  };

  if (normalizedGrade === 'Again') {
    result.successStreak = 0;
    result.intervalDays = 0;
    result.stability = Math.max(0.5, normalized.stability * 0.45);
    result.difficulty = Math.min(10, normalized.difficulty + 0.8);
    result.lapseCount = normalized.lapseCount + 1;
    result.lastResult = 'missed';
    result.dueAt = referenceDate.toISOString();
    return result;
  }

  const multipliers = { Hard: 1.2, Good: 2.5, Easy: 3.6 };
  const minimumDays = { Hard: 1, Good: 1, Easy: 3 };
  const difficultyDelta = { Hard: 0.3, Good: -0.05, Easy: -0.45 };
  const multiplier = multipliers[normalizedGrade] || multipliers.Good;
  const nextStability = Math.max(minimumDays[normalizedGrade], normalized.stability * multiplier);
  const nextInterval = Math.max(minimumDays[normalizedGrade], Math.round(nextStability));

  result.successStreak = normalized.successStreak + 1;
  result.intervalDays = nextInterval;
  result.stability = Number(nextStability.toFixed(2));
  result.difficulty = Number(Math.min(10, Math.max(1, normalized.difficulty + difficultyDelta[normalizedGrade])).toFixed(2));
  result.lastResult = 'correct';
  result.dueAt = addDays(referenceDate, nextInterval).toISOString();
  return result;
}
