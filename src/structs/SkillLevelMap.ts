import { Skill } from "./Skill"

export class SkillLevelMap {
  normalAttacks: Skill
  elementalSkill: Skill
  elementalBurst: Skill

  constructor(data: any) {
    this.normalAttacks = new Skill(data[Object.keys(data)[0]], +Object.keys(data)[0])
    this.elementalSkill = new Skill(data[Object.keys(data)[1]], +Object.keys(data)[1])
    this.elementalBurst = new Skill(data[Object.keys(data)[2]], +Object.keys(data)[2])
  }
}