import { resolveWorldEntity } from "./worldEntities.js";

export const topTabs = [
  {
    key: "world",
    label: "世界概览",
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
  {
    key: "history",
    label: "历史纪事",
    labelEn: "HISTORY",
    href: "/history",
    number: "04",
  },
];

export const characterGroups = [
  {
    key: "hq",
    label: "总部势力",
    labelEn: "HQ",
    items: [
      {
        label: "西奥多·维杰",
        labelEn: "THEODORE VIJAY",
        href: "/characters/theodore",
        icon: "/big-icon/taran-base.webp",
        indexIcon: "/figure-icon/theodore.png",
        frameIcon: "/figure/theodore.webp",
      },
      {
        label: "欧奈特·帕克",
        labelEn: "ORNETTE PARKER II",
        href: "/characters/ornette",
        icon: "/big-icon/taran-base.webp",
        indexIcon: "/figure-icon/ornette.png",
        frameIcon: "/figure/ornette.webp",
      },
    ],
  },
  {
    key: "prospect",
    label: "希景势力",
    labelEn: "PROSPECT",
    items: [
      {
        label: "桑蒂诺·埃梅特",
        labelEn: "SANTINO EMMETT",
        href: "/characters/santino",
        icon: "/big-icon/prospect.webp",
        indexIcon: "/figure-icon/santino.png",
        frameIcon: "/figure/santino.webp",
      },
      {
        label: "弗雷泽·B.",
        labelEn: "FRASER B.",
        href: "/characters/fraser",
        icon: "/big-icon/prospect.webp",
        indexIcon: "/figure-icon/fraser.png",
        frameIcon: "/figure/fraser.webp",
      },
      {
        label: "奥瑞斯·阿卡纳",
        labelEn: "AUROS ARCANA",
        href: "/characters/auros",
        icon: "/big-icon/prospect.webp",
        indexIcon: "/figure-icon/auros.png",
        frameIcon: "/figure/auros.webp",
        modeSidebarOverrides: {
          spoiler: {
            groupKey: "cabin",
            icon: "/big-icon/cabin.webp",
          },
        },
      },
    ],
  },
  {
    key: "cabin",
    label: "小屋势力",
    labelEn: "CABIN",
    items: [
      {
        label: "格雷·阿卡纳",
        labelEn: "GREY ARCANA",
        href: "/characters/grey",
        icon: "/big-icon/cabin.webp",
        indexIcon: "/figure-icon/grey.png",
        frameIcon: "/figure/grey.webp",
      },
      {
        label: "切泽·伯恩",
        labelEn: "CHISSEL BYRNE",
        href: "/characters/chissel",
        icon: "/big-icon/cabin.webp",
        indexIcon: "/figure-icon/chissel.png",
        frameIcon: "/figure/chissel.webp",
      },
      {
        label: "兰桑·洛里",
        labelEn: "LINCENT LORRIS",
        href: "/characters/lincent",
        icon: "/big-icon/cabin.webp",
        indexIcon: "/figure-icon/lincent.png",
        frameIcon: "/figure/lincent.webp",
      },
      {
        label: "伊莱贾·帕克",
        labelEn: "ELIJAH PARKER",
        href: "/characters/elijah",
        icon: "/big-icon/5thstreet.webp",
        indexIcon: "/figure-icon/elijah.png",
        frameIcon: "/figure/elijah.webp",
      },
    ],
  },
  {
    key: "other-ferdona",
    label: "其他凡多纳势力",
    labelEn: "OTHERS IN FERDONA",
    items: [
      {
        label: "安多尔·帕沙其",
        labelEn: "ANDOR PSAKI",
        href: "/characters/andor",
        icon: "/big-icon/museum.webp",
        indexIcon: "/figure-icon/andor.png",
        frameIcon: "/figure/andor.webp",
      },
      {
        label: "阿什利·柯林",
        labelEn: "ASHLEY COLLIN",
        href: "/characters/ashley",
        icon: "/big-icon/museum.webp",
        indexIcon: "/figure-icon/ashley.png",
        frameIcon: "/figure/ashley.webp",
      },
    ],
  },
  {
    key: "hespera",
    label: "海西势力",
    labelEn: "HESPERA",
    items: [
      {
        label: "利亚德·帕克",
        labelEn: "LIAT PARKER",
        href: "/characters/liat",
        icon: "/big-icon/triatine.webp",
        indexIcon: "/figure-icon/liat.png",
        frameIcon: "/figure/liat.webp",
      },
      {
        label: "乔纳森·卡齐尔",
        labelEn: "JONATHAN KATZIR",
        href: "/characters/jonathan",
        icon: "/big-icon/triatine.webp",
        indexIcon: "/figure-icon/jonathan.png",
        frameIcon: "/figure/jonathan.webp",
      },
    ],
  },
  {
    key: "malit-other",
    label: "魔物与其他",
    labelEn: "MALIT & OTHERS",
    items: [],
  },
];

const characterSidebarItems = characterGroups.flatMap((group) => [
  {
    type: "group",
    key: group.key,
    label: group.label,
    labelEn: group.labelEn,
  },
  ...group.items,
]);

export const historyGroups = [];

const historySidebarItems = historyGroups.flatMap((group) => [
  {
    type: "group",
    key: group.key,
    label: group.label,
    labelEn: group.labelEn,
    href: group.href,
  },
  ...(group.items ?? []),
]);

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
      entityKey: "teccasino",
    },
    {
      entityKey: "blueprint",
    },
    {
      entityKey: "museum",
    },
    {
      entityKey: "convention",
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
      key: "other",
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
      label: "现代谱系分类法",
      labelEn: "Modern Spectrum Classification",
      href: "/system/classification",
      icon: "/icon/indigenous.png",
    },
    {
      label: "强度",
      labelEn: "Intensity",
      href: "/system/intensity",
      icon: "/icon/danger.png",
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

  characters: characterSidebarItems,

  history: historySidebarItems,
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
      id: "sarra-base",
      entityKey: "sarra",
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
      id: "5thstreet",
      entityKey: "5thstreet",
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
      icon: "/icon/malit.png",
    },
    {
      id: "hybrid-malicer",
      label: "混血恶能者",
      labelEn: "Hybrid Malicer",
      icon: "/icon/hybrid.png",
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

function expandNavigationItems(items) {
  return items.map(hydrateNavigationItem);
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

  if (path === "/history" || path.startsWith("/history/")) {
    return "history";
  }

  return "world";
}

export function getSidebarItemsForPath(path) {
  const section = getSectionFromPath(path);
  return expandNavigationItems(sidebarBySection[section] ?? sidebarBySection.world);
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
