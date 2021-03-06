import { WeaponStatsAPI } from "../types"

export class WeaponStats {
  stat: string // changed
  statValue: number

  constructor(data: WeaponStatsAPI) {
    this.stat = data.appendPropId
    this.statValue = data.statValue
  }
}