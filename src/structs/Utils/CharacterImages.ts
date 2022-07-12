import { CharacterImage } from "../../types"
import { CharacterCostumes } from "./CharacterCostumes"
import { CharacterSkillIcons } from "./CharacterSkillIcons"

export class CharacterImages {
  icon: string | null
  sideIcon: string | null
  constellations: string[] | null
  talents: CharacterSkillIcons | null
  costumes: CharacterCostumes[] | null 

  constructor(data: CharacterImage) {
    this.icon = data ? data.icon : null
    this.sideIcon = data ? data.sideIcon : null
    this.constellations = data ? data.constellations : null
    this.talents = data ? new CharacterSkillIcons(data.skills) : null
    this.costumes = data && data.costumes ? data.costumes.map((data) => new CharacterCostumes(data)) : null
  }
}