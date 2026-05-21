import { resolveWorldEntity } from "./worldEntities.js";

export const topTabs = [
  {
    key: "world",
    label: "世界观",
    labelEn: "WORLD",
    href: "/world",
    number: "01",
  },
  {
    key: "system",
    label: "能力体系",
    labelEn: "SYSTEM",
    href: "/system",
    number: "02",
  },
  {
    key: "characters",
    label: "角色档案",
    labelEn: "CHARACTERS",
    href: "/characters",
    number: "03",
  },
];

export const sidebarBySection = {
  world: [
    {
      type: "group",
      entityKey: "ferdona",
    },
    {
      entityKey: "hq",
    },
    {
      entityKey: "prospect",
    },
    {
      entityKey: "cabin",
    },
    {
      entityKey: "blueprint",
    },
    {
      entityKey: "teccasino",
    },

    {
      type: "group",
      entityKey: "hespera",
    },
    {
      entityKey: "tibernan",
    },
    {
      entityKey: "triatine",
    },

    {
      type: "group",
      label: "其他势力",
    },
    {
      entityKey: "umbral",
    },
  ],

  system: [
    {
      label: "次维度",
      labelEn: "HYPODIMENSION",
      href: "/system/hypodimension",
      icon: "/icon/hypodimension.png",
    },
    {
      label: "痕迹，“灵”与“场”",
      labelEn: "VESTIGE, LUMIRA, FIELD",
      href: "/system/vestige-lumira-field",
      icon: "/icon/field.png",
    },
    {
      label: "魔物",
      labelEn: "MALIT",
      href: "/system/malit",
      icon: "/icon/malit.png",
    },
    {
      label: "恶能",
      labelEn: "MALICE",
      href: "/system/malice",
      icon: "/icon/vestige.png",
    },
    {
      label: "恶能武器",
      labelEn: "MALICE WEAPONS",
      href: "/system/weapons",
      icon: "/icon/fusion-weapon.png",
    },
    {
      label: "现实的本质——世界库",
      labelEn: "THE REVERX",
      href: "/system/innerworld",
      icon: "/icon/lumira.png",
    },
  ],

  characters: [
    {
      type: "characterGroup",
      key: "hq",
      label: "总部势力",
      labelEn: "HQ",
      icon: "/big-icon/hq.webp",
      items: [
        {
          label: "西奥多·维杰",
          labelEn: "THEODORE VIJAY",
          href: "/characters/theodore",
          icon: "/big-icon/hq.webp",
          frameIcon: "/figure/theodore.webp",
        },
        {
          label: "欧奈特·帕克",
          labelEn: "ORNETTE PARKER II",
          href: "/characters/ornette",
          icon: "/big-icon/hq.webp",
          frameIcon: "/figure/ornette.webp",
        },
      ],
    },
    {
      type: "characterGroup",
      key: "prospect",
      label: "希景势力",
      labelEn: "PROSPECT",
      icon: "/big-icon/prospect.webp",
      items: [
        {
          label: "桑蒂诺·埃梅特",
          labelEn: "SANTINO EMMETT",
          href: "/characters/santino",
          icon: "/big-icon/prospect.webp",
          frameIcon: "/figure/santino.webp",
        },
        {
          label: "弗雷泽·B.",
          labelEn: "Fraser B.",
          href: "/characters/fraser",
          icon: "/big-icon/prospect.webp",
          frameIcon: "/figure/fraser.webp",
        },
      ],
    },
    {
      type: "characterGroup",
      key: "triatine",
      label: "特律庭",
      labelEn: "TRIATINE",
      icon: "/big-icon/triatine.webp",
      items: [
        {
          label: "利亚德·帕克",
          labelEn: "LIAT PARKER",
          href: "/characters/liat",
          icon: "/big-icon/triatine.webp",
          frameIcon: "/figure/liat.webp",
        },
        {
          label: "乔纳森·卡齐尔",
          labelEn: "JONATHAN KATZIR",
          href: "/characters/jonathan",
          icon: "/big-icon/triatine.webp",
          frameIcon: "/figure/jonathan.webp",
        },
      ],
    },
  ],
};

export const sidebarAnchorsByPath = {
  "/world/ferdona/hq": [
    {
      id: "shalom-base",
      entityKey: "shalom",
    },
    {
      id: "rattown-base",
      entityKey: "rattown",
    },
    {
      id: "taran-base",
      entityKey: "taran",
    },
    {
      id: "contech",
      entityKey: "contech",
    },
    {
      id: "ida",
      entityKey: "ida",
    },
  ],
  "/world/ferdona/cabin": [
    {
      id: "pathera",
      entityKey: "pathera",
    },
  ],
  "/world/hespera/tibernan": [
    {
      id: "celespian",
      entityKey: "celespian",
    },
  ],
  "/world/hespera/triatine": [
    {
      id: "qenevian",
      entityKey: "qenevian",
    },
  ],
  "/system/vestige-lumira-field": [
    {
      id: "founders-plan",
      label: "“创立者们”与开洞计划",
      labelEn: "Founders Plan",
      icon: "/icon/record.png",
    },
  ],
  "/system/malit": [
    {
      id: "malit-possession",
      label: "魔物附着",
      labelEn: "Malit Possession",
      icon: "/icon/document.png",
    },
    {
      id: "hybrid-malicer",
      label: "混血恶能者",
      labelEn: "Hybrid Malicer",
      icon: "/icon/document.png",
    },
  ],
  "/system/malice": [
    {
      id: "modern-lineage-classification",
      label: "现代谱系分类法",
      labelEn: "Modern Spectrum Classification",
      icon: "/icon/indigenous.png",
    },
    {
      id: "intensity",
      label: "强度",
      labelEn: "Intensity",
      icon: "/icon/danger.png",
    },
  ],
  "/system/weapons": [
    {
      id: "non-fusion-weapons",
      label: "非融合武器",
      labelEn: "Non-Fusion Weapons",
      icon: "/icon/non-fusion-weapon.png",
    },
    {
      id: "fusion-weapons",
      label: "融合武器",
      labelEn: "Fusion Weapons",
      icon: "/icon/fusion-weapon.png",
    },
  ],
};

function hydrateNavigationItem(item) {
  if (!item.entityKey) return item;
  return {
    ...resolveWorldEntity(item.entityKey),
    ...item,
  };
}

function expandNavigationItems(items, { includeCharacterGroupDividers = false } = {}) {
  const expandedItems = [];

  items.forEach((item, index) => {
    if (item?.type !== "characterGroup") {
      expandedItems.push(hydrateNavigationItem(item));
      return;
    }

    if (includeCharacterGroupDividers && expandedItems.length > 0) {
      expandedItems.push({
        type: "divider",
        key: `character-group-divider-${item.key ?? index}`,
        label: item.label,
      });
    }

    (item.items ?? []).forEach((child) => {
      expandedItems.push({
        ...hydrateNavigationItem(child),
        groupKey: item.key,
        groupLabel: item.label,
        groupLabelEn: item.labelEn,
        groupIcon: item.icon,
      });
    });
  });

  return expandedItems;
}

export function normalizeNavigationHref(href) {
  if (!href) return "";
  const [path] = href.split("#");
  return path.replace(/\/$/, "") || "/";
}

export function getSectionFromPath(path) {
  if (path === "/system" || path.startsWith("/system/")) {
    return "system";
  }

  if (path === "/characters" || path.startsWith("/characters/")) {
    return "characters";
  }

  return "world";
}

export function getSidebarItemsForPath(path) {
  const section = getSectionFromPath(path);
  return expandNavigationItems(sidebarBySection[section] ?? sidebarBySection.world, {
    includeCharacterGroupDividers: section === "characters",
  });
}

export function getSidebarAnchorsForPath(path) {
  const normalizedPath = normalizeNavigationHref(path);
  return (sidebarAnchorsByPath[normalizedPath] ?? []).map(hydrateNavigationItem);
}

export function findNavigationItemByPath(path) {
  if (path === "/") {
    return topTabs.find((tab) => normalizeNavigationHref(tab.href) === "/world");
  }

  const section = getSectionFromPath(path);
  const sidebarMatch = getSidebarItemsForPath(path).find(
    (item) => normalizeNavigationHref(item.href) === path
  );

  if (sidebarMatch) return sidebarMatch;

  return topTabs.find((tab) => normalizeNavigationHref(tab.href) === path);
}

export function getNextTopTabForPath(path) {
  const normalizedPath = normalizeNavigationHref(path);
  const currentSection = getSectionFromPath(normalizedPath);
  const currentIndex = topTabs.findIndex((tab) => tab.key === currentSection);

  if (currentIndex < 0) return null;

  return topTabs[(currentIndex + 1) % topTabs.length] ?? null;
}

export function getArchivePageSequence() {
  const pages = [{ href: "/" }];
  const seen = new Set(["/"]);

  function addPage(item) {
    const href = normalizeNavigationHref(item?.href);
    if (!href || seen.has(href)) return;

    seen.add(href);
    pages.push({
      ...item,
      href,
    });
  }

  topTabs.forEach((tab) => {
    addPage(tab);

    expandNavigationItems(sidebarBySection[tab.key] ?? []).forEach((item) => {
      addPage(item);
    });
  });

  return pages;
}

export function getNextArchivePageForPath(path) {
  const normalizedPath = normalizeNavigationHref(path);
  const pages = getArchivePageSequence();
  const currentIndex = pages.findIndex((page) => page.href === normalizedPath);

  if (currentIndex < 0) return null;

  const nextPage = pages[currentIndex + 1];
  if (nextPage) return nextPage;

  const currentSection = getSectionFromPath(normalizedPath);
  const sectionTab = topTabs.find((tab) => tab.key === currentSection);

  return sectionTab
    ? {
        ...sectionTab,
        href: normalizeNavigationHref(sectionTab.href),
      }
    : null;
}

export function getArchivePageNextLinkForPath(path) {
  const normalizedPath = normalizeNavigationHref(path);
  const pages = getArchivePageSequence();
  const currentIndex = pages.findIndex((page) => page.href === normalizedPath);

  if (currentIndex < 0) return null;

  const nextPage = getNextArchivePageForPath(normalizedPath);
  if (!nextPage) return null;

  return {
    href: nextPage.href,
    label: nextPage.label ?? nextPage.labelEn ?? nextPage.href,
    action: currentIndex === pages.length - 1 ? "回到" : "进入",
  };
}
