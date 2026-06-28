// Builds the archive-page view context from the current route and navigation data.
import { getCharacterGalleryImages } from "../characters/galleries.js";
import {
  findNavigationItemByPath,
  getArchivePageNextLinkForPath,
  getSectionFromPath,
  getSidebarAnchorsForPath,
  topTabs,
} from "../navigation.js";

export function getArchiveEntryContext(pathname, props = {}) {
  const currentPath = pathname.replace(/\/$/, "") || "/";
  const currentSection = getSectionFromPath(currentPath);
  const navigationItem = findNavigationItemByPath(currentPath);
  const sectionTab = topTabs.find((tab) => tab.key === currentSection);
  const sectionKicker =
    currentSection === "characters" ? "FILES" : sectionTab?.labelEn ?? currentSection.toUpperCase();
  const frameTitle = props.title ?? navigationItem?.label ?? "Archive Entry";
  const frameSubtitle = props.subtitle ?? navigationItem?.labelEn ?? "introduction";
  const hasPageModeSwitch = currentSection === "characters" && currentPath !== "/characters";
  const pageModeSwitchCurrent = hasPageModeSwitch
    ? { label: "设定年份：2031年", mode: "normal" }
    : undefined;
  const pageModeSwitchOptions = hasPageModeSwitch
    ? [
        { label: "设定年份：2031年", mode: "normal" },
        { label: "设定年份：2039年", mode: "spoiler" },
      ]
    : undefined;
  const contentFrameIcon =
    currentSection === "characters"
      ? navigationItem?.frameIcon
      : currentSection === "world" || currentSection === "system"
        ? navigationItem?.icon
        : undefined;
  const contentFrameIconCaption = currentSection === "system" ? navigationItem?.label : undefined;
  const contentFrameIconDisplay = currentSection === "characters" ? "figure" : "default";
  const nextPageLink = getArchivePageNextLinkForPath(currentPath);
  const secondarySections = getSidebarAnchorsForPath(currentPath);
  const secondarySectionsById = Object.fromEntries(
    secondarySections
      .filter((section) => section?.id)
      .map((section) => [section.id, section])
  );
  const characterGalleryImages =
    currentSection === "characters" && navigationItem?.frameIcon
      ? getCharacterGalleryImages(navigationItem)
      : [];
  const characterGallerySlug = (
    navigationItem?.galleryRef
    ?? currentPath.split("/").filter(Boolean).at(-1)
    ?? "character"
  ).replace(/[^a-z0-9_-]/gi, "-");
  const characterGalleryId = characterGalleryImages.length > 0
    ? `character-gallery-${characterGallerySlug}`
    : undefined;

  return {
    currentPath,
    currentSection,
    navigationItem,
    sectionKicker,
    frameTitle,
    frameSubtitle,
    hasPageModeSwitch,
    pageModeSwitchCurrent,
    pageModeSwitchOptions,
    contentFrameIcon,
    contentFrameIconCaption,
    contentFrameIconDisplay,
    nextPageLink,
    secondarySections,
    secondarySectionsById,
    characterGalleryImages,
    characterGalleryId,
    characterGalleryLabel: `${frameTitle} image gallery`,
  };
}
