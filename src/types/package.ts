export interface WrapperOptions {
  userAgent?: string
  language?: 'en' | 'ru' | 'vi' | 'th' | 'pt' | 'ko' | 'ja' | 'id' | 'fr' | 'es' | 'de' | 'zh-TW' | 'zh-CN' | 'it' | 'tr'
  cache?: boolean
}

export interface AutoUpdaterOptions {
  checkInterval?: number
}

export interface AssetFinderOptions {
  language?: 'en' | 'ru' | 'vi' | 'th' | 'pt' | 'ko' | 'ja' | 'id' | 'fr' | 'es' | 'de' | 'zh-TW' | 'zh-CN' | 'it' | 'tr'
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

export interface SkillImage {
  icon: string
}

export interface ConstellationImage {
  icon: string
}

export interface WeaponImage {
  icon: string
  awakenIcon: string
}