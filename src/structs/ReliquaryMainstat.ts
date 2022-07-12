import { ReliquaryMainstatAPI } from "../types"

export class ReliquaryMainstat {
  mainPropId: string
  statValue: number

  constructor(data: ReliquaryMainstatAPI) {
    this.mainPropId = data.mainPropId
    this.statValue = data.statValue
  }
}