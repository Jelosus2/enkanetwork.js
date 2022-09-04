export interface DataAPI {
  playerInfo: PlayerInfoAPI
  avatarInfoList: CharactersInfoAPI[]
  ttl: number
}

export interface PlayerInfoAPI {
  nickname: string
  level: number
  signature: string
  worldLevel: number
  nameCardId: number
  finishAchievementNum: number
  towerFloorIndex: number
  towerLevelIndex: number
  showAvatarInfoList: ShowCharactersListAPI[]
  showNameCardIdList: number[]
  profilePicture: ProfilePictureAPI
}

export interface ShowCharactersListAPI {
  avatarId: number
  level: number
  costumeId: number
}

export interface ProfilePictureAPI {
  avatarId: number
}

export interface CharactersInfoAPI {
  avatarId: number
  propMap: PropMapAPI
  fightPropMap: FightPropMapAPI
  talentIdList: number[]
  skillDepotId: number
  inherentProudSkillList: number[]
  skillLevelMap: any
  equipList: any[]
  fetterInfo: FetterInfoAPI
  costumeId: number
}

export interface PropMapAPI {
  1001: PropMapContentAPI
  1002: PropMapContentAPI
  1003: PropMapContentAPI
  1004: PropMapContentAPI
  4001: PropMapContentAPI
  10010: PropMapContentAPI 
}


export interface PropMapContentAPI {
  type: number
  ival: string
  val: string
}

export interface FightPropMapAPI {
  1: number
  4: number
  7: number
  20: number
  22: number
  23: number
  26: number
  27: number
  28: number
  29: number
  30: number
  40: number
  41: number
  42: number
  43: number
  44: number
  45: number
  46: number
  50: number
  51: number
  52: number
  53: number
  54: number
  55: number
  56: number
  70: number
  71: number
  72: number
  73: number
  74: number
  75: number
  76: number
  2000: number
  2001: number
  2002: number
}

export interface ReliquaryAPI {
  itemId: number
  reliquary: ReliquaryInfoAPI
  flat: ReliquaryFlatAPI
}

export interface ReliquaryInfoAPI {
  level: number
  mainPropId: number
  appendPropIdList: number[]
}

export interface ReliquaryFlatAPI {
  nameTextMapHash: string
  setNameTextMapHash: string
  rankLevel: number
  reliquaryMainstat: ReliquaryMainstatAPI
  reliquarySubstats: ReliquarySubstatsAPI[]
  itemType: string
  icon: string
  equipType: string
}

export interface ReliquaryMainstatAPI {
  mainPropId: string
  statValue: number
}

export interface ReliquarySubstatsAPI {
  appendPropId: string
  statValue: number
}

export interface WeaponAPI {
  itemId: number
  weapon: WeaponInfoAPI
  flat: WeaponFlatAPI
}

export interface WeaponInfoAPI {
  level: number
  promoteLevel: number
  affixMap: any
}

export interface WeaponFlatAPI {
  nameTextMapHash: string
  rankLevel: number
  weaponStats: WeaponStatsAPI[]
  itemType: string
  icon: string
}

export interface WeaponStatsAPI {
  appendPropId: string
  statValue: number
}

export interface FetterInfoAPI {
  expLevel: number
}

export interface UserDataAPI {
  is_uid_public: boolean
  uid: number
  player_info: PlayerInfoAPI
}

export interface UserBuildsAPI {
  id: number
  name: string
  avatar_id: string
  avatar_data: UserBuildsDataAPI 
  order: number
  live: boolean
  settings: object
  is_public: boolean
}

export interface UserBuildsDataAPI {
  propMap: PropMapAPI
  avatarId: number
  costumeId: number
  equipList: any[]
  fetterInfo: FetterInfoAPI
  fightPropMap: FightPropMapAPI
  skillDepotId: number
  talentIdList: number[]
  skillLevelMap: any
  inherentProudSkillList: number[]
  proudSkillExtraLevelMap: any
}