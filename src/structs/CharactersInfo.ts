import { AssetImageFinder } from "../client/AssetImageFinder"
import { AssetNameFinder } from "../client/AssetNameFinder"
import { AssetNameFinderOptions, CharactersInfoAPI, FetterInfoAPI } from "../types"
import { EquipList } from "./EquipList"
import { FightPropMap } from "./FightPropMap"
import { PropMap } from "./PropMap"
import { SkillLevelMap } from "./SkillLevelMap"
import { CharacterImages, TalentImages } from "./AssetImages"

export class CharactersInfo {
  characterId: number
  propMap: PropMap
  stats: FightPropMap
  constellationsIdList: Constellations[]
  skillDepotId: number
  inherentProudSkillList: number[]
  talentsLevelMap: SkillLevelMap 
  proudSkillExtraLevelMap: object
  equipList: EquipList 
  fetterInfo: FetterInfo 
  assets: CharacterImages
  costumeId: number | string

  constructor(data: CharactersInfoAPI) {
    this.characterId = data.avatarId
    this.propMap = new PropMap(data.propMap)
    this.stats = new FightPropMap(data.fightPropMap)
    this.constellationsIdList = data.talentIdList ? data.talentIdList.map((data) => new Constellations(data)) : []
    this.skillDepotId = data.skillDepotId
    this.inherentProudSkillList = data.inherentProudSkillList
    this.talentsLevelMap = new SkillLevelMap(data.skillLevelMap, data.avatarId)
    this.proudSkillExtraLevelMap = data.proudSkillExtraLevelMap || {}
    this.equipList = new EquipList(data.equipList)
    this.fetterInfo = new FetterInfo(data.fetterInfo)
    this.assets = new AssetImageFinder().character(this.characterId)
    this.costumeId = data.costumeId || ""
  }

  name(options?: AssetNameFinderOptions) {
    let language = options?.language
    if (!options?.language) language = 'en'

    const characterHash = new AssetNameFinder({ language }).getCharacterHash(this.characterId).value

    return new AssetNameFinder({ language }).search(characterHash).value
  }
}

class Constellations {
  id: number
  assets: TalentImages

  constructor(constellationId: number) {
    this.id = constellationId
    this.assets = new AssetImageFinder().constellation(this.id)
  }

  name(options?: AssetNameFinderOptions) {
    let language = options?.language
    if (!options?.language) language = 'en'

    const constellationHash = new AssetNameFinder({ language }).getConstellationHash(this.id).value

    return new AssetNameFinder({ language }).search(constellationHash).value
  }
}

class FetterInfo {
  expLevel: number

  constructor(data: FetterInfoAPI) {
    this.expLevel = data.expLevel
  }
}