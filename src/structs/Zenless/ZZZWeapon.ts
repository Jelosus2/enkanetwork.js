import { ZZZWeaponAPI } from "../../types/zenless";

export class ZZZWeapon {
  isAvailable: boolean;
  isLocked: boolean;
  id: number;
  uid: number;
  level: number;
  modificationLevel: number;
  exp: number;
  phaseLevel: number;
  
  constructor(data: ZZZWeaponAPI) {
    this.isAvailable = data.IsAvailable;
    this.isLocked = data.IsLocked;
    this.id = data.Id;
    this.uid = data.Uid;
    this.level = data.Level;
    this.modificationLevel = data.BreakLevel;
    this.exp = data.Exp;
    this.phaseLevel = data.UpgradeLevel;
  }
}