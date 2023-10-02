import { namecards as nContent, hashes as hContent } from "../../../utils";
import { NamecardImage } from "../../../types";

const namecards: { [key: string]: any } = nContent;
const hashes: { [key: string]: any } = hContent;

/**
 * A class that structures the namecard assets and name.
 */
export class NamecardAssets {
  /**
   * The name of the namecard.
   */
  name: string;

  /**
   * The assets of the namecard.
   */
  assets: NamecardImages;

  /**
   * Creates a new `NamecardAssets` instance.
   * @param namecardId - The ID of the namecard.
   * @param language - The language to get the name.
   */
  constructor(namecardId: string | number, language: string) {
    const namecard = namecards[namecardId];

    this.name = hashes[language][namecard?.nameTextMapHash] || "";
    this.assets = namecard
      ? new NamecardImages(namecard)
      : ({} as NamecardImages);
  }
}

/**
 * A class that structures the namecard images.
 */
export class NamecardImages {
  /**
   * The namecard's icon.
   */
  icon: string;

  /**
   * The namecard's pic path.
   */
  picPath: string[];

  /**
   * Creates a new `NamecardImages` instance.
   * @param data - The data of the namecard.
   */
  constructor(data: NamecardImage) {
    this.icon = data ? data.icon : "";
    this.picPath = data ? data.picPath : [];
  }
}
