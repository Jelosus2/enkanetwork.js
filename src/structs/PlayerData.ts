import { RequestHandler } from "../handlers";
import { AssetFinderOptions, PlayerDataAPI } from "../types";
import { Characters } from "./Characters";
import { HoyoBuilds } from "./HoyoBuilds";
import { Hoyos } from "./Hoyos";
import { Owner } from "./Owner";
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
     * The Enka profile data that belongs to the UID.
     */
    owner: Owner;

    /**
     * The player's UID.
     */
    uid: string;

    /**
     * The Request Handler.
     */
    private readonly handler: RequestHandler;

    /**
     * Creates a new `PlayerData` instance.
     * @param data - The data of the API.
     * @param language - The language to get the names.
     */
    constructor(data: PlayerDataAPI, private language: AssetFinderOptions["language"]) {
        this.player = data.playerInfo ? new Player(data.playerInfo, this.language) : {} as Player;
        this.characters = data.avatarInfoList
            ? data.avatarInfoList.map((data) => new Characters(data, this.language))
            : [];
        this.ttl = data.ttl;
        this.owner = data.owner ? new Owner(data.owner) : {} as Owner;
        this.uid = data.uid;
        
        this.handler = new RequestHandler();
    }

    async getHoyo(): Promise<Hoyos> {
        if (!this.owner.hash) return {} as Hoyos;

        const data = await this.handler.profile(`${this.owner.username}/hoyos/${this.owner.hash}`);

        return new Hoyos(
            data, 
            this.language,
            this.owner.username
        );
    }

    async getHoyoBuilds(): Promise<HoyoBuilds[]> {
        const builds: any[] = [];

        if (!this.owner.hash) return [];

        const data = await this.handler.profile(`${this.owner.username}/hoyos/${this.owner.hash}/builds`);
        Object.keys(data).forEach((characterId) => builds.push(...data[characterId]));

        return builds.map((data) => new HoyoBuilds(data, this.language));
    }
}
