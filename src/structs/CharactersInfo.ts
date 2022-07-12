import { CharactersInfoAPI } from "../types"
import { EquipList } from "./EquipList"
import { FetterInfo } from "./FetterInfo"
import { FightPropMap } from "./FightPropMap"
import { PropMap } from "./PropMap"
import { SkillLevelMap } from "./SkillLevelMap"

export class CharactersInfo {
  avatarId: number
  propMap: PropMap
  fightPropMap: FightPropMap
  talentIdList: number[] | null
  skillDepotId: number
  inherentProudSkillList: number[]
  skillLevelMap: SkillLevelMap 
  equipList: EquipList 
  fetterInfo: FetterInfo 
  costumeId: number | null

  constructor(data: CharactersInfoAPI) {
    this.avatarId = data.avatarId
    this.propMap = new PropMap(data.propMap)
    this.fightPropMap = new FightPropMap(data.fightPropMap)
    this.talentIdList = data.talentIdList ? data.talentIdList : null
    this.skillDepotId = data.skillDepotId
    this.inherentProudSkillList = data.inherentProudSkillList
    this.skillLevelMap = new SkillLevelMap(data.skillLevelMap)
    this.equipList = new EquipList(data.equipList)
    this.fetterInfo = new FetterInfo(data.fetterInfo)
    this.costumeId = data.costumeId ? data.costumeId : null
  }
}