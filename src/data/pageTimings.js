const HOME_INTRO_OVERLAY_START_DELAY_MS = 2450;
const HOME_INTRO_OVERLAY_DURATION_MS = 1200;
const HOME_INTRO_STEP_BASE_DELAY_MS = 3000;
const HOME_INTRO_STEP_GAP_MS = 1000;
const HOME_INTRO_STEP_DURATION_MS = 900;
const HOME_INTRO_FRAGMENT_START_STEP = 9;
const HOME_INTRO_FRAGMENT_COUNT = 4;
const HOME_INTRO_LAST_FRAGMENT_STEP = HOME_INTRO_FRAGMENT_START_STEP + HOME_INTRO_FRAGMENT_COUNT - 1;
const HOME_INTRO_COMPLETE_DELAY_MS =
  HOME_INTRO_STEP_BASE_DELAY_MS +
  (HOME_INTRO_LAST_FRAGMENT_STEP - 1) * HOME_INTRO_STEP_GAP_MS +
  HOME_INTRO_STEP_DURATION_MS;

export const pageTimings = {
  scroll: {
    lockMs: 1600,
    quietMs: 450,
    smoothSettleMs: 720,
    reducedMotionSettleMs: 120,
  },

  index: {
    enterDurationMs: 520,
    headingDelayMs: 750,
    gridDelayMs: 1500,
    markerDelayMs: 2020,
    markerEnterDurationMs: 360,
    nextPageReadyDelayMs: 2020,
  },

  worldMap: {
    markerReadyDelayMs: 1500,
    markerEnterDurationMs: 360,
    pagerReadyDelayMs: 1500,
  },

  homeIntro: {
    overlayStartDelayMs: HOME_INTRO_OVERLAY_START_DELAY_MS,
    overlayDurationMs: HOME_INTRO_OVERLAY_DURATION_MS,
    paragraphStartDelayMs: HOME_INTRO_STEP_BASE_DELAY_MS,
    paragraphStepMs: HOME_INTRO_STEP_GAP_MS,
    paragraphFadeDurationMs: HOME_INTRO_STEP_DURATION_MS,
    skipIntroRevealDelayMs: HOME_INTRO_STEP_BASE_DELAY_MS,
    skipIntroHideDelayMs: HOME_INTRO_COMPLETE_DELAY_MS,
    nextPageReadyDelayMs: HOME_INTRO_COMPLETE_DELAY_MS,
    headbarRevealDelayMs: HOME_INTRO_COMPLETE_DELAY_MS,
  },

  homeMasterIndex: {
    introDurationMs: 3200,
    clusterTouchNavigateDelayMs: 260,
  },
};
