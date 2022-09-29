import { CharactersInfoAPI } from "../types"
import { EquipList } from "./EquipList"
import { FetterInfo } from "./FetterInfo"
import { FightPropMap } from "./FightPropMap"
import { PropMap } from "./PropMap"
import { SkillLevelMap } from "./SkillLevelMap"

export class UserBuildAvatarData {
    propMap: PropMap
    characterId: number
    costumeId: number | string
    equipList: EquipList
    fetterInfo: FetterInfo
    stats: FightPropMap
    skillDepotId: number
    constellationsIdList: number[]
    talentsLevelMap: SkillLevelMap
    inherentProudSkillList: number[]
    proudSkillExtraLevelMap: any

    constructor(data: CharactersInfoAPI) {
        this.propMap = new PropMap(data.propMap)
        this.characterId = data.avatarId
        this.costumeId = data.costumeId || ""
        this.equipList = new EquipList(data.equipList)
        this.fetterInfo = new FetterInfo(data.fetterInfo)
        this.stats = new FightPropMap(data.fightPropMap)
        this.skillDepotId = data.skillDepotId
        this.constellationsIdList = data.talentIdList || []
        this.talentsLevelMap = new SkillLevelMap(data.skillLevelMap, data.avatarId)
        this.inherentProudSkillList = data.inherentProudSkillList
        this.proudSkillExtraLevelMap = data.proudSkillExtraLevelMap || {}
    }
}