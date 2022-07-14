import { ReliquaryMainstatAPI } from "../types"

export class ReliquaryMainstat {
  mainStat: string // changed
  statValue: number

  constructor(data: ReliquaryMainstatAPI) {
    this.mainStat = data.mainPropId
    this.statValue = data.statValue
  }
}