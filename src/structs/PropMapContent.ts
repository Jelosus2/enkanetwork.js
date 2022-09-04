import { PropMapContentAPI } from "../types"

export class PropMapContent {
  type: number
  ival: string
  val: string

  constructor(data: PropMapContentAPI) {
    this.type = data.type
    this.ival = data.ival || ""
    this.val = data.val || ""
  }
}