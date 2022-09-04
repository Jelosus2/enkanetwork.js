import { NamecardImage } from "../../types"

export class NamecardImages {
  icon: string
  picPath: string[]

  constructor(data: NamecardImage) {
    this.icon = data ? data.icon : ""
    this.picPath = data ? data.picPath : []
  }
}