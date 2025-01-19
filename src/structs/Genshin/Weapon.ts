import { genshinFinder } from "../../utils";
import { WeaponImages } from "../AssetFinder";
import { AssetFinderOptions, WeaponAPI, WeaponStatsAPI } from "../../types";

/**
 * A class that structures the weapon's data.
 */
export class Weapon {
  /**
   * The weapon's ID.
   */
  weaponId: number;

  /**
   * The weapon's level.
   */
  level: number;

  /**
   * The weapon's ascension level.
   */
  ascensionLevel: number | string;

  /**
   * The weapon's refinement level.
   */
  refinement: Refinement;

  /**
   * The weapon's name text map hash.
   */
  nameTextMapHash: string;

  /**
   * The weapon's rank stars.
   */
  stars: number;

  /**
   * the weapon's stats.
   */
  weaponStats: WeaponStats[];

  /**
   * The item type.
   */
  itemType: string;

  /**
   * The weapon's assets.
   */
  assets: WeaponImages;

  /**
   * The weapon's name.
   */
  name: string;

  /**
   * Creates a new `Weapon` instance.
   * @param data - The data of the weapon.
   * @param language - The language to get the name.
   */
  constructor(data: WeaponAPI, language: AssetFinderOptions["language"]) {
    const weapon = genshinFinder[`${language}`].weapon(data.itemId);

    this.weaponId = data.itemId;
    this.level = data.weapon.level;
    this.ascensionLevel = data.weapon.promoteLevel || "";
    this.refinement = new Refinement(data.weapon.affixMap);
    this.nameTextMapHash = data.flat.nameTextMapHash;
    this.stars = data.flat.rankLevel;
    this.weaponStats = data.flat.weaponStats.map(
      (data) => new WeaponStats(data)
    );
    this.itemType = data.flat.itemType;
    this.assets = weapon.assets;
    this.name = weapon.name;
  }
}

/**
 * A class that structures the weapon stats.
 */
class WeaponStats {
  /**
   * The weapon stat.
   */
  stat: string;

  /**
   * The weapon stat value.
   */
  statValue: number;

  /**
   * Creates a new `WeaponStats` instance.
   * @param data - The data of the weapon stats.
   */
  constructor(data: WeaponStatsAPI) {
    this.stat = data.appendPropId;
    this.statValue = data.statValue;
  }
}

/**
 * A class that structures the weapon's refinement data.
 */
class Refinement {
  /**
   * The id of the refinement.
   */
  id: number | string;

  /**
   * The weapon's refinement level.
   */
  level: number | string;

  constructor(data: any) {
    this.id = data ? +Object.keys(data)[0] : "";
    this.level = data ? data[Object.keys(data)[0]] : "";
  }
}
