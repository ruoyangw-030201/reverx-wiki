export const topNav = [
  { label: "世界观", href: "/world/", key: "world" },
  { label: "能力体系", href: "/system/", key: "system" },
  { label: "角色档案", href: "/characters/", key: "characters" },
];

export const sidebarNav = [
  { label: "世界观概览", href: "/world/", key: "world", icon: "/icon/reality.png" },
  { label: "能力体系", href: "/system/", key: "system", icon: "/icon/hypodimension.png" },
  { label: "魔物档案", href: "/system/malit/", key: "malit", icon: "/icon/malit.png" },
  { label: "武器图鉴", href: "/system/weapons/", key: "weapons", icon: "/icon/mergeweapon.png" },
  { label: "角色档案", href: "/characters/", key: "characters", icon: "/icon/record.png" },
  { label: "世界库", href: "/system/innerworld/", key: "innerworld", icon: "/icon/core.png" },
];

export const archiveSections = {
  world: {
    label: "世界观",
    eyebrow: "WORLDVIEW",
    href: "/world/",
    items: [
      { label: "世界观总览", href: "/world/" },
      { label: "凡多纳", href: "/world/ferdona/" },
      { label: "恶能者总部", href: "/world/ferdona/hq/" },
      { label: "希景公司", href: "/world/ferdona/prospect/" },
      { label: "福尔瑙伊州小屋", href: "/world/ferdona/cabin/" },
      { label: "蓝图", href: "/world/ferdona/blueprint/" },
      { label: "守恒科技", href: "/world/ferdona/contech/" },
      { label: "IDA / 解构协会", href: "/world/ferdona/ida/" },
      { label: "忒卡西诺城", href: "/world/ferdona/teccasino/" },
      { label: "海西培拉", href: "/world/hespera/" },
      { label: "缇柏南城", href: "/world/hespera/tibernan/" },
      { label: "特律庭", href: "/world/hespera/triatine/" },
      { label: "暗影会", href: "/world/umbral/" },
    ],
  },
  system: {
    label: "能力体系",
    eyebrow: "POWER SYSTEM",
    href: "/system/",
    items: [
      { label: "能力体系总览", href: "/system/" },
      { label: "恶能者", href: "/system/malicer/" },
      { label: "恶意", href: "/system/malice/" },
      { label: "痕迹", href: "/system/trace/" },
      { label: "次维度", href: "/system/hypodimension/" },
      { label: "魔物", href: "/system/malit/" },
      { label: "恶能武器", href: "/system/weapons/" },
      { label: "世界库", href: "/system/innerworld/" },
    ],
  },
  characters: {
    label: "角色档案",
    eyebrow: "CHARACTER FILES",
    href: "/characters/",
    items: [
      { label: "角色档案总览", href: "/characters/" },
      { label: "西奥多·维杰", href: "/characters/theo/" },
      { label: "奥内特", href: "/characters/ornette/" },
    ],
  },
} as const;

export type ArchiveSectionKey = keyof typeof archiveSections;
