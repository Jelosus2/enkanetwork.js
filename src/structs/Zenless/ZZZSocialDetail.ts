import { ZZZSocialDetailAPI } from "../../types/zenless";
import { ZZZMedal } from "./ZZZMedal";
import { ZZZProfileDetail } from "./ZZZProfileDetail";

export class ZZZSocialDetail {
    medals: ZZZMedal[];
    profile: ZZZProfileDetail;
    signature: string;

    constructor(data: ZZZSocialDetailAPI) {
        this.medals = data.MedalList.map((medal) => new ZZZMedal(medal));
        this.profile = new ZZZProfileDetail(data.ProfileDetail);
        this.signature = data.Desc;
    }
}