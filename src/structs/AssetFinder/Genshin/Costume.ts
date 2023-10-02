import { costumes as cContent } from "../../../utils";
import { CharacterCostume } from "../../../types";

const costumes: { [key: string]: any } = cContent;

/**
 * A class that structures the costume assets.
 */
export class CostumeAssets {
  /**
   * The assets of the costume.
   */
  assets: CostumeImages;

  /**
   * Creates a new `Costume` instance.
   * @param costumeId - The ID of the costume.
   */
  constructor(costumeId: string | number) {
    const costume = costumes[costumeId];

    this.assets = costume
      ? new CostumeImages(costume)
      : ({} as CostumeImages);
  }
}

/**
 * A class that structures the costume images.
 */
class CostumeImages {
  /**
   * The side icon of the costume.
   */
  sideIconName: string;

  /**
   * The icon of the costume.
   */
  icon: string;

  /**
   * The splash art of the costume.
   */
  art: string;

  /**
   * Creates a new `Costume` instance.
   * @param data - The data of the costume images.
   */
  constructor(data: CharacterCostume) {
    this.sideIconName = data ? data.sideIconName : "";
    this.icon = data ? data.icon : "";
    this.art = data ? data.art : "";
  }
}
