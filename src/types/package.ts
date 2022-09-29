export interface WrapperOptions {
  key?: string
  userAgent?: string
}

export interface AssetNameFinderOptions {
  language?: 'en' | 'ru' | 'vi' | 'th' | 'pt' | 'ko' | 'ja' | 'id' | 'fr' | 'es' | 'de' | 'zh-TW' | 'zh-CN'
}

export interface CharacterImage {
  icon: string
  sideIcon: string
  gachaIcon: string
  constellations: string[]
  skills: CharacterSkillIcon
  costumes: CharacterCostume[]
}

export interface CharacterSkillIcon {
  normalAttack: string
  elementalSkill: string
  elementalBurst: string
}

export interface CharacterCostume {
  sideIconName: string
  icon: string
  art: string
}

export interface NamecardImage {
  icon: string
  picPath: string[]
}

export interface TalentImage {
  icon: string
}

export interface WeaponImage {
  icon: string
  awakenIcon: string
}