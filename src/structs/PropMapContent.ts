import { PropMapContentAPI } from "../types"

export class PropMapContent {
  type: number
  ival: string
  val: string | null

  constructor(data: PropMapContentAPI) {
    this.type = data.type
    this.ival = data.ival
    this.val = data.val ? data.val : null
  }
}