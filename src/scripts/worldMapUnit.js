const WORLD_MAP_MOBILE_QUERY = window.matchMedia("(max-width: 980px)");
const MOBILE_REGION_NAVIGATION_MIN_DELAY_MS = 220;
const MOBILE_REGION_NAVIGATION_LOCK_MS = 700;

function isMobileWorldMap() {
  return WORLD_MAP_MOBILE_QUERY.matches;
}

function setupWorldMapRegionCards() {
  document.querySelectorAll(".world-map-stage").forEach((stage) => {
    if (stage instanceof HTMLElement && stage.dataset.worldMapRegionCardsReady === "true") return;

    const svg = stage.querySelector(".world-map-regions");
    const card = stage.querySelector(".world-map-region-card");
    const cardIcon = stage.querySelector(".world-map-region-card-icon");
    const cardLabel = stage.querySelector(".world-map-region-card-label");
    const cardLabelEn = stage.querySelector(".world-map-region-card-label-en");

    if (!(svg instanceof SVGSVGElement) || !card || !cardIcon || !cardLabel || !cardLabelEn) return;
    if (stage instanceof HTMLElement) stage.dataset.worldMapRegionCardsReady = "true";

    const viewBox = svg.viewBox.baseVal;
    let selectedRegion = null;
    let selectedAt = 0;
    let navigationLockedUntil = 0;
    const regions = Array.from(stage.querySelectorAll(".world-map-region"));
    const regionByKey = new Map(
      regions
        .filter((region) => region.dataset.regionKey)
        .map((region) => [region.dataset.regionKey, region])
    );
    const labelLinks = Array.from(stage.querySelectorAll(".world-map-label.is-city.is-clickable[data-region-key]"));

    function linkedLabels(region) {
      return labelLinks.filter((label) => label.dataset.regionKey === region.dataset.regionKey);
    }

    function setInteractionActive(region, isActive) {
      region.classList.toggle("is-related-active", isActive);
      linkedLabels(region).forEach((label) => label.classList.toggle("is-region-active", isActive));
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
      const centerX = ((hasCardPosition ? cardX : box.x + box.width / 2) / viewBox.width) * 100;
      const centerY = ((hasCardPosition ? cardY : box.y + box.height / 2) / viewBox.height) * 100;

      card.style.setProperty("--card-x", `${centerX}%`);
      card.style.setProperty("--card-y", `${centerY}%`);
      cardIcon.setAttribute("src", icon);
      cardLabel.textContent = label;
      cardLabelEn.textContent = labelEn;
      cardLabelEn.toggleAttribute("hidden", !labelEn);
      card.classList.add("is-visible");
    }

    function hideCard() {
      card.classList.remove("is-visible");
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
      });
      target.addEventListener("pointerleave", () => {
        if (!isMobileWorldMap()) {
          setInteractionActive(region, false);
          hideCard();
        }
      });
      target.addEventListener("focusin", () => {
        if (!isMobileWorldMap()) {
          setInteractionActive(region, true);
          showCard(region);
        }
      });
      target.addEventListener("focusout", () => {
        if (!isMobileWorldMap()) {
          setInteractionActive(region, false);
          hideCard();
        }
      });
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
      });
    }

    regions.forEach((region) => {
      bindRegionInteraction(region, region);
    });

    labelLinks.forEach((label) => {
      const region = regionByKey.get(label.dataset.regionKey);
      if (region) bindRegionInteraction(label, region);
    });

    document.addEventListener("click", (event) => {
      if (!isMobileWorldMap()) return;
      if (event.target instanceof Node && stage.contains(event.target)) return;
      clearMobileSelection();
    });

    window.addEventListener("resize", () => {
      if (!isMobileWorldMap()) clearMobileSelection();
    });
  });
}

setupWorldMapRegionCards();
document.addEventListener("astro:page-load", setupWorldMapRegionCards);
