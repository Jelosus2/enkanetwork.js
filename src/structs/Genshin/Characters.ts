import { AssetFinder } from "../../client";
import { AssetFinderOptions, CharactersAPI, FriendshipAPI } from "../../types";
import { CharacterImages, ConstellationImages } from "../AssetFinder";
import { Equipment } from "./Equipment";
import { Stats } from "./Stats";
import { Properties } from "./Properties";
import { Skills } from "./Skills";

/**
 * A class that structures the character's data.
 */
export class Characters {
  /**
   * The character's ID.
   */
  characterId: number;

  /**
   * The element of the character.
   */
  element: string;

  /**
   * The character's properties.
   */
  properties: Properties;

  /**
   * The character's stats.
   */
  stats: Stats;

  /**
   * The list of the character's contellations data.
   */
  constellationsList: Constellations[];

  /**
   * The character's skill set ID.
   */
  skillDepotId: number;

  /**
   * A list of unlocked skill IDs.
   */
  inherentProudSkillList: number[];

  /**
   * The character's talents data.
   */
  skills: Skills;

  /**
   * The character's talents with extra levels.
   */
  skillsExtraLevel: object;

  /**
   * The character's weapon and artifacts.
   */
  equipment: Equipment;

  /**
   * The character's friendship data.
   */
  friendship: Friendship;

  /**
   * The character's assets.
   */
  assets: CharacterImages;

  /**
   * The character's costume ID.
   */
  costumeId: number | string;

  /**
   * The character's name.
   */
  name: string;

  /**
   * Creates a new `Characters` instance.
   * @param data - The data of the character.
   * @param language - The language to get the name.
   */
  constructor(data: CharactersAPI, language: AssetFinderOptions["language"]) {
    const { genshin: genshinFinder } = new AssetFinder({ language });

    let charDepot = "";
    if (["10000005", "10000007"].includes(data.avatarId.toString()))
      charDepot = `${data.avatarId}-${data.skillDepotId}`;

    this.characterId = data.avatarId;
    this.element = genshinFinder.character(
      charDepot || this.characterId
    ).element;
    this.properties = new Properties(data.propMap);
    this.stats = new Stats(data.fightPropMap);
    this.constellationsList = data.talentIdList
      ? data.talentIdList.map((data) => new Constellations(data, genshinFinder))
      : [];
    this.skillDepotId = data.skillDepotId;
    this.inherentProudSkillList = data.inherentProudSkillList || [];
    this.skills = new Skills(
      data.skillLevelMap,
      data.avatarId,
      data.skillDepotId,
      language
    );
    this.skillsExtraLevel = data.proudSkillExtraLevelMap || {};
    this.equipment = new Equipment(data.equipList, language);
    this.friendship = new Friendship(data.fetterInfo);
    this.assets = genshinFinder.character(
      charDepot || this.characterId
    ).assets;
    this.costumeId = data.costumeId || "";
    this.name = genshinFinder.character(
      charDepot || this.characterId
    ).name;
  }
}

/**
 * A class that structures the constellations data.
 */
class Constellations {
  /**
   * The constellation's ID.
   */
  id: number;

  /**
   * The constellation's name.
   */
  name: string;

  /**
   * The constellation's assets.
   */
  assets: ConstellationImages;

  /**
   * Creates a new `Constellations` instance.
   * @param constellationId - The ID of the constellation.
   * @param language - The language to get the name.
   */
  constructor(
    constellationId: number,
    genshinFinder: AssetFinder["genshin"]
  ) {
    this.id = constellationId;
    this.assets = genshinFinder.constellation(this.id).assets;
    this.name = genshinFinder.constellation(this.id).name;
  }
}

/**
 * A class that structures the data of the character's friendship.
 */
class Friendship {
  /**
   * The character's friendship level.
   */
  level: number;

  /**
   * Creates a new `FriendshipInfo` instance.
   * @param data - The character's friendship data.
   */
  constructor(data: FriendshipAPI) {
    this.level = data.expLevel;
  }
}
