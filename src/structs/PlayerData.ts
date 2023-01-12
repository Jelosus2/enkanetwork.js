import { AssetFinderOptions, PlayerDataAPI } from "../types";
import { Characters } from "./Characters";
import { Player } from "./Player";

/**
 * A class that structures the data.
 */
export class PlayerData {
    /**
     * The player's information.
     */
    player: Player;

    /**
     * The player's showcase characters information.
     */
    characters: Characters[];

    /**
     * Time in seconds until the profile get refreshed.
     */
    ttl: number;

    /**
     * The player's UID.
     */
    uid: string;

    /**
     * Creates a new `PlayerData` instance.
     * @param data - The data of the API.
     * @param language - The language to get the names.
     */
    constructor(data: PlayerDataAPI, language: AssetFinderOptions["language"]) {
        this.player = new Player(data.playerInfo, language);
        this.characters = data.avatarInfoList
            ? data.avatarInfoList.map((data) => new Characters(data, language))
            : [];
        this.ttl = data.ttl;
        this.uid = data.uid;
    }
}
