const SCROLL_NAVIGATION_LOCK_KEY = "reverx-scroll-navigation-lock-until";

export const SCROLL_NAVIGATION_LOCK_MS = 1600;
export const SCROLL_NAVIGATION_QUIET_MS = 450;

export function setScrollNavigationLock(durationMs = SCROLL_NAVIGATION_LOCK_MS) {
  try {
    const lockUntil = Date.now() + Math.max(0, Number(durationMs) || 0);
    window.sessionStorage.setItem(SCROLL_NAVIGATION_LOCK_KEY, String(lockUntil));
  } catch {
    // Storage can be unavailable in private or restricted contexts.
  }
}

export function isScrollNavigationLocked() {
  try {
    const lockUntil = Number(window.sessionStorage.getItem(SCROLL_NAVIGATION_LOCK_KEY));
    return Number.isFinite(lockUntil) && Date.now() < lockUntil;
  } catch {
    return false;
  }
}
