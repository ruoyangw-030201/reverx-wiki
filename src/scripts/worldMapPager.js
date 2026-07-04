import { pageTimings } from "../data/pageTimings.js";
import { setupTwoPanelPager } from "./twoPanelPager.js";

function setupWorldMapPager() {
  setupTwoPanelPager({
    rootSelector: ".world-map-page",
    targetSelector: ".world-map-cover",
    readyDelayMs: pageTimings.worldMap.pagerReadyDelayMs,
    readyDelayDataset: "worldMapReadyDelayMs",
    disableBelowWidth: 980,
    readyDataset: "worldMapPagerReady",
  });
}

setupWorldMapPager();
document.addEventListener("astro:page-load", setupWorldMapPager);
