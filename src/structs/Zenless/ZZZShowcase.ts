import { ZZZAvatarListAPI } from "../../types/zenless";
import { ZZZDiscDrive } from "./ZZZDiscDrive";
import { ZZZSkill } from "./ZZZSkill";

export class ZZZShowcase {
    weaponEffectState: 0 | 1;
    discDrives: ZZZDiscDrive[];
    skills: ZZZSkill[];
    cinemaVisualToggles: boolean[];
    claimedPromotionRewards: number[];
    isHidden: boolean;
    id: number;
    level: number;
    promotion: number;
    exp: number;
    skinId: number;
    mindscapeLevel: number;
    coreSkillEnhancement: number;
    weaponUid: number;
    obtainmentTimestamp: number;
    // TODO: Make a class for this
    weapon: unknown;

    constructor(data: ZZZAvatarListAPI) {
        this.weaponEffectState = data.WeaponEffectState;
        this.discDrives = data.EquippedList.map((discDrive) => new ZZZDiscDrive(discDrive));
        this.skills = data.SkillLevelList.map((skill) => new ZZZSkill(skill));
        this.cinemaVisualToggles = data.TalentToggleList;
        this.claimedPromotionRewards = data.ClaimedRewardList;
        this.isHidden = data.IsHidden;
        this.id = data.Id;
        this.level = data.Level;
        this.promotion = data.PromotionLevel;
        this.exp = data.Exp;
        this.skinId = data.SkinId;
        this.mindscapeLevel = data.TalentLevel;
        this.coreSkillEnhancement = data.CoreSkillEnhancement;
        this.weaponUid = data.WeaponUid;
        this.obtainmentTimestamp = data.ObtainmentTimestamp;
    }
}