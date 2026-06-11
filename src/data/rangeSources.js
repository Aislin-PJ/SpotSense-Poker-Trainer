export const RANGE_DATA_SOURCES = Object.freeze({
  TYLOO_RFI_6MAX_2026: Object.freeze({
    label: 'Tyloo MIT RFI reference',
    detail: '6-max RFI percentages from tyloo/poker-range-analyzer, MIT License. HJ uses the source MP table.',
    url: 'https://github.com/tyloo/poker-range-analyzer',
    license: 'MIT',
    assumptions: {
      gameType: 'cash',
      tableSize: '6max',
      stackDepthBb: 100,
      rakeModel: 'source-defined-or-unknown',
      actionAbstraction: 'open/fold'
    },
    qualityTier: 'public_reference'
  }),
  TYLOO_BB_DEFENSE_BTN_2026: Object.freeze({
    label: 'Tyloo MIT BB defense reference',
    detail: 'BB defense percentages versus BTN open from tyloo/poker-range-analyzer, MIT License.',
    url: 'https://github.com/tyloo/poker-range-analyzer/blob/main/lib/ranges/bb.ts',
    license: 'MIT',
    assumptions: {
      gameType: 'cash',
      tableSize: '6max',
      stackDepthBb: 100,
      rakeModel: 'source-defined-or-unknown',
      actionAbstraction: 'defend-vs-open'
    },
    qualityTier: 'public_reference'
  }),
  AHTOOOXA_GREENLINE_2026: Object.freeze({
    label: 'AHTOOOXA MIT Greenline reference',
    detail: 'Greenline preflop charts from AHTOOOXA/poker-charts, MIT License. HJ uses the source MP row.',
    url: 'https://github.com/AHTOOOXA/poker-charts/blob/main/src/data/ranges/greenline.ts',
    license: 'MIT',
    assumptions: {
      gameType: 'cash',
      tableSize: '6max',
      stackDepthBb: 100,
      rakeModel: 'source-defined-or-unknown',
      actionAbstraction: 'preflop-range-chart'
    },
    qualityTier: 'public_reference'
  }),
  CANDY_POKER_HU_PUSH_FOLD_2026: Object.freeze({
    label: 'CandyPoker MIT HU push/fold reference',
    detail: 'Heads-up SB push/fold threshold table from sweeterthancandy/CandyPoker, MIT License.',
    url: 'https://github.com/sweeterthancandy/CandyPoker#readme',
    license: 'MIT',
    assumptions: {
      gameType: 'tournament',
      tableSize: 'heads-up',
      stackDepthBb: '6-15',
      rakeModel: 'not-applicable',
      actionAbstraction: 'push/fold'
    },
    qualityTier: 'public_reference'
  }),
  POSTFLOP_STARTER_EDUCATIONAL_2026: Object.freeze({
    label: 'SpotSense postflop educational starter pack',
    detail: 'Educational starter examples for board texture and sizing practice. These are not solver-verified equilibrium outputs.',
    url: 'internal://spotsense/postflop-starter-2026',
    license: 'Internal educational content',
    assumptions: {
      gameType: 'cash',
      tableSize: '6max',
      stackDepthBb: 100,
      rakeModel: 'not solver verified',
      actionAbstraction: 'educational starter decisions'
    },
    qualityTier: 'educational_starter'
  }),
  INTERNAL_SIMPLIFIED_BASELINE: Object.freeze({
    label: 'Internal simplified baseline',
    detail: 'Built-in training range shown as pure 100/0 because no licensed mixed-frequency export is attached.',
    url: 'internal://spotsense/internal-simplified-baseline',
    license: 'Internal',
    assumptions: {
      gameType: 'mixed',
      tableSize: '6max',
      stackDepthBb: 'varies',
      rakeModel: 'not solver verified',
      actionAbstraction: 'binary training baseline'
    },
    qualityTier: 'internal_baseline'
  })
});

export const RANGE_SOURCE_IDS = Object.freeze(Object.keys(RANGE_DATA_SOURCES));
