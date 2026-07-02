export const intensityFormula = {
  title: "强度 = 品阶 × 容积",
};

export const intensityDangerBadge = {
  title: "危险等级",
  subtitle: "D-RANK",
  description: "描述最终破坏规模",
};

export const intensityFactorCards = {
  class: {
    icon: "/icon/reality.png",
    title: "品阶",
    subtitle: "CLASS",
    description: "品阶代表能力所处的层级，通常来说是天生的。",
    rows: [
      {
        id: "basic",
        tone: "basic",
        icon: "/icon/basic-rank.png",
        title: "基础级",
        description: "可以使用武器造成“物理伤害”",
      },
      {
        id: "energy",
        tone: "energy",
        icon: "/icon/energy-rank.png",
        title: "能量级",
        description: "可以使用武器释放能量、信息",
      },
      {
        id: "semi",
        tone: "semi",
        icon: "/icon/half-decon-rank.png",
        title: "半解构级",
        description: "可以给武器附魔使用，比能量级破坏性更强",
      },
      {
        id: "dismantle",
        tone: "dismantle",
        icon: "/icon/decon-rank.png",
        title: "解构级",
        description: "可以不依托武器，直接徒手使用能力，自由度大幅提升",
      },
      {
        id: "overlimit",
        tone: "overlimit",
        icon: "/icon/super-rank.png",
        title: "超限级",
        description: "开始触及谱系本质，发展出自身独特的概念",
      },
    ],
  },
  capacity: {
    icon: "/icon/field.png",
    title: "容积",
    subtitle: "CAPACITY",
    description: [
      "容积就是恶能者、魔物自身“场”的大小，本质上就是蓝条。",
      "场越大、场中的粒子密度更高，总能量就越多。",
    ],
  },
};

export const intensityDangerRows = [
  {
    grade: "JR",
    gradeClass: "jr",
    title: "猎魔者专属危险等级；注册猎魔者",
    description: "新晋猎魔者，具备基础作战资格。",
    hunterIcon: "/icon/malit-hunter.png",
    monsterMark: "/",
    monsterAlt: "无魔物评级",
  },
  {
    grade: "SR",
    gradeClass: "sr",
    title: "猎魔者专属危险等级；资深猎魔者",
    description: "资深猎魔者，可处理常规事件。",
    hunterIcon: "/icon-dark/malit-hunter.png",
    monsterMark: "/",
    monsterAlt: "无魔物评级",
  },
  {
    grade: "D1",
    gradeClass: "d1",
    title: "可正面击溃一支普通武装小队",
    description: "【从此等级起为猎魔者与魔物共用评级】威胁一般，需专业人员应对。",
    hunterIcon: "/icon-dark/malit-hunter-2.png",
    monsterIcon: "/icon/malit.png",
  },
  {
    grade: "D2",
    gradeClass: "d2",
    title: "可压制或歼灭多支普通武装小队；在封闭区域形成绝对优势",
    description: "威胁上升，需专业小队级战术处置。",
    hunterIcon: "/icon-dark/malit-hunter-2.png",
    monsterIcon: "/icon/malit.png",
  },
  {
    grade: "D3",
    gradeClass: "d3",
    title: "可控制或摧毁一个街区；明显破坏普通社会秩序",
    description: "威胁较高，需封锁与疏散。",
    hunterIcon: "/icon-dark/malit-hunter-2.png",
    monsterIcon: "/icon-dark/malit.png",
  },
  {
    grade: "D4",
    gradeClass: "d4",
    title: "可控制或摧毁一个城区；对设施和人群造成大规模破坏",
    description: "威胁高，需区域应急。",
    hunterIcon: "/icon-dark/malit-hunter-2.png",
    monsterIcon: "/icon-dark/malit.png",
  },
  {
    grade: "D5",
    gradeClass: "d5",
    title: "可控制或摧毁整座城市",
    description: "威胁极高，需城市级响应。",
    hunterIcon: "/icon-dark/malit-hunter-2.png",
    monsterIcon: "/icon-dark/malit-2.png",
  },
  {
    grade: "D6",
    gradeClass: "d6",
    title: "能力范围可影响州、省级区域大小",
    description: "危机，需跨州/省联合统筹。",
    hunterIcon: "/icon-dark/malit-hunter-2.png",
    monsterIcon: "/icon-dark/malit-2.png",
  },
  {
    grade: "...",
    gradeClass: "unknown",
    title: "尚不明确",
    description: "尚不明确",
    hunterIcon: "/icon/unknown.png",
    monsterIcon: "/icon/unknown.png",
  },
];
