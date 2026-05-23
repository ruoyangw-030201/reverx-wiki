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
    icon: "/big-icon/hq.webp",
  },
  prospect: {
    label: "希景公司",
    labelEn: "PROSPECT CO.",
    href: "/world/ferdona/prospect",
    icon: "/big-icon/prospect.webp",
  },
  cabin: {
    label: "福尔瑙伊州小屋",
    labelEn: "THE CABIN",
    href: "/world/ferdona/cabin",
    icon: "/big-icon/cabin.webp",
  },
  "5thstreet": {
    label: "第五街基地",
    labelEn: "FIFTH STREET",
    href: "/world/ferdona/cabin#5thstreet",
    icon: "/big-icon/5thstreet.webp",
  },
  museum: {
    label: "国王领博物馆",
    labelEn: "KINGENLAND MUSEUM",
    href: "/world/ferdona/museum",
    icon: "/big-icon/museum.webp",
  },
  blueprint: {
    label: "蓝图",
    labelEn: "THE BLUEPRINT",
    href: "/world/ferdona/blueprint",
    icon: "/big-icon/blueprint.webp",
  },
  teccasino: {
    label: "忒卡西诺城",
    labelEn: "TECCASINO CITY",
    href: "/world/ferdona/teccasino",
    icon: "/big-icon/teccasino.webp",
  },
  rattown: {
    label: "莱城基地",
    labelEn: "Rattown",
    href: "/world/ferdona/hq#rattown-base",
    icon: "/big-icon/rattown-base.webp",
  },
  shalom: {
    label: "舍拉姆基地",
    labelEn: "Shalom",
    href: "/world/ferdona/hq#shalom-base",
    icon: "/big-icon/shalom-base.webp",
  },
  taran: {
    label: "塔兰基地",
    labelEn: "Taran",
    href: "/world/ferdona/hq#taran-base",
    icon: "/big-icon/taran-base.webp",
  },
  sarra: {
    label: "萨拉基地",
    labelEn: "Sarra",
    href: "/world/ferdona/hq#sarra-base",
    icon: "/big-icon/sarra-base.webp",
  },
  contech: {
    label: "守恒科技",
    labelEn: "Conservation Tech. Co.",
    icon: "/big-icon/contech.webp",
  },
  ida: {
    label: "IDA/解构协会",
    labelEn: "International Deconstruct Association",
    icon: "/big-icon/ida.webp",
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
    icon: "/big-icon/tibernan.webp",
  },
  celespian: {
    label: "塞勒西教",
    labelEn: "Celespian",
    href: "/world/hespera/tibernan#celespian",
    icon: "/big-icon/celespian.webp",
  },
  triatine: {
    label: "特律庭",
    labelEn: "TRIATINE",
    href: "/world/hespera/triatine",
    icon: "/big-icon/triatine.webp",
  },
  qenevian: {
    label: "珂涅教",
    labelEn: "Qenevian",
    href: "/world/hespera/triatine#qenevian",
    icon: "/big-icon/qenevian.webp",
  },
  ossela: {
    label: "奥塞拉",
    labelEn: "OSSELA",
    icon: "/big-icon/tibernan.webp",
  },
  pontivar: {
    label: "庞提瓦尔",
    labelEn: "PONTIVAR",
    icon: "/big-icon/tibernan.webp",
  },
  queld: {
    label: "奎尔德",
    labelEn: "QUELD",
    icon: "/big-icon/tibernan.webp",
  },
  vayreich: {
    label: "危雷齐",
    labelEn: "VAYREICH",
    icon: "/big-icon/tibernan.webp",
  },
  umbral: {
    label: "暗影会",
    labelEn: "THE UMBRAL",
    href: "/world/umbral",
    icon: "/big-icon/umbral.webp",
  },
};

export function resolveWorldEntity(entityKey) {
  if (!entityKey) return {};
  return worldEntities[entityKey] ?? {};
}
