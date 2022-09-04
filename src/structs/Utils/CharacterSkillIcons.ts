import { CharacterSkillIcon } from "../../types"

export class CharacterSkillIcons {
  normalAttack: string
  elementalSkill: string
  elementalBurst: string

  constructor(data: CharacterSkillIcon) {
    this.normalAttack = data.normalAttack || ""
    this.elementalBurst = data.elementalBurst || ""
    this.elementalSkill = data.elementalSkill || ""
  }
}