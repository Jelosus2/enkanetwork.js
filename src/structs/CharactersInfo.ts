import { CharactersInfoAPI } from "../types"
import { EquipList } from "./EquipList"
import { FetterInfo } from "./FetterInfo"
import { FightPropMap } from "./FightPropMap"
import { PropMap } from "./PropMap"
import { SkillLevelMap } from "./SkillLevelMap"

export class CharactersInfo {
  characterId: number // changed
  propMap: PropMap
  stats: FightPropMap // changed
  constellationsIdList: number[] | null // changed
  skillDepotId: number
  inherentProudSkillList: number[]
  talentsLevelMap: SkillLevelMap // changed
  equipList: EquipList 
  fetterInfo: FetterInfo 
  costumeId: number | null

  constructor(data: CharactersInfoAPI) {
    this.characterId = data.avatarId
    this.propMap = new PropMap(data.propMap)
    this.stats = new FightPropMap(data.fightPropMap)
    this.constellationsIdList = data.talentIdList ? data.talentIdList : null
    this.skillDepotId = data.skillDepotId
    this.inherentProudSkillList = data.inherentProudSkillList
    this.talentsLevelMap = new SkillLevelMap(data.skillLevelMap)
    this.equipList = new EquipList(data.equipList)
    this.fetterInfo = new FetterInfo(data.fetterInfo)
    this.costumeId = data.costumeId ? data.costumeId : null
  }
}