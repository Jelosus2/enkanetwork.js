import { WeaponInfoAPI } from "../types"
import { AffixMap } from "./AffixMap"

export class WeaponInfo {
  level: number
  promoteLevel: number
  affixMap: AffixMap

  constructor(data: WeaponInfoAPI) {
    this.level = data.level
    this.promoteLevel = data.promoteLevel
    this.affixMap = new AffixMap(data.affixMap)
  }
}