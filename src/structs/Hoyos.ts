import { RequestHandler } from "../handlers";
import { AssetFinderOptions, HoyoAPI } from "../types";
import { HoyoBuilds } from "./HoyoBuilds";
import { Player } from "./Player";

/**
 * A class that structures the data of the profile hoyos.
 */
export class Hoyos {
    /**
     * If the UID of the user's profile is public.
     */
    isUidPublic: boolean;

    /**
     * If the hoyo is public.
     */
    public: boolean;

    /**
     * If the hoyo is verified.
     */
    verified: boolean;

    /**
     * The UID of the hoyo.
     */
    uid: string

    /**
     * The hoyo's player data.
     */
    player: Player;

    /**
     * The hash of the hoyo.
     */
    hash: string;

    /**
     * The region of the hoyo.
     */
    region: string;

    /**
     * The display order of the hoyo. 
     */
    order: number | string;

    /**
     * Creates a new `Hoyos` instance.
     * @param data - The data of the hoyos.
     * @param language - The language to get the name.
     * @param username - The username of the profile.
     */
    constructor(
        data: HoyoAPI,
        private language: AssetFinderOptions["language"],
        private username: string
    ) {
        this.isUidPublic = data.uid_public;
        this.public = data.public;
        this.verified = data.verified;
        this.uid = data.uid || "";
        this.player = data.player_info 
            ? new Player(data.player_info, language)
            : {} as Player;
        this.hash = data.hash;
        this.region = data.region;
        this.order = data.order;
    }

    async getHoyoBuilds(): Promise<HoyoBuilds[]> {
        const handler: RequestHandler = new RequestHandler();
        const builds: any[] = [];

        const data = await handler.profile(`${this.username}/hoyos/${this.hash}/builds`);
        if (Object.keys(data).length == 0) return [];

        Object.keys(data).forEach((characterId) => builds.push(...data[characterId]));

        return builds.map((data) => new HoyoBuilds(data, this.language as AssetFinderOptions["language"]));
    }
}
