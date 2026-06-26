import {
  SCROLL_NAVIGATION_LOCK_MS,
  SCROLL_NAVIGATION_QUIET_MS,
  isScrollNavigationLocked,
} from "./scrollNavigationGuard.js";

const WORLD_MAP_READY_DELAY_MS_FALLBACK = 1500;
const WORLD_MAP_MOBILE_QUERY = window.matchMedia("(max-width: 980px)");

function isMobileWorldMap() {
  return WORLD_MAP_MOBILE_QUERY.matches;
}

function setupWorldMapPager() {
  if (isMobileWorldMap()) return;

  const page = document.querySelector(".world-map-page");
  const mapCover = document.querySelector(".world-map-cover");
  if (!page || !(mapCover instanceof HTMLElement)) return;
  if (page instanceof HTMLElement && page.dataset.worldMapPagerReady === "true") return;
  if (page instanceof HTMLElement) page.dataset.worldMapPagerReady = "true";

  const readyDelayMs = Number(page.dataset.worldMapReadyDelayMs) || WORLD_MAP_READY_DELAY_MS_FALLBACK;
  let isPaging = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartedInPager = false;
  let blockedInputUntil = 0;
  let readyAt = Date.now() + readyDelayMs;
  let resizeFrame = 0;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  function mapTop() {
    return mapCover.offsetTop;
  }

  function currentPageIndex() {
    return window.scrollY >= mapTop() / 2 ? 1 : 0;
  }

  function isHistoryRestore(event) {
    if (event.persisted) return true;
    const navigation = performance.getEntriesByType?.("navigation")?.[0];
    return navigation?.type === "back_forward";
  }

  function resetAfterHistoryRestore() {
    isPaging = false;
    touchStartedInPager = false;
    blockedInputUntil = Date.now() + SCROLL_NAVIGATION_LOCK_MS;
    readyAt = Date.now() + readyDelayMs;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }

  function pageTo(top) {
    const target = Math.max(0, Math.round(top));
    if (Math.abs(window.scrollY - target) < 2) return;

    isPaging = true;
    window.scrollTo({
      top: target,
      left: 0,
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    });

    window.setTimeout(() => {
      isPaging = false;
    }, prefersReducedMotion.matches ? 120 : 720);
  }

  function snapToNearestPage() {
    const target = currentPageIndex() === 1 ? mapTop() : 0;
    window.scrollTo({ top: target, left: 0, behavior: "auto" });
  }

  function isReady() {
    return Date.now() >= readyAt;
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
      pageTo(mapTop());
      return;
    }

    if (shouldConsumePagerInput()) return;
    pageTo(mapTop());
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
    if (isMobileWorldMap()) return;
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
    if (isMobileWorldMap()) return;
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartedInPager = true;
  }

  function handleTouchMove(event) {
    if (isMobileWorldMap()) return;
    if (!touchStartedInPager) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    if (Math.abs(deltaY) <= Math.abs(deltaX) || Math.abs(deltaY) < 4) return;

    event.preventDefault();
  }

  function handleTouchEnd(event) {
    if (isMobileWorldMap()) return;
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
    if (isMobileWorldMap()) return;
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
    if (isMobileWorldMap()) return;
    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(snapToNearestPage);
  }

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  window.addEventListener("touchmove", handleTouchMove, { passive: false });
  window.addEventListener("touchend", handleTouchEnd, { passive: false });
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("resize", handleResize);
  window.addEventListener("pageshow", (event) => {
    if (isHistoryRestore(event)) resetAfterHistoryRestore();
  });

  if (isHistoryRestore({ persisted: false })) resetAfterHistoryRestore();
  resizeFrame = window.requestAnimationFrame(snapToNearestPage);
}

setupWorldMapPager();
document.addEventListener("astro:page-load", setupWorldMapPager);
