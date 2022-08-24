import { PlayerInfoAPI } from "../types"
import { ShowCharactersList } from "./ShowCharactersList"
import { ProfilePicture } from "./ProfilePicture"

export class PlayerInfo {
  nickname: string
  level: number
  signature: string | null
  worldLevel: number | null
  nameCardId: number
  finishAchievementNum: number | null
  towerFloorIndex: number | null
  towerLevelIndex: number | null
  showCharactersInfoList: ShowCharactersList[] | null 
  showNameCardIdList: number[] | null
  profilePicture: ProfilePicture 

  constructor(data: PlayerInfoAPI) {
    this.nickname = data.nickname
    this.level = data.level
    this.signature = data.signature ? data.signature : null
    this.worldLevel = data.worldLevel ? data.worldLevel : null
    this.nameCardId = data.nameCardId
    this.finishAchievementNum = data.finishAchievementNum ? data.finishAchievementNum : null
    this.towerFloorIndex = data.towerFloorIndex ? data.towerFloorIndex : null
    this.towerLevelIndex = data.towerLevelIndex ? data.towerLevelIndex : null
    this.showCharactersInfoList = data.showAvatarInfoList ? data.showAvatarInfoList.map((data) => new ShowCharactersList(data)) : null
    this.showNameCardIdList = data.showNameCardIdList ? data.showNameCardIdList : null
    this.profilePicture = new ProfilePicture(data.profilePicture)
  }
}