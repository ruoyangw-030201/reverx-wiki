import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  characterGalleryCaptions,
  defaultFigureGalleryCaption,
} from "./characterGalleryCaptions.js";

const cgRootPath = join(process.cwd(), "public", "cg");
const imageExtensionPattern = /\.(avif|gif|jpe?g|png|webp)$/i;
const webpExtensionPattern = /\.webp$/i;

function getCharacterSlug(href) {
  if (typeof href !== "string") return undefined;

  const [path] = href.split("#");
  const segments = path.split("/").filter(Boolean);
  return segments.at(-1);
}

function encodePublicPath(...segments) {
  return `/${segments.map((segment) => encodeURIComponent(segment)).join("/")}`;
}

function getPublicFileName(src) {
  if (typeof src !== "string") return "";

  const [path] = src.split("#");
  const [pathWithoutQuery] = path.split("?");
  const fileName = pathWithoutQuery.split("/").filter(Boolean).at(-1) ?? "";

  try {
    return decodeURIComponent(fileName);
  } catch {
    return fileName;
  }
}

function getImageCaption(galleryRef, fileName) {
  if (!galleryRef || !fileName) return "";

  const captions = characterGalleryCaptions[galleryRef];
  if (!captions) return "";

  if (captions[fileName]) return captions[fileName];

  const stem = getImageStem(fileName);
  const fallbackEntry = Object.entries(captions).find(([captionFileName]) => (
    getImageStem(captionFileName) === stem
  ));

  return fallbackEntry?.[1] ?? "";
}

function getImageStem(fileName) {
  return fileName.replace(/\.[^.]+$/, "");
}

function getPreferredGalleryImage(group) {
  const sortedFiles = [...group].sort((a, b) => (
    a.localeCompare(b, "en", { numeric: true, sensitivity: "base" })
  ));
  const webpFile = sortedFiles.find((fileName) => webpExtensionPattern.test(fileName));
  const sourceFileName = webpFile ?? sortedFiles[0];
  const captionFileName = sortedFiles.find((fileName) => !webpExtensionPattern.test(fileName)) ?? sourceFileName;

  return { sourceFileName, captionFileName };
}

function withCaption(image, caption) {
  if (!image) return undefined;

  return {
    ...image,
    caption: typeof image.caption === "string" ? image.caption : caption,
  };
}

function normalizeGalleryImage(image, fallbackAlt = "") {
  if (typeof image === "string") {
    return { src: image, alt: fallbackAlt };
  }

  if (!image || typeof image.src !== "string") return undefined;

  return {
    ...image,
    alt: image.alt ?? fallbackAlt,
  };
}

function readCgImages(galleryRef, fallbackAlt) {
  if (!galleryRef) return [];

  const galleryPath = join(cgRootPath, galleryRef);
  if (!existsSync(galleryPath)) return [];

  const groupedFiles = readdirSync(galleryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && imageExtensionPattern.test(entry.name))
    .map((entry) => entry.name)
    .reduce((groups, fileName) => {
      const stem = getImageStem(fileName).toLocaleLowerCase("en");
      const group = groups.get(stem) ?? [];
      group.push(fileName);
      groups.set(stem, group);
      return groups;
    }, new Map());

  return Array.from(groupedFiles.values())
    .map(getPreferredGalleryImage)
    .sort((a, b) => (
      a.sourceFileName.localeCompare(b.sourceFileName, "en", { numeric: true, sensitivity: "base" })
    ))
    .map(({ sourceFileName, captionFileName }) => ({
      src: encodePublicPath("cg", galleryRef, sourceFileName),
      alt: fallbackAlt,
      caption: getImageCaption(galleryRef, captionFileName),
    }));
}

function uniqueImages(images) {
  const seen = new Set();

  return images.filter((image) => {
    if (!image?.src || seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  });
}

export function getCharacterGalleryImages(navigationItem) {
  const fallbackAlt = navigationItem?.label ?? navigationItem?.labelEn ?? "";
  const figureImage = withCaption(
    normalizeGalleryImage(navigationItem?.frameIcon, fallbackAlt),
    defaultFigureGalleryCaption,
  );
  const galleryRef = navigationItem?.galleryRef ?? getCharacterSlug(navigationItem?.href);
  const configuredImages = Array.isArray(navigationItem?.galleryImages)
    ? navigationItem.galleryImages
        .map((image) => {
          const normalizedImage = normalizeGalleryImage(image, fallbackAlt);
          const fileName = getPublicFileName(normalizedImage?.src);

          return withCaption(
            normalizedImage,
            getImageCaption(galleryRef, fileName),
          );
        })
        .filter(Boolean)
    : readCgImages(galleryRef, fallbackAlt);

  return uniqueImages([
    figureImage,
    ...configuredImages,
  ].filter(Boolean));
}
