import { ReliquaryFlatAPI } from "../types"
import { IconLinks } from "./AssetLink"
import { ReliquaryMainstat } from "./ReliquaryMainstat"
import { ReliquarySubstats } from "./ReliquarySubstats"

export class ReliquaryFlat {
  nameTextMapHash: string
  setNameTextMapHash: string
  rankLevel: number
  reliquaryMainstat: ReliquaryMainstat 
  reliquarySubstats: ReliquarySubstats[]
  itemType: string
  icon: IconLinks
  equipType: string

  constructor(data: ReliquaryFlatAPI) {
    this.nameTextMapHash = data.nameTextMapHash
    this.setNameTextMapHash = data.setNameTextMapHash
    this.rankLevel = data.rankLevel
    this.reliquaryMainstat = new ReliquaryMainstat(data.reliquaryMainstat)
    this.reliquarySubstats = data.reliquarySubstats.map((data) => new ReliquarySubstats(data))
    this.itemType = data.itemType
    this.icon = new IconLinks(data.icon)
    this.equipType = data.equipType
  }
}