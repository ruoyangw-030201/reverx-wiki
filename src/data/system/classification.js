export const classificationOverviewRoot = {
  title: "恶能",
  icon: "/icon/vestige.png",
};

export const classificationGroups = [
  {
    id: "essence",
    title: "本源类",
    titleEn: "ESSENCE CLASS",
    description: "使用痕迹本身。暗就是痕迹本身，是痕迹最本质的形态。可以说暗=恶意=痕迹。",
    icon: "/icon-dark/essence.png",
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
    icon: "/icon-dark/real.png",
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
    icon: "/icon-dark/informational.png",
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
