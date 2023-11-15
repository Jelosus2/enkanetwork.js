import { OwnerAPI } from "./genshin"

export interface SRPlayerDataAPI {
  detailInfo: SRPlayerDetails
  ttl: number
  owner: OwnerAPI
  uid: string
}

export interface SRPlayerDetails {
  headIcon: number
  avatarDetailList: SRShowcaseAPI[]
  nickname: string
  level: number
  signature: string
  uid: number
  friendCount: number
  recordInfo: SRPlayerRecordInfoAPI
  worldLevel: number
  isDisplayAvatar: boolean
  platform: string
}

export interface SRShowcaseAPI {
  avatarId: number
  promotion: number
  equipment: SRLightConeAPI
  skillTreeList: SRSkillTreeListAPI[]
  pos: number
  exp: number
  relicList: SRRelicList[]
  level: number
  rank: number
  _assist: boolean
  _flat: object
}

export interface SRPlayerRecordInfoAPI {
  challengeInfo: SRPlayerChallengeInfoAPI
  equipmentCount: number
  maxRogueChallengeScore: number
  achievementCount: number
  avatarCount: number
}

export interface SRPlayerChallengeInfoAPI {
  scheduleGroupId: number
  scheduleMaxLevel: number 
  noneScheduleMaxLevel: number
}

export interface SRLightConeAPI {
  tid: number
  level: number
  promotion: number
  rank: number
  _flat: SRLightConeFlatAPI
}

export interface SRLightConeFlatAPI {
  props: SRLightConePropsAPI[]
  name: number
}

export interface SRLightConePropsAPI {
  type: string
  value: number
}

export interface SRSkillTreeListAPI {
  pointId: number
  level: number
}

export interface SRRelicList {
  level: number
  subAffixList: SRSubAffixListAPI[]
  mainAffixId: number
  type: number
  tid: number
  _flat: SRRelicFlatAPI
}

export interface SRSubAffixListAPI {
  affixId: number
  cnt: number
  step: number
}

export interface SRRelicFlatAPI {
  props: SRRelicPropsAPI[]
  setName: number
  setID: number
}

export interface SRRelicPropsAPI {
  type: string
  value: number
}

export interface SRCharacterStats {
  type: string;
  value: number;
  base: number;
}