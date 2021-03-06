import { ReliquaryAPI } from "../types"
import { ReliquaryFlat } from "./ReliquaryFlat"
import { ReliquaryInfo } from "./ReliquaryInfo"

export class Reliquary {
  artifactId: number // changed
  reliquary: ReliquaryInfo 
  flat: ReliquaryFlat 

  constructor(data: ReliquaryAPI) {
    this.artifactId = data.itemId
    this.reliquary = new ReliquaryInfo(data.reliquary)
    this.flat = new ReliquaryFlat(data.flat)
  }
}