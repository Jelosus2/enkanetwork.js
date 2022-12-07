import { AssetNameFinderOptions, PlayerInfoAPI, ProfilePictureAPI, ShowCharactersListAPI } from "../types"
import { NamecardImages, CharacterImages } from "./AssetImages"
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

class ShowCharactersList {
  characterId: number
  level: number
  costumeId: number | string
  assets: CharacterImages

  constructor(data: ShowCharactersListAPI) {
    this.characterId = data.avatarId
    this.level = data.level
    this.costumeId = data.costumeId || ""
    this.assets = new AssetImageFinder().character(this.characterId)
  }

  async name(options?: AssetNameFinderOptions) {
    let language = options?.language
    if (!options?.language) language = 'en'

    const characterHash = new AssetNameFinder({ language }).getCharacterHash(this.characterId).value

    return new AssetNameFinder({ language }).search(characterHash).value
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

class ProfilePicture {
  characterId: number 
  assets: CharacterImages

  constructor(data: ProfilePictureAPI) {
    this.characterId = data.avatarId
    this.assets = new AssetImageFinder().character(this.characterId)
  }

  async name(options?: AssetNameFinderOptions) {
    let language = options?.language
    if (!options?.language) language = 'en'

    const characterHash = new AssetNameFinder({ language }).getCharacterHash(this.characterId).value

    return new AssetNameFinder({ language }).search(characterHash).value
  }
}