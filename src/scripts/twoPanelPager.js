import {
  SCROLL_NAVIGATION_LOCK_MS,
  SCROLL_NAVIGATION_QUIET_MS,
  isScrollNavigationLocked,
} from "./scrollNavigationGuard.js";
import { pageTimings } from "../data/pageTimings.js";

const DEFAULT_DISABLE_BELOW_WIDTH = 0;

function isHistoryRestore(event) {
  if (event.persisted) return true;
  const navigation = performance.getEntriesByType?.("navigation")?.[0];
  return navigation?.type === "back_forward";
}

function isDisabledByWidth(disableBelowWidth) {
  return (
    disableBelowWidth > 0 &&
    window.matchMedia(`(max-width: ${disableBelowWidth}px)`).matches
  );
}

export function setupTwoPanelPager({
  rootSelector,
  targetSelector,
  readyDelayMs = 0,
  readyDelayDataset,
  skipReadyDelayClass,
  disableBelowWidth = DEFAULT_DISABLE_BELOW_WIDTH,
  readyDataset = "twoPanelPagerReady",
  nextSelector,
  previousSelector,
  onPageChange,
} = {}) {
  if (!rootSelector || !targetSelector) return;
  if (isDisabledByWidth(disableBelowWidth)) return;

  const root = document.querySelector(rootSelector);
  const targetPanel = document.querySelector(targetSelector);
  if (!(root instanceof HTMLElement) || !(targetPanel instanceof HTMLElement)) return;
  if (root.dataset[readyDataset] === "true") return;
  root.dataset[readyDataset] = "true";

  const resolvedReadyDelayMs = readyDelayDataset
    ? Number(root.dataset[readyDelayDataset]) || readyDelayMs
    : readyDelayMs;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let isPaging = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartedInPager = false;
  let blockedInputUntil = 0;
  let readyAt = Date.now() + getReadyDelayMs();
  let resizeFrame = 0;

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  function hasSkippedReadyDelay() {
    return (
      Boolean(skipReadyDelayClass) &&
      document.documentElement.classList.contains(skipReadyDelayClass)
    );
  }

  function getReadyDelayMs() {
    return hasSkippedReadyDelay() ? 0 : resolvedReadyDelayMs;
  }

  function targetTop() {
    return targetPanel.offsetTop;
  }

  function currentPageIndex() {
    return window.scrollY >= targetTop() / 2 ? 1 : 0;
  }

  function syncPageState() {
    onPageChange?.(currentPageIndex());
  }

  function resetAfterHistoryRestore() {
    isPaging = false;
    touchStartedInPager = false;
    blockedInputUntil = Date.now() + SCROLL_NAVIGATION_LOCK_MS;
    readyAt = Date.now() + getReadyDelayMs();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    syncPageState();
  }

  function pageTo(top) {
    const target = Math.max(0, Math.round(top));
    if (Math.abs(window.scrollY - target) < 2) {
      syncPageState();
      return;
    }

    isPaging = true;
    window.scrollTo({
      top: target,
      left: 0,
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    });

    window.setTimeout(() => {
      isPaging = false;
      syncPageState();
    }, prefersReducedMotion.matches
      ? pageTimings.scroll.reducedMotionSettleMs
      : pageTimings.scroll.smoothSettleMs);
  }

  function snapToNearestPage() {
    const target = currentPageIndex() === 1 ? targetTop() : 0;
    window.scrollTo({ top: target, left: 0, behavior: "auto" });
    syncPageState();
  }

  function isReady() {
    return hasSkippedReadyDelay() || Date.now() >= readyAt;
  }

  function isBaseBlocked() {
    return isScrollNavigationLocked() || !isReady();
  }

  function isQuietBlocked() {
    return Date.now() < blockedInputUntil;
  }

  function extendQuietWindow() {
    blockedInputUntil = Date.now() + SCROLL_NAVIGATION_QUIET_MS;
  }

  function shouldConsumePagerInput() {
    if (isBaseBlocked()) {
      extendQuietWindow();
      return true;
    }

    return isQuietBlocked();
  }

  function pageDown() {
    if (currentPageIndex() === 1) {
      pageTo(targetTop());
      return;
    }

    if (shouldConsumePagerInput()) return;
    pageTo(targetTop());
  }

  function pageUp() {
    if (currentPageIndex() === 0) {
      pageTo(0);
      return;
    }

    if (shouldConsumePagerInput()) return;
    pageTo(0);
  }

  function handleWheel(event) {
    if (isDisabledByWidth(disableBelowWidth)) return;
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    event.preventDefault();

    if (isPaging) return;

    if (event.deltaY > 0) {
      pageDown();
      return;
    }

    if (event.deltaY < 0) {
      pageUp();
    }
  }

  function handleTouchStart(event) {
    if (isDisabledByWidth(disableBelowWidth)) return;
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartedInPager = true;
  }

  function handleTouchMove(event) {
    if (isDisabledByWidth(disableBelowWidth)) return;
    if (!touchStartedInPager) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    if (Math.abs(deltaY) <= Math.abs(deltaX) || Math.abs(deltaY) < 4) return;

    event.preventDefault();
  }

  function handleTouchEnd(event) {
    if (isDisabledByWidth(disableBelowWidth)) return;
    if (!touchStartedInPager || isPaging) return;
    touchStartedInPager = false;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    if (Math.abs(deltaX) > Math.abs(deltaY) || Math.abs(deltaY) < 36) return;

    event.preventDefault();

    if (deltaY < 0) {
      pageDown();
      return;
    }

    if (deltaY > 0) {
      pageUp();
    }
  }

  function handleKeyDown(event) {
    if (isDisabledByWidth(disableBelowWidth)) return;
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

    const downKeys = ["ArrowDown", "PageDown"];
    const upKeys = ["ArrowUp", "PageUp"];

    if (downKeys.includes(event.key)) {
      event.preventDefault();
      pageDown();
      return;
    }

    if (upKeys.includes(event.key)) {
      event.preventDefault();
      pageUp();
    }
  }

  function handleResize() {
    if (isDisabledByWidth(disableBelowWidth)) return;
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(snapToNearestPage);
  }

  function bindPagerButtons(selector, handler) {
    if (!selector) return;
    root.querySelectorAll(selector).forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        if (isPaging) return;
        handler();
      });
    });
  }

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  window.addEventListener("touchmove", handleTouchMove, { passive: false });
  window.addEventListener("touchend", handleTouchEnd, { passive: false });
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", syncPageState, { passive: true });
  window.addEventListener("pageshow", (event) => {
    if (isHistoryRestore(event)) resetAfterHistoryRestore();
  });

  bindPagerButtons(nextSelector, pageDown);
  bindPagerButtons(previousSelector, pageUp);

  if (isHistoryRestore({ persisted: false })) resetAfterHistoryRestore();
  resizeFrame = window.requestAnimationFrame(snapToNearestPage);
}
