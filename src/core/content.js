export const QUALITY_TIERS = Object.freeze([
  'solver_verified',
  'licensed_solver_export',
  'public_reference',
  'educational_starter',
  'internal_baseline'
]);

export const SOURCE_ASSUMPTION_KEYS = Object.freeze([
  'gameType',
  'tableSize',
  'stackDepthBb',
  'rakeModel',
  'actionAbstraction'
]);

export function validateSpotSource(source) {
  const required = ['id', 'label', 'license', 'url', 'assumptions', 'qualityTier'];
  const missing = required.filter(key => source == null || source[key] === undefined || source[key] === '');
  const invalid = [];
  if (source && !QUALITY_TIERS.includes(source.qualityTier)) invalid.push('qualityTier');
  if (source && (!source.assumptions || typeof source.assumptions !== 'object')) invalid.push('assumptions');
  if (source && source.assumptions && typeof source.assumptions === 'object') {
    for (const key of SOURCE_ASSUMPTION_KEYS) {
      if (source.assumptions[key] === undefined || source.assumptions[key] === '') invalid.push(`assumptions.${key}`);
    }
  }
  return { valid: missing.length === 0 && invalid.length === 0, missing, invalid };
}

export function validatePack(pack) {
  const required = ['id', 'version', 'label', 'trainingObjective', 'qaStatus', 'sourceId', 'qualityTier', 'evAvailability', 'equityAvailability'];
  const missing = required.filter(key => pack == null || pack[key] === undefined || pack[key] === '');
  const invalid = [];
  if (pack && !QUALITY_TIERS.includes(pack.qualityTier)) invalid.push('qualityTier');
  return { valid: missing.length === 0 && invalid.length === 0, missing, invalid };
}

export function validateScenario(scenario, sources = {}, packs = {}) {
  const required = ['id', 'packId', 'street', 'positions', 'stackDepth', 'pot', 'spr', 'boardCards', 'actionLine', 'availableActions', 'comboActions', 'sourceId', 'explanationTags'];
  const missing = required.filter(key => scenario == null || scenario[key] === undefined || scenario[key] === '');
  const invalid = [];
  const source = scenario && sources[scenario.sourceId];
  if (!source) invalid.push('sourceId');
  if (source) {
    const assumptions = source.assumptions || {};
    for (const key of SOURCE_ASSUMPTION_KEYS) {
      if (assumptions[key] === undefined || assumptions[key] === '') invalid.push(`assumptions.${key}`);
    }
  }
  if (packs && Object.keys(packs).length) {
    const pack = scenario && packs[scenario.packId];
    if (!pack) invalid.push('packId');
    if (pack) {
      const packValidation = validatePack(pack);
      if (!packValidation.valid) invalid.push(...packValidation.missing.map(key => `pack.${key}`), ...packValidation.invalid.map(key => `pack.${key}`));
      if (pack.sourceId !== scenario.sourceId) invalid.push('pack.sourceId');
    }
  }
  if (scenario && !Array.isArray(scenario.boardCards)) invalid.push('boardCards');
  if (scenario && !Array.isArray(scenario.actionLine)) invalid.push('actionLine');
  if (scenario && !Array.isArray(scenario.availableActions)) invalid.push('availableActions');
  if (scenario && !Array.isArray(scenario.explanationTags)) invalid.push('explanationTags');
  return { valid: missing.length === 0 && invalid.length === 0, missing, invalid };
}

export function adaptLegacyAllStreetScenario(legacy) {
  return {
    ...legacy,
    positions: {
      hero: legacy.heroPosition,
      villain: legacy.villainPosition
    },
    stackDepth: { effectiveBb: legacy.effectiveStackBb },
    pot: { sizeBb: legacy.potBb },
    actionLine: legacy.previousAction || [],
    explanationTags: legacy.explanationTags || legacy.boardTexture || []
  };
}
