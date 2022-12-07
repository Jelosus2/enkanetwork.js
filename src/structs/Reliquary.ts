import { AssetNameFinder } from "../client/AssetNameFinder"
import { AssetNameFinderOptions, ReliquaryAPI, ReliquaryFlatAPI, ReliquaryInfoAPI, ReliquaryMainstatAPI, ReliquarySubstatsAPI } from "../types"
import { IconLinks } from "./AssetLink"

export class Reliquary {
  artifactId: number 
  reliquary: ReliquaryInfo 
  flat: ReliquaryFlat 

  constructor(data: ReliquaryAPI) {
    this.artifactId = data.itemId
    this.reliquary = new ReliquaryInfo(data.reliquary)
    this.flat = new ReliquaryFlat(data.flat)
  }
}

class ReliquaryFlat {
  nameTextMapHash: string
  setNameTextMapHash: string
  stars: number
  artifactMainstat: ReliquaryMainstat 
  artifactSubstats: ReliquarySubstats[]
  itemType: string
  icon: IconLinks
  equipType: string

  constructor(data: ReliquaryFlatAPI) {
    this.nameTextMapHash = data.nameTextMapHash
    this.setNameTextMapHash = data.setNameTextMapHash
    this.stars = data.rankLevel
    this.artifactMainstat = new ReliquaryMainstat(data.reliquaryMainstat)
    this.artifactSubstats = data.reliquarySubstats ? data.reliquarySubstats.map((data) => new ReliquarySubstats(data)) : []
    this.itemType = data.itemType
    this.icon = new IconLinks(data.icon)
    this.equipType = data.equipType
  }

  name(options?: AssetNameFinderOptions) {
    let language = options?.language
    if (!options?.language) language = 'en'

    return new AssetNameFinder({ language }).search(this.nameTextMapHash).value
  }

  setName(options?: AssetNameFinderOptions) {
    let language = options?.language
    if (!options?.language) language = 'en'

    return new AssetNameFinder({ language }).search(this.setNameTextMapHash).value
  }
}

class ReliquaryInfo {
  level: number
  mainStatId: number 
  subStatsIdList: number[] 

  constructor(data: ReliquaryInfoAPI) {
    this.level = data.level
    this.mainStatId = data.mainPropId
    this.subStatsIdList = data.appendPropIdList ? data.appendPropIdList : []
  }
}

class ReliquaryMainstat {
  mainStat: string 
  statValue: number

  constructor(data: ReliquaryMainstatAPI) {
    this.mainStat = data.mainPropId
    this.statValue = data.statValue
  }
}

class ReliquarySubstats {
  stat: string
  statValue: number

  constructor(data: ReliquarySubstatsAPI) {
    this.stat = data.appendPropId
    this.statValue = data.statValue
  }
}