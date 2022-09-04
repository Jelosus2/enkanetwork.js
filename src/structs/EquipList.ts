import { Reliquary } from "./Reliquary"
import { Weapon } from "./Weapon"

export class EquipList {
  artifacts: Reliquary[]
  weapon: Weapon

  constructor(data: any[]) {
    this.artifacts = data.find(x => x.flat.itemType == 'ITEM_RELIQUARY') ? data.filter(x => x.flat.itemType == 'ITEM_RELIQUARY').map((data) => new Reliquary(data)) : []
    this.weapon = new Weapon(data.filter(x => x.flat.itemType == 'ITEM_WEAPON')[0])
  }
}