import { ReliquaryMainstatAPI } from "../types"

export class ReliquaryMainstat {
  mainStat: string 
  statValue: number

  constructor(data: ReliquaryMainstatAPI) {
    this.mainStat = data.mainPropId
    this.statValue = data.statValue
  }
}