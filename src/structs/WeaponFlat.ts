import { AssetNameFinder } from "../client/AssetNameFinder"
import { AssetNameFinderOptions, WeaponFlatAPI } from "../types"
import { IconLinks } from "./AssetLink"
import { WeaponStats } from "./WeaponStats"

export class WeaponFlat {
  nameTextMapHash: string
  stars: number 
  weaponStats: WeaponStats[]
  itemType: string
  icon: IconLinks

  constructor(data: WeaponFlatAPI) {
    this.nameTextMapHash = data.nameTextMapHash
    this.stars = data.rankLevel
    this.weaponStats = data.weaponStats.map((data) => new WeaponStats(data))
    this.itemType = data.itemType
    this.icon = new IconLinks(data.icon)
  }

  name(options?: AssetNameFinderOptions) {
    let language = options?.language
    if (!options?.language) language = 'en'

    return new AssetNameFinder({ language }).search(this.nameTextMapHash).value
  }
}