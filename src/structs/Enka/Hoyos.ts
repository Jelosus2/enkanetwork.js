import { RequestHandler } from "../../handlers";
import { HoyoBuilds } from "./HoyoBuilds";
import { Player } from "../Genshin";
import { SRPlayer } from "../StarRail";
import {
  AssetFinderOptions,
  HoyoAPI,
  PlayerAPI,
  SRPlayerDetails,
} from "../../types";

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
  uid: string;

  /**
   * The hoyo's player data.
   */
  player: Player | SRPlayer;

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
   * The order of character IDs for display.
   */
  avatar_order: number[];

  /**
   * The type of the hoyo (Genshin or StarRail)
   */
  type: number;

  /**
   * Creates a new `Hoyos` instance.
   * @param data - The data of the hoyos.
   * @param language - The language to get the name.
   * @param username - The username of the profile.
   */
  constructor(
    data: HoyoAPI,
    private language: AssetFinderOptions["language"],
    private readonly username: string
  ) {
    this.isUidPublic = data.uid_public;
    this.public = data.public;
    this.verified = data.verified;
    this.uid = data.uid || "";
    this.player =
      data.player_info && data.hoyo_type == 0
        ? new Player(data.player_info as PlayerAPI, language)
        : data.player_info && data.hoyo_type == 1
          ? new SRPlayer(data.player_info as SRPlayerDetails)
          : ({} as Player | SRPlayer);
    this.hash = data.hash;
    this.region = data.region;
    this.order = data.order;
    this.avatar_order = data.avatar_order || [];
    this.type = data.hoyo_type;
  }

  async getHoyoBuilds(): Promise<HoyoBuilds[]> {
    const handler: RequestHandler = new RequestHandler();
    const builds: any[] = [];

    const data = await handler.profile(
      `${this.username}/hoyos/${this.hash}/builds`
    );
    if (Object.keys(data).length == 0) return [];

    Object.keys(data).forEach((characterId) => {
      builds.push(...data[characterId]);
    });

    return builds.map(
      (data) =>
        new HoyoBuilds(data, this.language as AssetFinderOptions["language"])
    );
  }
}
