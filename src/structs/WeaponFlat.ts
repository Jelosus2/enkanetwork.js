import { WeaponFlatAPI } from "../types"
import { IconLinks } from "./AssetLink"
import { WeaponStats } from "./WeaponStats"

export class WeaponFlat {
  nameTextMapHash: string
  rankLevel: number
  weaponStats: WeaponStats[]
  itemType: string
  icon: IconLinks

  constructor(data: WeaponFlatAPI) {
    this.nameTextMapHash = data.nameTextMapHash
    this.rankLevel = data.rankLevel
    this.weaponStats = data.weaponStats.map((data) => new WeaponStats(data))
    this.itemType = data.itemType
    this.icon = new IconLinks(data.icon)
  }
}