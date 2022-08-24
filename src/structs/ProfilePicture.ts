import { ProfilePictureAPI } from "../types"

export class ProfilePicture {
  characterId: number 

  constructor(data: ProfilePictureAPI) {
    this.characterId = data.avatarId
  }
}