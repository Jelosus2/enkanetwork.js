import { ReliquaryInfoAPI } from "../types"

export class ReliquaryInfo {
  level: number
  mainStatId: number 
  subStatsIdList: number[] 

  constructor(data: ReliquaryInfoAPI) {
    this.level = data.level
    this.mainStatId = data.mainPropId
    this.subStatsIdList = data.appendPropIdList ? data.appendPropIdList : []
  }
}