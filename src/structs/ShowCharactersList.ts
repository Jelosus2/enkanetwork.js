import { AssetImageFinder } from "../client/AssetImageFinder"
import { AssetNameFinder } from "../client/AssetNameFinder"
import { AssetNameFinderOptions, ShowCharactersListAPI } from "../types"
import { CharacterImages } from "./Utils"

export class ShowCharactersList {
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

  name(options?: AssetNameFinderOptions) {
    let language = options?.language
    if (!options?.language) language = 'en'

    const characterHash = new AssetNameFinder({ language }).getCharacterHash(this.characterId).value

    return new AssetNameFinder({ language }).search(characterHash).value
  }
}