export interface ZZZPlayerDataAPI {
  PlayerInfo: ZZZPlayerInfoAPI;
  uid: string;
  ttl: number;
}

export interface ZZZPlayerInfoAPI {
  ShowCaseDetail: ZZZShowCaseDetailAPI;
  SocialDetail: ZZZSocialDetailAPI;
}

export interface ZZZShowCaseDetailAPI {
  AvatarList: ZZZAvatarListAPI[];
}

export interface ZZZAvatarListAPI {
  WeaponEffectState: 0 | 1;
  EquippedList: ZZZEquippedListAPI[];
  SkillLevelList: ZZZSkillLevelListAPI[];
  TalentToggleList: boolean[];
  ClaimedRewardList: number[];
  IsHidden: boolean;
  Id: number;
  Level: number;
  PromotionLevel: number;
  Exp: number;
  SkinId: number;
  TalentLevel: number;
  CoreSkillEnhancement: number;
  WeaponUid: number;
  ObtainmentTimestamp: number;
  Weapon: ZZZWeaponAPI;
}

export interface ZZZEquippedListAPI {
  Slot: number;
  Equipment: ZZZEquipmentAPI;
}

export interface ZZZEquipmentAPI {
  RandomPropertyList: ZZZPropertyListAPI[];
  MainPropertyList: ZZZPropertyListAPI[];
  IsAvailable: boolean;
  IsLocked: boolean;
  IsTrash: boolean;
  Id: number;
  Uid: number;
  Level: number;
  BreakLevel: number;
  Exp: number;
}

export interface ZZZPropertyListAPI {
  PropertyId: number;
  PropertyLevel: number;
  PropertyValue: number;
}

export interface ZZZSkillLevelListAPI {
  Level: number;
  Index: number;
}

export interface ZZZWeaponAPI {
  IsAvailable: boolean;
  IsLocked: boolean;
  Id: number;
  Uid: number;
  Level: number;
  BreakLevel: number;
  Exp: number;
  UpgradeLevel: number;
}

export interface ZZZSocialDetailAPI {
  MedalList: ZZZMedalListAPI[];
  ProfileDetail: ZZZProfileDetailAPI;
  Desc: string;
}

export interface ZZZMedalListAPI {
  Value: number;
  MedalType: number;
  MedalIcon: number;
}

export interface ZZZProfileDetailAPI {
  Nickname: string;
  AvatarId: number;
  Uid: number;
  Level: number;
  Title: number;
  ProfileId: number;
  CallingCardId: number;
}
