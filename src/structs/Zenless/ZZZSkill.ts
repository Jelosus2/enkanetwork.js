import { ZZZSkillLevelListAPI } from "../../types/zenless";

export class ZZZSkill {
    level: number;
    index: number;

    constructor(data: ZZZSkillLevelListAPI) {
        this.level = data.Level;
        this.index = data.Index;
    }
}