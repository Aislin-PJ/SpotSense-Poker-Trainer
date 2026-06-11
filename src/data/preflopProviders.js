export const PREFLOP_SOURCE_IDS = Object.freeze({
  rfi: 'TYLOO_RFI_6MAX_2026',
  defense: Object.freeze({
    BTN_VS_CO: 'AHTOOOXA_GREENLINE_2026',
    BTN_VS_HJ: 'AHTOOOXA_GREENLINE_2026',
    BB_VS_BTN: 'TYLOO_BB_DEFENSE_BTN_2026',
    BB_VS_SB: 'AHTOOOXA_GREENLINE_2026',
    SB_VS_BTN: 'AHTOOOXA_GREENLINE_2026'
  }),
  facingThreeBet: 'AHTOOOXA_GREENLINE_2026',
  headsUpPushFold: 'CANDY_POKER_HU_PUSH_FOLD_2026',
  internalBaseline: 'INTERNAL_SIMPLIFIED_BASELINE'
});

export function resolveRfiSource(position = 'UTG') {
  const chartPosition = String(position || 'UTG').toUpperCase();
  return {
    id: PREFLOP_SOURCE_IDS.rfi,
    note: chartPosition === 'HJ'
      ? 'HJ uses the MIT source MP row; 6-max RFI, rounded practical frequencies.'
      : 'MIT source 6-max RFI row; rounded practical frequencies.'
  };
}

export function resolveDefenseSource(scenarioId, scenario = {}) {
  const id = PREFLOP_SOURCE_IDS.defense[scenarioId] || PREFLOP_SOURCE_IDS.internalBaseline;
  const hero = scenario.hero || 'Hero';
  const villain = scenario.villain || 'opener';
  return {
    id,
    note: id === PREFLOP_SOURCE_IDS.internalBaseline
      ? 'Defense table is the app built-in binary training baseline; mixed frequencies require a licensed export.'
      : `${hero} defense versus ${villain} open; rounded practical frequencies.`
  };
}

export function resolveFacingThreeBetSource(hasGreenlineChart = false, heroPosition = 'CO', villainPosition = 'BTN') {
  if (!hasGreenlineChart) {
    return {
      id: PREFLOP_SOURCE_IDS.internalBaseline,
      note: 'Facing 3-bet table is the app built-in binary fallback because no matching licensed Greenline source chart is available.'
    };
  }
  return {
    id: PREFLOP_SOURCE_IDS.facingThreeBet,
    note: `${heroPosition} facing ${villainPosition} 3-bet; source chart mapped to Greenline preflop references.`
  };
}

export function resolvePushFoldSource({ position = 'UTG', hasHeadsUpThreshold = false, stack = null } = {}) {
  if (String(position).toUpperCase() === 'SB' && hasHeadsUpThreshold) {
    return {
      id: PREFLOP_SOURCE_IDS.headsUpPushFold,
      note: `Heads-up SB first-in push/fold threshold; shown as all-in when stack is at or below threshold${stack ? ` (${stack}bb checked)` : ''}.`
    };
  }
  return {
    id: PREFLOP_SOURCE_IDS.internalBaseline,
    note: `${stack || 'Selected'}bb push/fold table is the app's built-in binary training baseline; no licensed multi-position solver export is attached.`
  };
}
