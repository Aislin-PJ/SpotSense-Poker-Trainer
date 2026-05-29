/*
  Preflop ad integration configuration.

  Provider: Google Publisher Tag web interstitial.
  Source: https://developers.google.com/publisher-tag/samples/display-web-interstitial-ad

  Keep enabled=false until Google Ad Manager has approved the site and you have
  created a web interstitial ad unit. Then set gptAdUnitPath to your GAM path,
  for example "/1234567/preflop/web_interstitial".
*/
window.PREFLOP_AD_CONFIG = {
    provider: 'google-publisher-tag',
    enabled: false,
    gptAdUnitPath: '',
    enableHouseAdFallback: false
};
