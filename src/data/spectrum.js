const themes = {
  essence: {
    accent: "#050505",
    accentSoft: "rgba(5, 5, 5, 0.18)",
    accentWash: "rgba(5, 5, 5, 0.055)",
    accentText: "#050505",
  },
  reality: {
    accent: "rgba(174, 119, 55, 0.94)",
    accentSoft: "rgba(200, 155, 90, 0.32)",
    accentWash: "rgba(224, 194, 143, 0.12)",
    accentText: "rgba(143, 93, 53, 0.96)",
  },
  information: {
    accent: "#234d7b",
    accentSoft: "rgba(45, 95, 150, 0.24)",
    accentWash: "rgba(45, 95, 150, 0.08)",
    accentText: "#234d7b",
  },
};

export const spectrumOverviewText = [
  "恶能的能力表现多种多样。在2036年之前，依据科学，现代分类法通常将恶能分为三大类：本源类、现实类和信息类。每一大类内部都被认为存在极多且尚未完全探明的谱系。这些谱系命名零散，常常依据能力表现、历史称呼或使用者习惯被临时归类，缺乏统一标准。",
  "2036年后，以利亚德·帕克为首的研究者们，根据能力的本质、每种粒子活性状态下细微的大小区别，详细地测定并分类了谱系：本源类拥有2个，现实类拥有5个，信息类拥有3个，总共有10个谱系。",
];

export const spectrumRoot = {
  id: "malice",
  title: "恶能",
  icon: "/icon/vestige.png",
  theme: themes.reality,
};

export const spectrumClasses = [
  {
    id: "essence",
    title: "本源类",
    titleEn: "ESSENCE CLASS",
    description: "使用痕迹本身。暗就是痕迹本身，是痕迹最本质的形态。可以说暗=恶意=痕迹。",
    icon: "/icon/essence.png",
    theme: themes.essence,
    lineages: [
      {
        id: "darkness",
        title: "暗",
        essence: "痕迹",
        description: "使用痕迹本身的谱系，表现为痕迹操控、死亡加速、空间系等效果。",
        icon: "/icon/darkness.png",
      },
      {
        id: "light",
        title: "光",
        essence: "翻转",
        description: "使用痕迹的翻转形态，表现为痕迹蒸发、生命净化、光能性质等效果。",
        icon: "/icon/light.png",
      },
    ],
  },
  {
    id: "reality",
    title: "现实类",
    titleEn: "REALITY CLASS",
    description: "使用痕迹的能量，作用于物理世界。",
    icon: "/icon/real.png",
    theme: themes.reality,
    lineages: [
      {
        id: "water",
        title: "水",
        essence: "物质",
        description: "使用物质本身的谱系，表现为溶解、分子重组、改写物质等效果。",
        icon: "/icon/water.png",
      },
      {
        id: "ice",
        title: "冰",
        essence: "热能",
        description: "控制热能的谱系，表现为降低温度、冻结目标，抑制粒子运动等效果。",
        icon: "/icon/ice.png",
      },
      {
        id: "fire",
        title: "火",
        essence: "反应",
        description: "控制燃烧等能量转化反应的谱系，表现为操控燃烧、爆炸、聚变等效果。",
        icon: "/icon/fire.png",
      },
      {
        id: "electric",
        title: "电",
        essence: "电磁",
        description: "控制电磁场的谱系，表现为操控电、磁场、波等相关微观现象等效果。",
        icon: "/icon/electric.png",
      },
      {
        id: "wind",
        title: "风",
        essence: "力势",
        description: "控制力与势能的谱系，表现为操控力场、气流、局部时空扭曲等效果。",
        icon: "/icon/wind.png",
      },
    ],
  },
  {
    id: "information",
    title: "信息类",
    titleEn: "INFORMATION CLASS",
    description: "使用痕迹的信息。",
    icon: "/icon/informational.png",
    theme: themes.information,
    lineages: [
      {
        id: "up",
        title: "增幅",
        essence: "正信息",
        description: "使用正向信息的谱系，表现为强化目标、催化战争、促使物质再生等效果。",
        icon: "/icon/up.png",
      },
      {
        id: "down",
        title: "削弱",
        essence: "负信息",
        description: "使用负向信息的谱系，表现为虚弱目标、造成瘟疫、存在性削弱等效果。",
        icon: "/icon/down.png",
      },
      {
        id: "chaos",
        title: "混乱",
        essence: "中信息",
        description: "改写信息的谱系，表现为制造幻象、信息替换、修改群体记忆等效果。",
        icon: "/icon/chaos.png",
      },
    ],
  },
];
