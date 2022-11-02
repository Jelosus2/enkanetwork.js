import { AssetNameFinderOptions, PlayerInfoAPI } from "../types"
import { ShowCharactersList } from "./ShowCharactersList"
import { ProfilePicture } from "./ProfilePicture"
import { NamecardImages } from "./Utils"
import { AssetImageFinder } from "../client/AssetImageFinder"
import { AssetNameFinder } from "../client/AssetNameFinder"

export class PlayerInfo {
  nickname: string
  level: number
  signature: string
  worldLevel: number | string
  nameCardId: Namecard
  finishAchievementNum: number | string
  towerFloorIndex: number | string
  towerLevelIndex: number | string
  showCharactersInfoList: ShowCharactersList[] 
  showNameCardIdList: Namecard[]
  profilePicture: ProfilePicture 

  constructor(data: PlayerInfoAPI) {
    this.nickname = data.nickname
    this.level = data.level
    this.signature = data.signature || ""
    this.worldLevel = data.worldLevel || ""
    this.nameCardId = new Namecard(data.nameCardId)
    this.finishAchievementNum = data.finishAchievementNum || ""
    this.towerFloorIndex = data.towerFloorIndex || ""
    this.towerLevelIndex = data.towerLevelIndex || ""
    this.showCharactersInfoList = data.showAvatarInfoList ? data.showAvatarInfoList.map((data) => new ShowCharactersList(data)) : []
    this.showNameCardIdList = data.showNameCardIdList ? data.showNameCardIdList.map((data) => new Namecard(data)) : []
    this.profilePicture = new ProfilePicture(data.profilePicture)
  }
}

class Namecard {
  id: number
  assets: NamecardImages

  constructor(namecardId: number) {
    this.id = namecardId
    this.assets = new AssetImageFinder().namecard(namecardId)
  }

  name(options?: AssetNameFinderOptions) {
    let language = options?.language
    if (!options?.language) language = 'en'

    const namecardHash = new AssetNameFinder({ language }).getNamecardHash(this.id).value

    return new AssetNameFinder({ language }).search(namecardHash).value
  }
}

