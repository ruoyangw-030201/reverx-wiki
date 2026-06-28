const WORLD_MAP_MOBILE_QUERY = window.matchMedia("(max-width: 980px)");
const MOBILE_REGION_NAVIGATION_MIN_DELAY_MS = 220;
const MOBILE_REGION_NAVIGATION_LOCK_MS = 700;

function isMobileWorldMap() {
  return WORLD_MAP_MOBILE_QUERY.matches;
}

function coordinateFromData(element, key) {
  const rawValue = element.dataset[key];
  if (rawValue === undefined || rawValue === "") return null;

  const value = Number(rawValue);
  return Number.isFinite(value) ? value : null;
}

function setLabelCoordinate(label, axis, value) {
  if (value === null) return;
  label.setAttribute(axis, String(value));
}

function applyResponsiveLabelPositions(panel) {
  const isMobile = isMobileWorldMap();

  panel.querySelectorAll(".world-map-responsive-label").forEach((label) => {
    const desktopX = coordinateFromData(label, "desktopX");
    const desktopY = coordinateFromData(label, "desktopY");
    const mobileX = coordinateFromData(label, "mobileX");
    const mobileY = coordinateFromData(label, "mobileY");

    setLabelCoordinate(label, "x", isMobile && mobileX !== null ? mobileX : desktopX);
    setLabelCoordinate(label, "y", isMobile && mobileY !== null ? mobileY : desktopY);
  });
}

function buildLabelsByRegionKey(labelLinks) {
  const labelsByRegionKey = new Map();

  labelLinks.forEach((label) => {
    const key = label.dataset.regionKey;
    if (!key) return;

    const labels = labelsByRegionKey.get(key) ?? [];
    labels.push(label);
    labelsByRegionKey.set(key, labels);
  });

  return labelsByRegionKey;
}

function setupWorldMapRegionCards() {
  document.querySelectorAll(".world-map-panel").forEach((panel) => {
    if (panel instanceof HTMLElement && panel.dataset.worldMapRegionCardsReady === "true") return;

    const svg = panel.querySelector(".world-map-canvas");
    const cardFrame = panel.querySelector(".world-map-region-card-foreign");
    const card = panel.querySelector(".region-card");
    const cardIcon = panel.querySelector(".region-card__icon");
    const cardLabel = panel.querySelector(".region-card__label");
    const cardLabelEn = panel.querySelector(".region-card__label-en");

    if (!(svg instanceof SVGSVGElement) || !(cardFrame instanceof SVGElement) || !card || !cardIcon || !cardLabel || !cardLabelEn) return;
    if (panel instanceof HTMLElement) panel.dataset.worldMapRegionCardsReady = "true";

    const controller = new AbortController();
    const { signal } = controller;
    const viewBox = svg.viewBox.baseVal;
    let selectedRegion = null;
    let selectedAt = 0;
    let navigationLockedUntil = 0;
    const regions = Array.from(panel.querySelectorAll(".world-map-region"));
    const regionByKey = new Map(
      regions
        .filter((region) => region.dataset.regionKey)
        .map((region) => [region.dataset.regionKey, region])
    );
    const labelLinks = Array.from(panel.querySelectorAll(".world-map-city-link[data-region-key]"));
    const labelsByRegionKey = buildLabelsByRegionKey(labelLinks);

    function linkedLabels(region) {
      return labelsByRegionKey.get(region.dataset.regionKey) ?? [];
    }

    function setInteractionActive(region, isActive) {
      region.classList.toggle("is-related-active", isActive);
      linkedLabels(region).forEach((label) => label.classList.toggle("is-region-active", isActive));
    }

    function isRegionInteractionTarget(target) {
      return target instanceof Element
        && Boolean(target.closest(".world-map-region, .world-map-city-link"));
    }

    function showCard(region) {
      const shape = region.querySelector(".world-map-region-shape");
      const label = region.dataset.regionLabel ?? "";
      const labelEn = region.dataset.regionLabelEn ?? "";
      const icon = region.dataset.regionIcon ?? "/icon/document.png";

      if (!(shape instanceof SVGGraphicsElement) || !label) return;

      const box = shape.getBBox();
      const cardX = Number(region.dataset.cardX);
      const cardY = Number(region.dataset.cardY);
      const hasCardPosition = region.dataset.cardX !== undefined
        && region.dataset.cardY !== undefined
        && Number.isFinite(cardX)
        && Number.isFinite(cardY);
      const centerX = hasCardPosition ? cardX : box.x + box.width / 2;
      const centerY = hasCardPosition ? cardY : box.y + box.height / 2;
      const frameWidth = Number(cardFrame.getAttribute("width")) || 320;
      const frameHeight = Number(cardFrame.getAttribute("height")) || 92;
      const frameGap = 18;
      const frameX = Math.max(0, Math.min(viewBox.width - frameWidth, centerX - frameWidth / 2));
      const frameY = Math.max(0, Math.min(viewBox.height - frameHeight, centerY - frameHeight - frameGap));

      cardFrame.setAttribute("x", String(frameX));
      cardFrame.setAttribute("y", String(frameY));
      cardIcon.setAttribute("src", icon);
      cardLabel.textContent = label;
      cardLabelEn.textContent = labelEn;
      cardLabelEn.toggleAttribute("hidden", !labelEn);
      cardFrame.classList.add("is-visible");
    }

    function hideCard() {
      cardFrame.classList.remove("is-visible");
    }

    function clearMobileSelection() {
      if (selectedRegion) {
        selectedRegion.classList.remove("is-selected");
        setInteractionActive(selectedRegion, false);
      }
      selectedRegion = null;
      selectedAt = 0;
      hideCard();
    }

    function selectMobileRegion(region) {
      if (selectedRegion) {
        selectedRegion.classList.remove("is-selected");
        setInteractionActive(selectedRegion, false);
      }
      selectedRegion = region;
      selectedAt = Date.now();
      region.classList.add("is-selected");
      setInteractionActive(region, true);
      showCard(region);
    }

    function bindRegionInteraction(target, region) {
      target.addEventListener("pointerenter", () => {
        if (!isMobileWorldMap()) {
          setInteractionActive(region, true);
          showCard(region);
        }
      }, { signal });
      target.addEventListener("pointerleave", () => {
        if (!isMobileWorldMap()) {
          setInteractionActive(region, false);
          hideCard();
        }
      }, { signal });
      target.addEventListener("focusin", () => {
        if (!isMobileWorldMap()) {
          setInteractionActive(region, true);
          showCard(region);
        }
      }, { signal });
      target.addEventListener("focusout", () => {
        if (!isMobileWorldMap()) {
          setInteractionActive(region, false);
          hideCard();
        }
      }, { signal });
      target.addEventListener("click", (event) => {
        if (!isMobileWorldMap()) return;

        event.preventDefault();
        event.stopPropagation();

        const now = Date.now();
        const href = region.getAttribute("href");

        if (selectedRegion === region) {
          if (
            href &&
            now - selectedAt >= MOBILE_REGION_NAVIGATION_MIN_DELAY_MS &&
            now >= navigationLockedUntil
          ) {
            navigationLockedUntil = now + MOBILE_REGION_NAVIGATION_LOCK_MS;
            window.location.assign(href);
          }
          return;
        }

        selectMobileRegion(region);
      }, { signal });
    }

    regions.forEach((region) => {
      bindRegionInteraction(region, region);
    });

    labelLinks.forEach((label) => {
      const region = regionByKey.get(label.dataset.regionKey);
      if (region) bindRegionInteraction(label, region);
    });

    function handleViewportModeChange() {
      applyResponsiveLabelPositions(panel);
      if (!isMobileWorldMap()) clearMobileSelection();
    }

    applyResponsiveLabelPositions(panel);

    panel.addEventListener("click", (event) => {
      if (!isMobileWorldMap()) return;
      if (isRegionInteractionTarget(event.target)) return;
      clearMobileSelection();
    }, { signal });

    document.addEventListener("click", (event) => {
      if (!isMobileWorldMap()) return;
      if (event.target instanceof Node && panel.contains(event.target)) return;
      clearMobileSelection();
    }, { signal });
    window.addEventListener("resize", handleViewportModeChange, { signal });
    WORLD_MAP_MOBILE_QUERY.addEventListener("change", handleViewportModeChange, { signal });
    document.addEventListener("astro:before-swap", () => controller.abort(), { once: true, signal });
  });
}

setupWorldMapRegionCards();
document.addEventListener("astro:page-load", setupWorldMapRegionCards);
