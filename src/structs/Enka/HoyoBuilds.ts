import { genshinFinder, starrailFinder } from "../../utils";
import { Characters } from "../Genshin";
import { SRCharacters } from "../StarRail";
import {
  AssetFinderOptions,
  CharactersAPI,
  HoyoBuildsAPI,
  SRShowcaseAPI,
} from "../../types";

/**
 * A class that structures the builds data of a hoyo.
 */
export class HoyoBuilds {
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
  characterInfo: Characters | SRCharacters;

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
   * The custom image of the build.
   */
  image: string;

  /**
   * The type of build (Genshin or StarRail).
   */
  type: number;

  /**
   * Creates a new `UserBuilds` instance.
   * @param data - The data of the user builds.
   * @param language - The language to get the names.
   */
  constructor(data: HoyoBuildsAPI, language: AssetFinderOptions["language"]) {
    this.id = data.id;
    this.name = data.name;
    this.characterId = data.avatar_id;
    this.characterName =
      data.hoyo_type == 0
        ? genshinFinder[`${language}`].character(this.characterId).name
        : starrailFinder[`${language}`].character(this.characterId).name;
    this.characterInfo =
      data.hoyo_type == 0
        ? new Characters(data.avatar_data as CharactersAPI, language)
        : new SRCharacters(
            data.avatar_data as SRShowcaseAPI,
            language as string
          );
    this.order = data.order;
    this.live = data.live;
    this.settings = data.settings;
    this.isPublic = data.public;
    this.image = data.image || "";
    this.type = data.hoyo_type;
  }
}
