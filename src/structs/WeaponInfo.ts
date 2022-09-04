import { WeaponInfoAPI } from "../types"
import { AffixMap } from "./AffixMap"

export class WeaponInfo {
  level: number
  promoteLevel: number | string
  refinementLevel: AffixMap | object

  constructor(data: WeaponInfoAPI) {
    this.level = data.level
    this.promoteLevel = data.promoteLevel || ""
    this.refinementLevel = data.affixMap ? new AffixMap(data.affixMap) : {}
  }
}