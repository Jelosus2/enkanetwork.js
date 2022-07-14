import { ShowCharactersListAPI } from "../types"

export class ShowCharactersList {
  characterId: number // changed
  level: number
  costumeId: number | null

  constructor(data: ShowCharactersListAPI) {
    this.characterId = data.avatarId
    this.level = data.level
    this.costumeId = data.costumeId ? data.costumeId : null
  }
}