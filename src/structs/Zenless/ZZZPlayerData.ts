import { ZZZPlayerDataAPI } from "../../types/zenless";
import { ZZZPlayerInfo } from "./ZZZPlayerInfo";

export class ZZZPlayerData {
    playerInfo: ZZZPlayerInfo;
    uid: string;
    ttl: number;

    constructor(data: ZZZPlayerDataAPI) {
        this.playerInfo = new ZZZPlayerInfo(data.PlayerInfo);
        this.uid = data.uid;
        this.ttl = data.ttl;
    }
}