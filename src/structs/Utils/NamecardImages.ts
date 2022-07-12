import { NamecardImage } from "../../types"

export class NamecardImages {
  icon: string | null
  picPath: string[] | null

  constructor(data: NamecardImage) {
    this.icon = data ? data.icon : null
    this.picPath = data ? data.picPath : null
  }
}