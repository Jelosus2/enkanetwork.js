import { 
  genshinFinder,
  theaterDifficulty as tdContent
} from '../../utils';
import {
  CharacterImages,
  NamecardImages,
  ProfilePictureImages,
} from "../AssetFinder";
import {
  AssetFinderOptions,
  PlayerAPI,
  ProfilePictureAPI,
  ShowcaseAPI,
} from "../../types";

const theaterDifficulty: { [key: string]: any } = tdContent;

const theaterModeMap: string[] = [
  "Easy",
  "Normal",
  "Hard",
  "Visionary"
];

const elementEnumMap: string[] = [
  "No Element",
  "Pyro",
  "Hydro",
  "Dendro",
  "Electro",
  "Cryo",
  "",
  "Anemo",
  "Geo"
];

/**
 * A class that structures the data of the player.
 */
export class Player {
  /**
   * The player's username.
   */
  username: string;

  /**
   * The player's level types data.
   */
  levels: PlayerLevels;

  /**
   * The player's signature.
   */
  signature: string;

  /**
   * The player's namecard.
   */
  namecard: Namecard;

  /**
   * The player's finished achievements count.
   */
  achievements: number;

  /**
   * The player's abyss data.
   */
  abyss: Abyss;

  /**
   * The player's showcase characters data.
   */
  showcase: Showcase[];

  /**
   * A list of the player's namecards data.
   */
  namecardsList: Namecard[];

  /**
   * The player's profile picture data.
   */
  profilePicture: ProfilePicture;

  /**
   * The theater act.
   */
  theaterAct: number | string;

  /**
   * The current theater mode index.
   */
  theaterModeIndex: number | string;

  /**
   * The current theater mode in a parsed string (Easy, Normal, Hard or Visionary).
   */
  theaterMode: string;

  /**
   * The count of the total current theater stars.
   */
  theaterStars: number;

  /**
   * Whether the player has public constellations in the showcase or not.
   */
  publicConstellations: boolean;

  /**
   * The count of characters with max friendship level.
   */
  maxFriendshipCount: number;

  /**
   * Creates a new `Player` instance.
   * @param data - The data of the player.
   * @param language - The language to get the names.
   */
  constructor(data: PlayerAPI, language: AssetFinderOptions["language"]) {
    this.username = data.nickname || "";
    this.levels = data.level 
      ? new PlayerLevels(data) 
      : ({} as PlayerLevels);
    this.signature = data.signature || "";
    this.namecard = data.nameCardId
      ? new Namecard(data.nameCardId, language)
      : ({} as Namecard);
    this.achievements = data.finishAchievementNum || 0;
    this.abyss =
      data.towerFloorIndex && data.towerLevelIndex
        ? new Abyss(data)
        : ({} as Abyss);
    this.showcase = data.showAvatarInfoList
      ? data.showAvatarInfoList.map((data) => new Showcase(data, language))
      : [];
    this.namecardsList = data.showNameCardIdList
      ? data.showNameCardIdList.map((data) => new Namecard(data, language))
      : [];
    this.profilePicture = data.profilePicture
      ? new ProfilePicture(data.profilePicture, language)
      : ({} as ProfilePicture);
    this.theaterAct = data.theaterActIndex || "";
    this.theaterModeIndex = data.theaterModeIndex || "";
    this.theaterMode = theaterModeMap[theaterDifficulty[`${data.theaterModeIndex}`]?.difficultyLevel - 1] || "";
    this.theaterStars = data.theaterStarIndex || 0;
    this.publicConstellations = data.isShowAvatarTalent || false;
    this.maxFriendshipCount = data.fetterCount || 0;
  }
}

/**
 * A class that structures the player's different level types.
 */
class PlayerLevels {
  /**
   * The player's world level.
   */
  world: number | string;

  /**
   * The player's adventure rank.
   */
  rank: number | string;

  /**
   * Creates a new `PlayerLevels` instance.
   * @param data - The data of the player.
   */
  constructor(data: PlayerAPI) {
    this.world = data.worldLevel || "";
    this.rank = data.level || "";
  }
}

/**
 * A class that structures the player's namecards data.
 */
class Namecard {
  /**
   * The id of the namecard.
   */
  id: number | string;

  /**
   * The assets of the namecard.
   */
  assets: NamecardImages;

  /**
   * The name of the namecard.
   */
  name: string;

  /**
   * Creates a new `Namecard` instance.
   * @param namecardId - The ID of the namecard.
   * @param language - The language to get the name.
   */
  constructor(namecardId: number, language: AssetFinderOptions["language"]) {
    const namecard = genshinFinder[`${language}`].namecard(namecardId || "0");

    this.id = namecardId || "";
    this.assets = namecard.assets;
    this.name = namecard.name;
  }
}

/**
 * A class that structures the player's abyss data.
 */
class Abyss {
  /**
   * The current floor of the player's abyss.
   */
  floor: number | string;

  /**
   * The current chamber of the player's abyss.
   */
  chamber: number | string;

  /**
   * The count of total stars in the current abyss.
   */
  stars: number;

  /**
   * Creates a new `Abyss` instance.
   * @param data - The data of the player.
   */
  constructor(data: PlayerAPI) {
    this.floor = data.towerFloorIndex || "";
    this.chamber = data.towerLevelIndex || "";
    this.stars = data.towerStarIndex || 0;
  }
}

/**
 * A class that structures the player's showcase characters data.
 */
class Showcase {
  /**
   * The ID of the character.
   */
  characterId: number | string;

  /**
   * The level of the character.
   */
  level: number | string;

  /**
   * The ID of the character's costume.
   */
  costumeId: number | string;

  /**
   * The index for the element of the character.
   * 0 = elementless
   * 1 = pyro
   * 2 = hydro
   * 3 = dendro
   * 4 = electro
   * 5 = cryo
   * 7 = anemo
   * 8 = geo
   */
  elementIndex: number | string;

  /**
   * Parsed string with the element of the character.
   */
  element: string;

  /**
   * The count of the total constellations of the character.
   */
  constellations: number;

  /**
   * The assets of the character.
   */
  assets: CharacterImages;

  /**
   * The name of the character.
   */
  name: string;

  /**
   * Creates a new `Showcase` instance.
   * @param data - The data of the player's showcase.
   * @param language - The language to get the names.
   */
  constructor(data: ShowcaseAPI, language: AssetFinderOptions["language"]) {
    const character = genshinFinder[`${language}`].character(data.avatarId || "0");

    this.characterId = data.avatarId || "";
    this.level = data.level || "";
    this.costumeId = data.costumeId || "";
    this.assets = character.assets;
    this.name = character.name;
    this.elementIndex = data.energyType || "";
    this.element = elementEnumMap[data.energyType] || "";
    this.constellations = data.talentLevel || 0;
  }
}

/**
 * A class that structures the player's profile picture data.
 */
class ProfilePicture {
  /**
   * The ID of the character.
   */
  characterId: number | string;

  /**
   * The ID of the profile picture.
   */
  id: number | string;

  /**
   * The assets of the character.
   */
  assets: CharacterImages | ProfilePictureImages;

  /**
   * The name of the character.
   */
  name: string;

  /**
   * Creates a new `ProfilePicture` instance.
   * @param data - The data of the profile picture.
   * @param language - The language to get the name.
   */
  constructor(data: ProfilePictureAPI, language: AssetFinderOptions["language"]) {
    const profilePicture = data.avatarId 
      ? genshinFinder[`${language}`].character(data.avatarId)
      : genshinFinder[`${language}`].profilePicture(data.id || "0");

    this.characterId = data.avatarId || "";
    this.id = data.id || "";
    this.assets = profilePicture.assets;
    this.name = profilePicture.name;
  }
}
