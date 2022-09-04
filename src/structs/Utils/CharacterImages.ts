import { CharacterImage } from "../../types"
import { CharacterCostumes } from "./CharacterCostumes"
import { CharacterSkillIcons } from "./CharacterSkillIcons"

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