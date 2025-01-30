import { ZZZProfileDetailAPI } from "../../types/zenless";

export class ZZZProfileDetail {
    nickname: string;
    avatarId: number;
    uid: number;
    level: number;
    title: number;
    profileId: number;
    callingCardId: number;
    
    constructor(data: ZZZProfileDetailAPI) {
        this.nickname = data.Nickname;
        this.avatarId = data.AvatarId;
        this.uid = data.Uid;
        this.level = data.Level;
        this.title = data.Title;
        this.profileId = data.ProfileId;
        this.callingCardId = data.CallingCardId;
    }
}