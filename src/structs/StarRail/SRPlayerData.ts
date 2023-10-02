import { SRPlayerDataAPI } from "../../types";
import { Owner } from "../Enka";
import { SRCharacters } from "./SRCharacters";
import { SRPlayer } from "./SRPlayer";

/**
 * A class that structures the overall player's data.
 */
export class SRPlayerData {
  /**
   * The information about the player.
   */
  player: SRPlayer;

  /**
   * The information about the characters of the player.
   */
  characters: SRCharacters[];

  /**
   * The time in seconds until the profile data is refreshed.
   */
  ttl: number;

  /**
   * The Enka profile data that belongs the UID.
   */
  owner: Owner;

  /**
   * The UID of the player.
   */
  uid: string;

  /**
   * Creates a new `SRPlayerData` instance.
   * @param data - The data of the overall player data.
   * @param language - The language to get the names.
   */
  constructor(data: SRPlayerDataAPI, language: string) {
    this.player = data.detailInfo
      ? new SRPlayer(data.detailInfo)
      : ({} as SRPlayer);
    this.characters =
      data.detailInfo.avatarDetailList &&
      data.detailInfo.avatarDetailList.length > 0
        ? data.detailInfo.avatarDetailList.map(
            (data) => new SRCharacters(data, language)
          )
        : [];
    this.ttl = data.ttl;
    this.owner = data.owner ? new Owner(data.owner) : ({} as Owner);
    this.uid = data.uid;
  }
}
