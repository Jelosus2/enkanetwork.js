import { AssetFinder } from "../client";
import { AssetFinderOptions, UserBuildsAPI } from "../types";
import { Characters } from "./Characters";

/**
 * A class that structures the builds data.
 */
export class UserBuilds {
    /**
     * The build's ID.
     */
    id: number;

    /**
     * The build's name.
     */
    name: string;

    /**
     * The build's character ID.
     */
    characterId: string;

    /**
     * The build's character name.
     */
    characterName: string;

    /**
     * The build's character info.
     */
    characterInfo: Characters;

    /**
     * The build's order.
     */
    order: number;

    /**
     * If the build is live.
     */
    live: boolean;

    /**
     * The build settings.
     */
    settings: object;

    /**
     * If the build is public.
     */
    isPublic: boolean;

    /**
     * Creates a new `UserBuilds` instance.
     * @param data - The data of the user builds.
     * @param language - The language to get the names.
     */
    constructor(data: UserBuildsAPI, language: AssetFinderOptions["language"]) {
        this.id = data.id;
        this.name = data.name;
        this.characterId = data.avatar_id;
        this.characterName = new AssetFinder({ language }).character(this.characterId).name;
        this.characterInfo = new Characters(data.avatar_data, language);
        this.order = data.order;
        this.live = data.live;
        this.settings = data.settings;
        this.isPublic = data.is_public;
    }
}
