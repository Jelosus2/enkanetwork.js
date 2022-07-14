import { WeaponInfoAPI } from "../types"
import { AffixMap } from "./AffixMap"

export class WeaponInfo {
  level: number
  promoteLevel: number
  refinementLevel: AffixMap

  constructor(data: WeaponInfoAPI) {
    this.level = data.level
    this.promoteLevel = data.promoteLevel
    this.refinementLevel = new AffixMap(data.affixMap)
  }
}