import { ProfilePictureAPI } from "../types"

export class ProfilePicture {
  characterId: number // changed

  constructor(data: ProfilePictureAPI) {
    this.characterId = data.avatarId
  }
}