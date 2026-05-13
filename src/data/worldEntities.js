export const worldEntities = {
  ferdona: {
    label: "凡多纳",
    labelEn: "FERDONA",
    href: "/world/ferdona",
  },
  hq: {
    label: "恶能者总部",
    labelEn: "THE HEADQUARTERS",
    href: "/world/ferdona/hq",
    icon: "/big-icon/hq.png",
  },
  prospect: {
    label: "希景公司",
    labelEn: "PROSPECT CO.",
    href: "/world/ferdona/prospect",
    icon: "/big-icon/prospect.png",
  },
  cabin: {
    label: "福尔瑙伊州小屋",
    labelEn: "THE CABIN",
    href: "/world/ferdona/cabin",
    icon: "/big-icon/cabin.png",
  },
  blueprint: {
    label: "蓝图",
    labelEn: "THE BLUEPRINT",
    href: "/world/ferdona/blueprint",
    icon: "/big-icon/blueprint.png",
  },
  teccasino: {
    label: "忒卡西诺城",
    labelEn: "TECCASINO CITY",
    href: "/world/ferdona/teccasino",
    icon: "/big-icon/teccasino.png",
  },
  rattown: {
    label: "莱城基地",
    labelEn: "Rattown",
    href: "/world/ferdona/hq#rattown-base",
    icon: "/big-icon/hq.png",
  },
  shalom: {
    label: "舍拉姆基地",
    labelEn: "Shalom",
    href: "/world/ferdona/hq#shalom-base",
    icon: "/big-icon/hq.png",
  },
  taran: {
    label: "塔兰基地",
    labelEn: "Taran",
    href: "/world/ferdona/hq#taran-base",
    icon: "/big-icon/hq.png",
  },
  contech: {
    label: "守恒科技",
    labelEn: "Conservation Tech. Co.",
    icon: "/big-icon/contech.png",
  },
  ida: {
    label: "IDA/解构协会",
    labelEn: "International Deconstruct Association",
    icon: "/big-icon/ida.png",
  },
  pathera: {
    label: "佩特拉州",
    labelEn: "Pathera",
    icon: "/big-icon/cabin.png",
  },
  hespera: {
    label: "海西",
    labelEn: "HESPERA",
    href: "/world/hespera",
  },
  tibernan: {
    label: "缇柏南城·主教廷",
    labelEn: "TIBERNAN CITY",
    href: "/world/hespera/tibernan",
    icon: "/big-icon/tibernan.png",
  },
  celespian: {
    label: "塞勒西教",
    labelEn: "Celespian",
    href: "/world/hespera/tibernan#celespian",
    icon: "/big-icon/celespian.png",
  },
  triatine: {
    label: "特律庭",
    labelEn: "TRIATINE",
    href: "/world/hespera/triatine",
    icon: "/big-icon/triatine.png",
  },
  qenevian: {
    label: "珂涅教",
    labelEn: "Qenevian",
    href: "/world/hespera/triatine#qenevian",
    icon: "/big-icon/qenevian.png",
  },
  ossela: {
    label: "奥塞拉",
    labelEn: "OSSELA",
    icon: "/big-icon/tibernan.png",
  },
  pontivar: {
    label: "庞提瓦尔",
    labelEn: "PONTIVAR",
    icon: "/big-icon/tibernan.png",
  },
  queld: {
    label: "奎尔德",
    labelEn: "QUELD",
    icon: "/big-icon/tibernan.png",
  },
  vayreich: {
    label: "危雷齐",
    labelEn: "VAYREICH",
    icon: "/big-icon/tibernan.png",
  },
  umbral: {
    label: "暗影会",
    labelEn: "THE UMBRAL",
    href: "/world/umbral",
    icon: "/big-icon/umbral.png",
  },
};

export function resolveWorldEntity(entityKey) {
  if (!entityKey) return {};
  return worldEntities[entityKey] ?? {};
}
