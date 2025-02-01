import { ZZZPlayerInfoAPI } from "../../types/zenless";
import { ZZZShowcase } from "./ZZZShowcase";
import { ZZZSocialDetail } from "./ZZZSocialDetail";

export class ZZZPlayerInfo {
    showcase: ZZZShowcase[];
    socialDetails: ZZZSocialDetail;

    constructor(data: ZZZPlayerInfoAPI) {
        this.showcase = data.ShowcaseDetail.AvatarList.map((data) => new ZZZShowcase(data));
        this.socialDetails = new ZZZSocialDetail(data.SocialDetail);
    }
}