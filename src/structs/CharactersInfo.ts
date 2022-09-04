import { CharactersInfoAPI } from "../types"
import { EquipList } from "./EquipList"
import { FetterInfo } from "./FetterInfo"
import { FightPropMap } from "./FightPropMap"
import { PropMap } from "./PropMap"
import { SkillLevelMap } from "./SkillLevelMap"

export class CharactersInfo {
  characterId: number
  propMap: PropMap
  stats: FightPropMap
  constellationsIdList: number[]
  skillDepotId: number
  inherentProudSkillList: number[]
  talentsLevelMap: SkillLevelMap 
  equipList: EquipList 
  fetterInfo: FetterInfo 
  costumeId: number | string

  constructor(data: CharactersInfoAPI) {
    this.characterId = data.avatarId
    this.propMap = new PropMap(data.propMap)
    this.stats = new FightPropMap(data.fightPropMap)
    this.constellationsIdList = data.talentIdList || []
    this.skillDepotId = data.skillDepotId
    this.inherentProudSkillList = data.inherentProudSkillList
    this.talentsLevelMap = new SkillLevelMap(data.skillLevelMap)
    this.equipList = new EquipList(data.equipList)
    this.fetterInfo = new FetterInfo(data.fetterInfo)
    this.costumeId = data.costumeId || ""
  }
}