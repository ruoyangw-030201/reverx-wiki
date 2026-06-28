// Loads and renders Astro content collection entries used by custom index and map pages.
import { getEntry, render } from "astro:content";

export async function getRequiredIndexPageEntry(section) {
  const entry = await getEntry("indexPage", section);

  if (!entry) {
    throw new Error(`Missing index page content for ${section}`);
  }

  return entry;
}

export async function getRequiredWorldMapEntry(mapKey) {
  const entry = await getEntry("worldMap", mapKey);

  if (!entry) {
    throw new Error(`Missing world map content for ${mapKey}`);
  }

  return entry;
}

export function renderContentEntry(entry) {
  return render(entry);
}
