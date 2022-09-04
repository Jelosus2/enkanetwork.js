import { UserDataAPI } from "../types"
import { PlayerInfo } from "./PlayerInfo"

export class UserProfiles {
    isUidPublic: boolean
    uid: number | string
    playerInfo: PlayerInfo

    constructor(data: UserDataAPI) {
        this.isUidPublic = data.is_uid_public
        this.uid = data.uid || ""
        this.playerInfo = new PlayerInfo(data.player_info)
    }
}