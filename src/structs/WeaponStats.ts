import { WeaponStatsAPI } from "../types"

export class WeaponStats {
  appendPropId: string
  statValue: number

  constructor(data: WeaponStatsAPI) {
    this.appendPropId = data.appendPropId
    this.statValue = data.statValue
  }
}