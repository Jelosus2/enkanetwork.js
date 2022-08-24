import { WeaponAPI } from "../types"
import { WeaponFlat } from "./WeaponFlat"
import { WeaponInfo } from "./WeaponInfo"

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