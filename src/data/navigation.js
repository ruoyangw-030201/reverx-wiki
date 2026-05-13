import { resolveWorldEntity } from "./worldEntities.js";

export const topTabs = [
  {
    key: "world",
    label: "世界观",
    labelEn: "WORLD",
    href: "/world",
  },
  {
    key: "system",
    label: "能力体系",
    labelEn: "SYSTEM",
    href: "/system",
  },
  {
    key: "characters",
    label: "角色档案",
    labelEn: "CHARACTERS",
    href: "/characters",
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
      href: "/system/trace",
      icon: "/icon/chang.png",
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
      icon: "/icon/trace.png",
    },
    {
      label: "恶能武器",
      labelEn: "MALICE WEAPONS",
      href: "/system/weapons",
      icon: "/icon/mergeweapon.png",
    },
    {
      label: "现实的本质——世界库",
      labelEn: "THE REVERX",
      href: "/system/innerworld",
      icon: "/icon/ling.png",
    },
  ],

  characters: [
    {
      label: "西奥多·维杰",
      labelEn: "THEODORE VIJAY",
      href: "/characters/theo",
      icon: "/big-icon/hq.png",
      frameIcon: "/figure/theo.png",
    },
    {
      label: "欧奈特·帕克",
      labelEn: "ORNETTE PARKER II",
      href: "/characters/ornette",
      icon: "/big-icon/hq.png",
      frameIcon: "/figure/op.png",
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
  "/system/trace": [
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
      id: "hybrid-malice-user",
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
      icon: "/icon/nonweapon.png",
    },
    {
      id: "fusion-weapons",
      label: "融合武器",
      labelEn: "Fusion Weapons",
      icon: "/icon/mergeweapon.png",
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
  return (sidebarBySection[section] ?? sidebarBySection.world).map(hydrateNavigationItem);
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
