import { CharacterCostume, CharacterImage, CharacterSkillIcon } from "../../types"

export class CharacterImages {
  icon: string
  sideIcon: string
  gachaIcon: string
  constellations: string[]
  talents: CharacterSkillIcons | object
  costumes: CharacterCostumes[]

  constructor(data: CharacterImage) {
    this.icon = data ? data.icon : ""
    this.sideIcon = data ? data.sideIcon : ""
    this.gachaIcon = data ? data.gachaIcon : ""
    this.constellations = data ? data.constellations : []
    this.talents = data ? new CharacterSkillIcons(data.skills) : {}
    this.costumes = data && data.costumes ? data.costumes.map((data) => new CharacterCostumes(data)) : []
  }
}

class CharacterCostumes {
  sideIconName: string
  icon: string
  art: string

  constructor(data: CharacterCostume) {
    this.sideIconName = data.sideIconName || ""
    this.icon = data.icon || ""
    this.art = data.art || ""
  }
}

class CharacterSkillIcons {
  normalAttack: string
  elementalSkill: string
  elementalBurst: string

  constructor(data: CharacterSkillIcon) {
    this.normalAttack = data.normalAttack || ""
    this.elementalBurst = data.elementalBurst || ""
    this.elementalSkill = data.elementalSkill || ""
  }
}