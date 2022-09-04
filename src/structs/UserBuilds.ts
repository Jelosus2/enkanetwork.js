import { UserBuildsAPI } from "../types"
import { UserBuildAvatarData } from "./UserBuildAvatarData"

export class UserBuilds {
    id: number
    name: string
    characterId: string
    avatarData: UserBuildAvatarData
    order: number
    live: boolean
    settings: object
    isPublic: boolean

    constructor(data: UserBuildsAPI) {
        this.id = data.id
        this.name = data.name
        this.characterId = data.avatar_id
        this.avatarData = new UserBuildAvatarData(data.avatar_data)
        this.order = data.order
        this.live = data.live
        this.settings = data.settings
        this.isPublic = data.is_public
    }
}