import { AssetFinderOptions, WrapperOptions } from "../../types";
import { RequestHandler, CacheHandler } from "../../handlers";
import { EnkaProfile, HoyoBuilds, Hoyos, SRPlayerData } from "../../structs";
import { PackageError, AssetFinderError } from "../../errors";

/**
 * A class for requesting Star Rail info to the Enka API.
 */
export class StarRailClient {
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
  ];

  /**
   * Enable cache system.
   */
  private caching?: boolean;

  /**
   * Creates a new `StarRailClient` instance.
   * @param options - The options from the Wrapper class.
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
   * Returns the data of a Star Rail player by the given UID.
   * @param uid - The UID of the player to get the data.
   * @param language - The language to get the names.
   * @returns The data of the Star Rail player.
   */
  async getPlayer(
    uid: string | number,
    language: string = this.language
  ): Promise<SRPlayerData> {
    if (!uid) 
      throw new PackageError("The UID parameter is missing");
    if (!this.languages.includes(language))
      throw new AssetFinderError("Invalid or not available language.");

    const cacheClient = this.caching == true ? new CacheHandler() : undefined;

    cacheClient?.setupCacheDirectory();

    const cache = cacheClient?.get(`player-sr-${uid}`);
    if (cache != undefined) return new SRPlayerData(cache, language);

    const data = await this.handler.player(uid, "starrail");
    cacheClient?.set(`player-sr-${uid}`, data);

    return new SRPlayerData(data, language);
  }

  /**
   * Returns the data of an Enka profile by the given username.
   * @param username - The username of the profile to get the data.
   * @returns The data of the profile.
   */
  async getEnkaProfile(username: string): Promise<EnkaProfile> {
    if (!username) 
      throw new PackageError("The Username parameter is missing");

    const data = await this.handler.profile(username);
    if (!data.username) return {} as EnkaProfile;

    return new EnkaProfile(data);
  }

  /**
   * Returns the data of the Star Rail hoyos of an Enka profile by the given username.
   * @param username - The username of the profile to get the data.
   * @param language - The language to get the names.
   * @returns The data of the profile Star Rail hoyos.
   */
  async getEnkaHoyos(
    username: string,
    language: string = this.language
  ): Promise<Hoyos[]> {
    const hoyos: any[] = [];

    if (!username) 
      throw new PackageError("The Username parameter is missing");
    if (!this.languages.includes(language))
      throw new AssetFinderError("Invalid or not available language.");

    const data = await this.handler.profile(`${username}/hoyos`);
    if (Object.keys(data).length == 0) return [];

    Object.keys(data).forEach((hash) => {
      if (data[hash].hoyo_type == 1) {
        hoyos.push(data[hash]);
      }
    });

    if (hoyos.length == 0) return [];

    return hoyos.map(
      (data) =>
        new Hoyos(data, language as AssetFinderOptions["language"], username)
    );
  }

  /**
   * Returns the Star Rail builds of an Enka hoyo by the given username and profile hash.
   * @param username - The username of the profile to get the data.
   * @param hash - The hash of the Star Rail hoyo to get the builds.
   * @param language - The language to get the names.
   * @returns The Star Rail builds of the profile.
   */
  async getEnkaHoyoBuilds(
    username: string,
    hash: string,
    language: string = this.language
  ): Promise<HoyoBuilds[]> {
    const builds: any[] = [];

    if (!username) 
      throw new PackageError("The Username parameter is missing");
    if (!this.languages.includes(language))
      throw new AssetFinderError("Invalid or not available language.");
    if (!hash) 
      throw new PackageError("The Hash parameter is missing");

    const data = await this.handler.profile(`${username}/hoyos/${hash}/builds`);
    if (Object.keys(data).length == 0) return [];

    Object.keys(data).forEach((characterId) => {
      if (data[characterId].find((build: any) => build.hoyo_type == 1)) {
        builds.push(...data[characterId]);
      }
    });

    if (builds.length == 0) return [];

    return builds.map(
      (data) => new HoyoBuilds(data, language as AssetFinderOptions["language"])
    );
  }
}