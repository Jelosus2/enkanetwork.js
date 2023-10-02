import { AssetFinderOptions } from "../../types";
import { Artifact } from "./Artifact";
import { Weapon } from "./Weapon";

/**
 * A class that structures the data of the equipment.
 */
export class Equipment {
  /**
   * The artifacts data.
   */
  artifacts: Artifact[];

  /**
   * The weapon's data.
   */
  weapon: Weapon;

  /**
   * Creates a new `Equipment` instance.
   * @param data - The data of the equipment.
   * @param language - The language to get the names.
   */
  constructor(data: any[], language: AssetFinderOptions["language"]) {
    this.artifacts = data.find((x) => x.flat.itemType == "ITEM_RELIQUARY")
      ? data
          .filter((x) => x.flat.itemType == "ITEM_RELIQUARY")
          .map((data) => new Artifact(data, language))
      : [];
    this.weapon = new Weapon(
      data.filter((x) => x.flat.itemType == "ITEM_WEAPON")[0],
      language
    );
  }
}
