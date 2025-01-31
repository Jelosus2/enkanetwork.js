import { ZZZPropertyListAPI } from "../../types/zenless";

export class ZZZStat {
    baseValue: number;
    id: number;
    rolls: number;

    constructor(data: ZZZPropertyListAPI) {
        this.baseValue = data.PropertyValue;
        this.id = data.PropertyId;
        this.rolls = data.PropertyLevel;
    }
}