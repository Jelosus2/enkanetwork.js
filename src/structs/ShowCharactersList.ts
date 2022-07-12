import { ShowCharactersListAPI } from "../types"

export class ShowCharactersList {
  avatarId: number
  level: number
  costumeId: number | null

  constructor(data: ShowCharactersListAPI) {
    this.avatarId = data.avatarId
    this.level = data.level
    this.costumeId = data.costumeId ? data.costumeId : null
  }
}