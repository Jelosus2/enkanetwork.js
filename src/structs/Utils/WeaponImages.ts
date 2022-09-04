import { WeaponImage } from "../../types"

export class WeaponImages {
  icon: string
  awakenIcon: string

  constructor(data: WeaponImage) {
    this.icon = data ? data.icon : ""
    this.awakenIcon = data ? data.awakenIcon : ""
  }
}