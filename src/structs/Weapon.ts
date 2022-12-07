import { AssetNameFinder } from "../client/AssetNameFinder"
import { AssetNameFinderOptions, WeaponAPI, WeaponFlatAPI, WeaponInfoAPI, WeaponStatsAPI } from "../types"
import { IconLinks } from "./AssetLink"

export class Weapon {
  weaponId: number 
  weaponInfo: WeaponInfo
  flat: WeaponFlat

  constructor(data: WeaponAPI) {
    this.weaponId = data.itemId
    this.weaponInfo = new WeaponInfo(data.weapon)
    this.flat = new WeaponFlat(data.flat)
  }
}

class WeaponFlat {
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

class WeaponStats {
  stat: string 
  statValue: number

  constructor(data: WeaponStatsAPI) {
    this.stat = data.appendPropId
    this.statValue = data.statValue
  }
}

export class WeaponInfo {
  level: number
  promoteLevel: number | string
  refinementLevel: AffixMap | object

  constructor(data: WeaponInfoAPI) {
    this.level = data.level
    this.promoteLevel = data.promoteLevel || ""
    this.refinementLevel = data.affixMap ? new AffixMap(data.affixMap) : {}
  }
}

class AffixMap {
  id: number
  value: number

  constructor(data: any) {
    this.id = +Object.keys(data)[0]
    this.value = data[Object.keys(data)[0]]
  }
}