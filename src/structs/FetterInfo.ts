import { FetterInfoAPI } from "../types"

export class FetterInfo {
  expLevel: number

  constructor(data: FetterInfoAPI) {
    this.expLevel = data.expLevel
  }
}