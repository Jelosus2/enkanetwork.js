import { PropState, ZZZLayerGenerator } from "../../handlers";
import { ZZZAvatarListAPI } from "../../types/zenless";
import { ZZZDiscDrive } from "./ZZZDiscDrive";
import { ZZZSkill } from "./ZZZSkill";
import { ZZZWeapon } from "./ZZZWeapon";

export class ZZZShowcase {
    weaponEffectState: 0 | 1 | 2;
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
    obtainmentTimestamp: number;
    weapon: ZZZWeapon;

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
        this.obtainmentTimestamp = data.ObtainmentTimestamp;
        this.weapon = data.Weapon
            ? new ZZZWeapon(data.Weapon)
            : ({} as ZZZWeapon);
    }

    stats() {
        const propState = new PropState();
        propState.add(ZZZLayerGenerator.character({ avatarId: this.id, level: this.level, promotion: this.promotion, coreSkillEnhancement: this.coreSkillEnhancement }));
        propState.add(ZZZLayerGenerator.weapon({ weaponId: this.weapon.id, level: this.weapon.level, breakLevel: this.weapon.modificationLevel }));

        return propState.sum("zzz").props;
    }
}