import { TalentImage } from "../../types"

export class TalentImages {
  icon: string | null

  constructor(data: TalentImage) {
    this.icon = data ? data.icon : null
  }
}