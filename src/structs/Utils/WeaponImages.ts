import { WeaponImage } from "../../types"

export class WeaponImages {
  icon: string | null
  awakenIcon: string | null

  constructor(data: WeaponImage) {
    this.icon = data ? data.icon : null
    this.awakenIcon = data ? data.awakenIcon : null
  }
}