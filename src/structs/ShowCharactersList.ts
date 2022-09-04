import { ShowCharactersListAPI } from "../types"

export class ShowCharactersList {
  characterId: number
  level: number
  costumeId: number | string

  constructor(data: ShowCharactersListAPI) {
    this.characterId = data.avatarId
    this.level = data.level
    this.costumeId = data.costumeId || ""
  }
}