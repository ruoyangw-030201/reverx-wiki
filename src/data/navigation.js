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
      label: "凡多纳",
      href: "/world/ferdona",
    },
    {
      label: "恶能者总部",
      href: "/world/ferdona/hq",
      icon: "/big-icon/hq.png",
      depth: 1,
    },
    {
      label: "希景公司",
      href: "/world/ferdona/prospect",
      icon: "/big-icon/prospect.png",
      depth: 1,
    },
    {
      label: "福尔瑙伊州小屋",
      href: "/world/ferdona/cabin",
      icon: "/big-icon/cabin.png",
      depth: 1,
    },
    {
      label: "蓝图",
      href: "/world/ferdona/blueprint",
      icon: "/big-icon/blueprint.png",
      depth: 1,
    },
    {
      label: "忒卡西诺城",
      href: "/world/ferdona/teccasino",
      icon: "/big-icon/teccasino.png",
      depth: 1,
    },

    {
      type: "group",
      label: "海西",
      href: "/world/hespera",
    },
    {
      label: "缇柏南城·主教廷",
      href: "/world/hespera/tibernan",
      icon: "/big-icon/tibernan.png",
      depth: 1,
    },
    {
      label: "特律庭",
      href: "/world/hespera/triatine",
      icon: "/big-icon/triatine.png",
      depth: 1,
    },

    {
      type: "group",
      label: "其他势力",
    },
    {
      label: "暗影会",
      href: "/world/umbral",
      icon: "/big-icon/umbral.png",
      depth: 1,
    },
  ],

  system: [
    {
      label: "次维度",
      href: "/system/hypodimension",
      icon: "/icon/hypodimension.png",
    },
    {
      label: "痕迹，“灵”与“场”",
      href: "/system/trace",
      icon: "/icon/chang.png",
    },
    {
      label: "魔物",
      href: "/system/malit",
      icon: "/icon/malit.png",
    },
    {
      label: "恶能",
      href: "/system/malice",
      icon: "/icon/trace.png",
    },
    {
      label: "恶能武器",
      href: "/system/weapons",
      icon: "/icon/mergeweapon.png",
    },
    {
      label: "现实的本质——世界库",
      href: "/system/innerworld",
      icon: "/icon/ling.png",
    },
  ],

  characters: [
    {
      label: "西奥多·维杰",
      href: "/characters/theo",
      icon: "/big-icon/hq.png",
    },
    {
      label: "欧奈特·帕克",
      href: "/characters/ornette",
      icon: "/big-icon/hq.png",
    },
  ],
};
