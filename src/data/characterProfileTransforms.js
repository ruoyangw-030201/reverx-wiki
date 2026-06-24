const abilitySlots = [
  { key: "entity", label: "所属势力 / ENTITIES" },
  { key: "age", label: "年龄 / AGE" },
  { key: "species", label: "物种 / SPECIES" },
  { key: "spectrum", label: "能力谱系 / SPECTRUM" },
  { key: "level", label: "品阶 / LEVEL" },
  { key: "dangerRank", label: "危险等级 / D-RANK" },
];

const weaponTypes = {
  fusion: {
    typeLabel: "融合武器",
    typeLabelEn: "FUSION WEAPON",
  },
  nonFusion: {
    typeLabel: "非融合武器",
    typeLabelEn: "NON-FUSION WEAPON",
  },
  innate: {
    typeLabel: "自生武器",
    typeLabelEn: "INNATE WEAPON",
  },
};

const weaponIcons = {
  fusion: "/icon/fusion-weapon.png",
  nonFusion: "/icon/non-fusion-weapon.png",
  innate: "/icon/fusion-weapon.png",
};

const weaponFieldSlots = [
  { key: "appearance", label: "外形" },
  { key: "spectrum", label: "谱系" },
  { key: "coreRank", label: "核心品阶" },
];

function normalizeAbilityCards(abilities = []) {
  if (Array.isArray(abilities)) {
    return abilities.map((ability, index) => ({
      label: ability.label ?? abilitySlots[index]?.label,
      ...ability,
    }));
  }

  return abilitySlots
    .map(({ key, label }) => {
      const ability = abilities[key];
      return ability ? { label, ...ability } : undefined;
    })
    .filter(Boolean);
}

function getWeaponType(weapon, defaultType) {
  if (weapon.type) return weapon.type;
  if (weapon.typeLabelEn === "INNATE WEAPON") return "innate";
  if (weapon.typeLabelEn === "NON-FUSION WEAPON") return "nonFusion";
  if (weapon.typeLabelEn === "FUSION WEAPON") return "fusion";
  return defaultType;
}

function normalizeWeaponFields(fields) {
  if (!fields) return [];

  if (Array.isArray(fields)) {
    return fields.map((field, index) => ({
      label: field.label ?? weaponFieldSlots[index]?.label,
      value: field.value,
    }));
  }

  return weaponFieldSlots
    .map(({ key, label }) => {
      const value = fields[key];
      return value !== undefined ? { label, value } : undefined;
    })
    .filter(Boolean);
}

function normalizeWeapons(weapons = [], defaultType) {
  return weapons.map((weapon) => {
    const type = getWeaponType(weapon, defaultType);
    const typeLabels = weaponTypes[type] ?? weaponTypes[defaultType];

    return {
      ...weapon,
      ...typeLabels,
      icon: weapon.icon ?? weaponIcons[type] ?? weaponIcons[defaultType],
      fields: normalizeWeaponFields(weapon.fields),
    };
  });
}

export function normalizeCharacterProfile(profile = {}) {
  return {
    ...profile,
    abilities: normalizeAbilityCards(profile.abilities),
    fusionWeapons: normalizeWeapons(profile.fusionWeapons, "fusion"),
    nonFusionWeapons: normalizeWeapons(profile.nonFusionWeapons, "nonFusion"),
  };
}
