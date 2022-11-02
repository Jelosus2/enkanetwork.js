import { AssetImageFinder } from "../client/AssetImageFinder"
import { AssetNameFinder } from "../client/AssetNameFinder"
import { AssetNameFinderOptions, ProfilePictureAPI } from "../types"
import { CharacterImages } from "./Utils"

export class ProfilePicture {
  characterId: number 
  assets: CharacterImages

  constructor(data: ProfilePictureAPI) {
    this.characterId = data.avatarId
    this.assets = new AssetImageFinder().character(this.characterId)
  }

  name(options?: AssetNameFinderOptions) {
    let language = options?.language
    if (!options?.language) language = 'en'

    const characterHash = new AssetNameFinder({ language }).getCharacterHash(this.characterId).value

    return new AssetNameFinder({ language }).search(characterHash).value
  }
}