import { ProfilePictureAPI } from "../types"

export class ProfilePicture {
  avatarId: number

  constructor(data: ProfilePictureAPI) {
    this.avatarId = data.avatarId
  }
}