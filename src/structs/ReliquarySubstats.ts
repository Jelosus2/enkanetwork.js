import { ReliquarySubstatsAPI } from "../types"

export class ReliquarySubstats {
  stat: string // changed
  statValue: number

  constructor(data: ReliquarySubstatsAPI) {
    this.stat = data.appendPropId
    this.statValue = data.statValue
  }
}