import { WeaponAPI } from "../types"
import { WeaponFlat } from "./WeaponFlat"
import { WeaponInfo } from "./WeaponInfo"

export class Weapon {
  itemId: number
  weaponInfo: WeaponInfo
  flat: WeaponFlat

  constructor(data: WeaponAPI) {
    this.itemId = data.itemId
    this.weaponInfo = new WeaponInfo(data.weapon)
    this.flat = new WeaponFlat(data.flat)
  }
}