import { CharacterSkillIcon } from "../../types"

export class CharacterSkillIcons {
  normalAttack: string | null
  elementalSkill: string | null
  elementalBurst: string | null

  constructor(data: CharacterSkillIcon) {
    this.normalAttack = data.normalAttack ? data.normalAttack : null
    this.elementalBurst = data.elementalBurst ? data.elementalBurst : null
    this.elementalSkill = data.elementalSkill ? data.elementalSkill : null
  }
}