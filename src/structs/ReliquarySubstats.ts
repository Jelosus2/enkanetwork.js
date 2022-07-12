import { ReliquarySubstatsAPI } from "../types"

export class ReliquarySubstats {
  appendPropId: string
  statValue: number

  constructor(data: ReliquarySubstatsAPI) {
    this.appendPropId = data.appendPropId
    this.statValue = data.statValue
  }
}