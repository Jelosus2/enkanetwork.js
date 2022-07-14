import { ReliquaryInfoAPI } from "../types"

export class ReliquaryInfo {
  level: number
  mainStatId: number // changed
  subStatsIdList: number[] // changed

  constructor(data: ReliquaryInfoAPI) {
    this.level = data.level
    this.mainStatId = data.mainPropId
    this.subStatsIdList = data.appendPropIdList
  }
}