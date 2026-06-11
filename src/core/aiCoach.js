export function buildDeterministicCoachExplanation({ deterministicExplanation, explanationTags = [], source = null } = {}) {
  const sourceLabel = source && source.label ? source.label : 'source metadata';
  const quality = source && source.qualityTier ? source.qualityTier : 'unknown quality';
  return {
    generated: false,
    cacheable: true,
    text: deterministicExplanation || `This explanation is limited to deterministic tags: ${explanationTags.join(', ') || 'none'}.`,
    sourceLabel,
    qualityTier: quality,
    guardrail: 'AI may rewrite this explanation only; it may not decide correctness, EV, equity, or strategy.'
  };
}

export function createCoachExplanationCacheRecord({ cacheKey, scenarioId = null, sourceId = null, language = 'en', text, source = null, explanationTags = [] } = {}) {
  const base = buildDeterministicCoachExplanation({ deterministicExplanation: text, explanationTags, source });
  return {
    ...base,
    id: `coach_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    cacheKey,
    scenarioId,
    sourceId,
    language,
    createdAt: new Date().toISOString(),
    reported: false
  };
}

export function createCoachExplanationReport(record, reason = 'user_report') {
  return {
    id: `coach_report_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    cacheKey: record && record.cacheKey ? record.cacheKey : null,
    scenarioId: record && record.scenarioId ? record.scenarioId : null,
    sourceId: record && record.sourceId ? record.sourceId : null,
    reason
  };
}
