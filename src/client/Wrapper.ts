import { AssetFinderOptions, WrapperOptions } from "../types";
import { RequestHandler, CacheHandler } from "../handlers";
import { PlayerData, UserBuilds, UserData } from "../structs";
import { PackageError, AssetFinderError } from "../errors";

/**
 * A class for requesting info to the Enka API.
 */
export class Wrapper {
    /**
     * The Request handler.
     */
    private readonly handler: RequestHandler;

    /**
     * The default language to use when no language is specified.
     */
    private language: string;

    /**
     * The list of valid languages that can be used.
     */
    private languages: string[] = [
        "en",
        "ru",
        "vi",
        "th",
        "pt",
        "ko",
        "ja",
        "id",
        "fr",
        "es",
        "de",
        "zh-TW",
        "zh-CN",
        "it",
        "tr",
    ];

    /**
     * Enable cache system.
     */
    private caching?: boolean;

    /**
     * Creates a new `Wrapper` instance.
     * @param options - The options for the Wrapper class.
     * @param options.userAgent - The User Agent used in the request. If not specified, the default User Agent will be used.
     * @param options.language - The language to get the names. If not specified, the default language will be used.
     * @param options.cache - Specify if you want to get cached data. 
     */
    constructor(options?: WrapperOptions) {
        this.handler = new RequestHandler(options);

        this.language = options?.language || "en";
        this.caching = options?.cache;

        if (!this.languages.includes(this.language))
            throw new AssetFinderError("Invalid or not available language.");
    }

    /**
     * Returns the data of a player by the given UID.
     * @param uid - The UID of the player to get the data.
     * @param language - The language to get the names.
     * @returns The data of the player.
     */
    async getPlayer(
      uid: string | number,
      language: string = this.language
    ): Promise<PlayerData> {
        if (!uid) throw new PackageError("The UID parameter is missing");
        if (!this.languages.includes(language))
            throw new AssetFinderError("Invalid or not available language.");

        const cacheClient = this.caching == true
            ? new CacheHandler()
            : undefined;

        cacheClient?.setupCacheDirectory();

        const cache = cacheClient?.get(`player-${uid}`);
        if (cache != undefined) return new PlayerData(cache, language as AssetFinderOptions["language"]);

        const data = await this.handler.player(uid);
        cacheClient?.set(`player-${uid}`, data);

        return new PlayerData(
            data, 
            language as AssetFinderOptions["language"]
        );
    }

    /**
     * Returns the data of an Enka user by the given username.
     * @param username - The username of the user to get the data.
     * @param language - The language used to get the names.
     * @returns The data of the user.
     */
    async getUser(
        username: string,
        language: string = this.language
    ): Promise<UserData> {
        if (!username)
            throw new PackageError("The Username parameter is missing");
        if (!this.languages.includes(language))
            throw new AssetFinderError("Invalid or not available language.");

        const profileData = await this.handler.profile(`api/profile/${username}/hoyos/`);

        return new UserData(
            username,
            profileData,
            language as AssetFinderOptions["language"],
            this
        );
    }

    /**
     * Returns the builds of an Enka profile by the given username and index.
     * @param username - The username of the user to get the data. 
     * @param buildsProfileIndex - The index of the profile to get the builds.
     * @param language - The language to get the names.
     * @returns The builds of the profile.
     */
    async getUserBuilds(
        username: string,
        buildsProfileIndex: number = 0,
        language: string = this.language
    ): Promise<UserBuilds[]> {
        const builds: any[] = []

        if (!username)
            throw new PackageError("The Username parameter is missing");
        if (!this.languages.includes(language))
            throw new AssetFinderError("Invalid or not available language.");    

        const buildsData = await this.handler.profile(`api/profile/${username}/hoyos/${buildsProfileIndex}/builds/`)
        Object.keys(buildsData).forEach((characterId) => builds.push(...buildsData[characterId]))

        return builds.map((data) => new UserBuilds(data, language as AssetFinderOptions["language"]))
    }
}