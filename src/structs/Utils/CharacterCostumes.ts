import { CharacterCostume } from "../../types"

export class CharacterCostumes {
  sideIconName: string
  icon: string
  art: string

  constructor(data: CharacterCostume) {
    this.sideIconName = data.sideIconName || ""
    this.icon = data.icon || ""
    this.art = data.art || ""
  }
}