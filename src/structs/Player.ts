import { CharacterImages, NamecardImages } from "./AssetFinder";
import { AssetFinder } from "../client";
import {
  AssetFinderOptions,
  PlayerAPI,
  ProfilePictureAPI,
  ShowcaseAPI,
} from "../types";

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
     * Creates a new `Player` instance.
     * @param data - The data of the player.
     * @param language - The language to get the names.
     */
    constructor(data: PlayerAPI, language: AssetFinderOptions["language"]) {
        this.username = data.nickname || "";
        this.levels = data.level 
            ? new PlayerLevels(data) 
            : {} as PlayerLevels;
        this.signature = data.signature || "";
        this.namecard = data.nameCardId 
            ? new Namecard(data.nameCardId, language)
            : {} as Namecard;
        this.achievements = data.finishAchievementNum || 0;
        this.abyss = data.towerFloorIndex && data.towerLevelIndex
            ? new Abyss(data)
            : {} as Abyss;
        this.showcase = data.showAvatarInfoList
            ? data.showAvatarInfoList.map((data) => new Showcase(data, language))
            : [];
        this.namecardsList = data.showNameCardIdList
            ? data.showNameCardIdList.map((data) => new Namecard(data, language))
            : [];
        this.profilePicture = data.profilePicture 
            ? new ProfilePicture(data.profilePicture, language) 
            : {} as ProfilePicture;
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
        this.id = namecardId || "";
        this.assets = namecardId 
            ? new AssetFinder().namecard(this.id).assets
            : {} as NamecardImages;
        this.name = namecardId 
            ? new AssetFinder({ language }).namecard(this.id).name
            : "";
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
     * Creates a new `Abyss` instance.
     * @param data - The data of the player.
     */
    constructor(data: PlayerAPI) {
        this.floor = data.towerFloorIndex || "";
        this.chamber = data.towerLevelIndex || "";
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
        this.characterId = data.avatarId || "";
        this.level = data.level || "";
        this.costumeId = data.costumeId || "";
        this.assets = data.avatarId 
            ? new AssetFinder().character(this.characterId).assets
            : {} as CharacterImages;
        this.name = data.avatarId 
            ? new AssetFinder({ language }).character(this.characterId).name
            : "";
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
     * The assets of the character.
     */
    assets: CharacterImages;

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
        this.characterId = data.avatarId || "";
        this.assets = data.avatarId 
            ? new AssetFinder().character(this.characterId).assets
            : {} as CharacterImages;
        this.name = data.avatarId 
            ? new AssetFinder({ language }).character(this.characterId).name
            : "";
    }
}