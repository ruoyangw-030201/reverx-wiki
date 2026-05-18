import { generatedWorldMapPaths } from "./generatedWorldMapPaths.js";
import { resolveWorldEntity } from "./worldEntities.js";

const MAP_SIZE = {
  width: 2872,
  height: 1544,
};

const DEFAULT_REGION_PRIORITY = 20;

const regionPriorityByMap = {
  ferdona: {
    hq: 10,
    rattown: 30,
    taran: 30,
    shalom: 30,
    blueprint: 40,
  },
  hespera: {
    tibernan: 10,
    tibernan_small: 40,
    queld: 30,
    vayreich: 30,
    pontivar: 30,
    ossela: 30,
  },
};

function withGeneratedPaths(mapKey, regions) {
  return regions
    .map((region, index) => {
      const entity = resolveWorldEntity(region.entityKey ?? region.key);

      return {
        ...entity,
        ...region,
        priority: regionPriorityByMap[mapKey]?.[region.key] ?? DEFAULT_REGION_PRIORITY,
        order: index,
        paths: generatedWorldMapPaths[mapKey]?.[region.key] ?? [],
      };
    })
    .sort((a, b) => a.priority - b.priority || a.order - b.order);
}

function withMapEntity(config) {
  const entity = resolveWorldEntity(config.entityKey ?? config.key);

  return {
    ...entity,
    ...config,
    title: config.title ?? entity.label,
    subtitle: config.subtitle ?? entity.labelEn,
  };
}

function withMapCities(cities) {
  return cities.map((city) => {
    const entity = resolveWorldEntity(city.entityKey);

    return {
      ...entity,
      ...city,
      text: city.text ?? entity.label,
    };
  });
}

const ferdonaRegions = [
  {
    key: "hq",
  },
  {
    key: "prospect",
  },
  {
    key: "cabin",
  },
  {
    key: "blueprint",
  },
  {
    key: "teccasino",
  },
  {
    key: "rattown",
  },
  {
    key: "shalom",
  },
  {
    key: "taran",
  },
];

const hesperaRegions = [
  {
    key: "tibernan",
  },
  {
    key: "tibernan_small",
    entityKey: "tibernan",
  },
  {
    key: "triatine",
  },
  {
    key: "ossela",
  },
  {
    key: "pontivar",
  },
  {
    key: "queld",
  },
  {
    key: "vayreich",
  },
];

export const worldMaps = {
  ferdona: withMapEntity({
    key: "ferdona",
    size: MAP_SIZE,
    image: "/map/ferdona/ferdona_raw.webp",
    regions: withGeneratedPaths("ferdona", ferdonaRegions),
    labels: [
      { text: "国王领州", x: 158, y: 188 },
      { text: "凯尔米安州", x: 395, y: 506 },
      { text: "佩特拉州", x: 617, y: 579 },
      { text: "玛塔沙米亚州", x: 680, y: 166 },
      { text: "克利夫阿莱州", x: 1018, y: 130, mobileX: 1018, mobileY: 100 },
      { text: "柯克利夫州", x: 1204, y: 140 },
      { text: "舍斯顿州", x: 1260, y: 225 },
      { text: "敦尼亚州", x: 1394, y: 23 },
      { text: "禾山州", x: 1630, y: 224 },
      { text: "卢瑞菲尔德州", x: 1855, y: 354 },
      { text: "林恩州", x: 1933, y: 151, mobileX: 1933, mobileY: 131 },
      { text: "普瑞斯敦州", x: 2280, y: 214 },
      { text: "比乐吉州", x: 2490, y: 294 },
      { text: "普尔嘉州", x: 2432, y: 407 },
      { text: "拉莫克州", x: 2615, y: 407 },
      { text: "贝列西亚州", x: 2527, y: 445 },
      { text: "阿尔伯洛沃州", x: 2770, y: 349 },
      { text: "大岭漠州", x: 936, y: 415 },
      { text: "华斯特兰州", x: 1368, y: 428, mobileX: 1300, mobileY: 390 },
      { text: "西门瑟姆州", x: 1761, y: 575 },
      { text: "图特布梅州", x: 1172, y: 718 },
      { text: "忒卡西诺州", x: 1272, y: 844, mobileX: 1272, mobileY: 824 },
      { text: "卡瑟州", x: 1694, y: 885 },
      { text: "北福尔瑙伊州", x: 837, y: 898 },
      { text: "南福尔瑙伊州", x: 952, y: 1124 },
      { text: "戈赫州", x: 1170, y: 1123 },
      { text: "离海群岛", x: 2232, y: 790 },
      { text: "蓝萌岛", x: 2222, y: 976 },
      { text: "凡多纳", x: 1436, y: 702, level: "country" },
    ],
    cities: withMapCities([
      { text: "小屋", markerX: 703, markerY: 883, x: 703, y: 858, mobileLabelOffsetY: 2 },
      { text: "忒卡西诺城", markerX: 1292, markerY: 906, x: 1292, y: 884, mobileLabelOffsetY: 2 },
      { text: "芝士牛排城", markerX: 1472, markerY: 833, x: 1554, y: 833, mobileLabelOffsetX: -8 },
      { text: "汽车城", markerX: 1370, markerY: 972, x: 1427, y: 972, mobileLabelOffsetX: -5 },
      { text: "酒城", markerX: 1920, markerY: 1157, x: 1964, y: 1157, mobileLabelOffsetX: -5 },
      { entityKey: "taran", markerX: 2011, markerY: 226, x: 2011, y: 198, mobileLabelOffsetY: 2 },
      { entityKey: "rattown", markerX: 1512, markerY: 454, x: 1512, y: 427, mobileLabelOffsetY: 2 },
      { text: "蓝图", markerX: 1929, markerY: 284, x: 1968, y: 284, mobileLabelOffsetX: -5 },
      { entityKey: "shalom", markerX: 2337, markerY: 543, x: 2337, y: 515, mobileLabelOffsetY: 2 },
    ]),
  }),
  hespera: withMapEntity({
    key: "hespera",
    size: MAP_SIZE,
    image: "/map/hespera/hespera_raw.webp",
    regions: withGeneratedPaths("hespera", hesperaRegions),
    labels: [
      { text: "奎尔德", x: 394, y: 360, level: "country" },
      { text: "危雷齐", x: 949, y: 604, level: "country" },
      { text: "庞提瓦尔", x: 882, y: 985, level: "country" },
      { text: "奥塞拉", x: 312, y: 1277, level: "country" },
      { text: "特律庭", x: 2131, y: 1365, level: "country" },
    ],
    cities: withMapCities([
      { text: "缇柏南城", x: 1110, y: 1132, markerX: 1107, markerY: 1164, mobileLabelOffsetY: 2 },
    ]),
  }),
};
