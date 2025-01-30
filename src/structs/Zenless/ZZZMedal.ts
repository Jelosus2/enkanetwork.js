import { ZZZMedalListAPI } from "../../types/zenless";

export class ZZZMedal {
    medalType: number;
    value: number;
    iconId: number;

    constructor(data: ZZZMedalListAPI) {
        this.medalType = data.MedalType;
        this.value = data.Value;
        this.iconId = data.MedalIcon;
    }
}