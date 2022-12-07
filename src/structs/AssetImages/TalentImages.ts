import { TalentImage } from "../../types"

export class TalentImages {
  icon: string

  constructor(data: TalentImage) {
    this.icon = data ? data.icon : ""
  }
}