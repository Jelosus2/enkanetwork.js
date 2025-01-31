import { ZZZEquippedListAPI } from "../../types/zenless";
import { ZZZStat } from "./ZZZStat";

export class ZZZDiscDrive {
    slot: number;
    substats: ZZZStat[];
    mainStat: ZZZStat;
    isAvailable: boolean;
    isLocked: boolean;
    isTrash: boolean;
    id: number;
    uid: number;
    level: number;
    totalSubstatRolls: number;
    exp: number;

    constructor(data: ZZZEquippedListAPI) {
        this.slot = data.Slot;
        this.substats = data.Equipment.RandomPropertyList.map((substat) => new ZZZStat(substat));
        this.mainStat = new ZZZStat(data.Equipment.MainPropertyList[0]);
        this.isAvailable = data.Equipment.IsAvailable;
        this.isLocked = data.Equipment.IsLocked;
        this.isTrash = data.Equipment.IsTrash;
        this.id = data.Equipment.Id;
        this.uid = data.Equipment.Uid;
        this.level = data.Equipment.Level;
        this.totalSubstatRolls = data.Equipment.BreakLevel;
        this.exp = data.Equipment.Exp;
    }
}