import { Reliquary } from "./Reliquary"
import { Weapon } from "./Weapon"

export class EquipList {
  artifacts: Reliquary[] | null
  weapon: Weapon[]

  constructor(data: any[]) {
    this.artifacts = data.find(x => x.flat.itemType == 'ITEM_RELIQUARY') ? data.filter(x => x.flat.itemType == 'ITEM_RELIQUARY').map((data) => new Reliquary(data)) : null
    this.weapon = data.filter(x => x.flat.itemType == 'ITEM_WEAPON').map((data) => new Weapon(data))
  }
}