import { PlayerInfoAPI } from "../types"
import { ShowCharactersList } from "./ShowCharactersList"
import { ProfilePicture } from "./ProfilePicture"

export class PlayerInfo {
  nickname: string
  level: number
  signature: string
  worldLevel: number | string
  nameCardId: number
  finishAchievementNum: number | string
  towerFloorIndex: number | string
  towerLevelIndex: number | string
  showCharactersInfoList: ShowCharactersList[] 
  showNameCardIdList: number[]
  profilePicture: ProfilePicture 

  constructor(data: PlayerInfoAPI) {
    this.nickname = data.nickname
    this.level = data.level
    this.signature = data.signature || ""
    this.worldLevel = data.worldLevel || ""
    this.nameCardId = data.nameCardId
    this.finishAchievementNum = data.finishAchievementNum || ""
    this.towerFloorIndex = data.towerFloorIndex || ""
    this.towerLevelIndex = data.towerLevelIndex || ""
    this.showCharactersInfoList = data.showAvatarInfoList ? data.showAvatarInfoList.map((data) => new ShowCharactersList(data)) : []
    this.showNameCardIdList = data.showNameCardIdList || []
    this.profilePicture = new ProfilePicture(data.profilePicture)
  }
}