import { SRPlayerDetails, SRPlayerRecordInfoAPI } from "../../types";
import { AssetFinder } from "../../client";

/**
 * A class that structures the player's data.
 */
export class SRPlayer {
  /**
   * The information about the profile picture of the player.
   */
  profilePicture: SRProfilePicture;

  /**
   * The username of the player.
   */
  username: string;

  /**
   * The level of the player.
   */
  level: number;

  /**
   * The signature of the player.
   */
  signature: string;

  /**
   * The UID of the player.
   */
  uid: number;

  /**
   * The friend number of the player.
   */
  friendCount: number;

  /**
   * The information about various records of the player.
   */
  recordInfo: SRRecordInfo;

  /**
   * The equilibrium level of the player.
   */
  equilibriumLevel: number | string;

  /**
   * Tells if the characters info of the player's showcase are public.
   */
  showcaseEnabled: boolean;

  /**
   * The platform of the player.
   */
  platform: string;

  /**
   * Creates a new `SRPlayer` instance.
   * @param data - The data of the player.
   */
  constructor(data: SRPlayerDetails) {
    this.profilePicture = data.headIcon ? new SRProfilePicture(data.headIcon) : {} as SRProfilePicture;
    this.username = data.nickname;
    this.level = data.level;
    this.signature = data.signature || "";
    this.uid = data.uid;
    this.friendCount = data.friendCount || 0;
    this.recordInfo = new SRRecordInfo(data.recordInfo);
    this.equilibriumLevel = data.worldLevel || "";
    this.showcaseEnabled = data.isDisplayAvatar;
    this.platform = data.platform || "";
  }
}

/**
 * A class that structures the profile pictures's data.
 */
class SRProfilePicture {
  /**
   * The id of the profile picture.
   */
  id: number;

  /**
   * The icon path of the profile picture.
   */
  icon: string;

  /**
   * Creates a new `SRPlayer` instance.
   * @param id - The id of the profile picture.
   */
  constructor(id: number) {
    const { starrail: finder } = new AssetFinder();

    this.id = id;
    this.icon = finder.profilePicture(id).icon;
  }
}

/**
 * A class that structures the record's data.
 */
class SRRecordInfo {
  /**
   * The last finished floor by the player in the Memory of Chaos.
   */
  mocLastFinishedFloor: number;

  /**
   * The last finished floor by the player in the Forgotten Hall.
   */
  fhLastFinishedFloor: SRFHInfo;

  /**
   * The ID of the current Memory of Chaos.
   */
  mocId: number;

  /**
   * The number of lightcones obtained by the player.
   */
  lightConesObtained: number;

  /**
   * The last finished world by the player in the Simulated Universe.
   */
  simulatedUniverseLastFinishedWorld: number;

  /**
   * The number of achievements completed by the player.
   */
  achievementCount: number;
  
  /**
   * The number of characters obtained by the player.
   */
  charactersObtained: number;

  /**
   * The number of books obtained by the player.
   */
  booksCollected: number;

  /**
   * The number of relics owned by the player.
   */
  relicsOwned: number;

  /**
   * The number of music tracks collected by the player.
   */
  musicCollected: number;

  /**
   * Pure Fiction last finished stage.
   */
  pureFictionLastFinishedStage: number;

  /**
   * The amount of stars obtained in Pure Fiction.
   */
  pureFictionStarCount: number;

  /**
   * Creates a new `SRRecodInfo` instance.
   * @param data - The data of the records.
   */
  constructor(data: SRPlayerRecordInfoAPI) {
    this.mocLastFinishedFloor = data.challengeInfo.noneScheduleMaxLevel || 0;
    this.fhLastFinishedFloor = new SRFHInfo(data.challengeInfo.scheduleMaxLevel);
    this.mocId = data.challengeInfo.scheduleGroupId || 0;
    this.lightConesObtained = data.equipmentCount || 0;
    this.simulatedUniverseLastFinishedWorld = data.maxRogueChallengeScore || 0;
    this.achievementCount = data.achievementCount || 0;
    this.charactersObtained = data.avatarCount;
    this.booksCollected = data.bookCount || 0;
    this.relicsOwned = data.relicCount || 0;
    this.musicCollected = data.musicCount || 0;
    this.pureFictionLastFinishedStage = data.challengeInfo.abyssLevel || 0;
    this.pureFictionStarCount = data.challengeInfo.abyssStarCount || 0;
  }
}

class SRFHInfo {
  /**
   * The last finished floor of the FH from Jarilo VI.
   */
  jarilo: number;

  /**
   * The last finished floor of the FH from The Xianzhou Luofu.
   */
  xianzhou: number;

  constructor(fhLastFinishedFloor: number) {
    this.jarilo = fhLastFinishedFloor > 15 ? 15 : (fhLastFinishedFloor || 0);
    this.xianzhou = fhLastFinishedFloor > 15 ? fhLastFinishedFloor - 15 : 0;
  }
}