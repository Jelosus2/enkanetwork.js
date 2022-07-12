import { CharacterCostume } from "../../types"

export class CharacterCostumes {
  sideIconName: string | null
  icon: string | null
  art: string | null

  constructor(data: CharacterCostume) {
    this.sideIconName = data.sideIconName ? data.sideIconName : null
    this.icon = data.icon ? data.icon : null
    this.art = data.art ? data.art: null
  }
}