import { ReliquaryInfoAPI } from "../types"

export class ReliquaryInfo {
  level: number
  mainPropId: number
  appendPropIdList: number[]

  constructor(data: ReliquaryInfoAPI) {
    this.level = data.level
    this.mainPropId = data.mainPropId
    this.appendPropIdList = data.appendPropIdList
  }
}