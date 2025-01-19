import { genshinFinder, talents as tContent } from "../../../utils";
import { ConstellationImage } from "../../../types";

const talents: { [key: string]: any } = tContent;

/**
 * A class that structures the constellation assets and name.
 */
export class ConstellationAssets {
  /**
   * The name of the constellation.
   */
  name: string;

  /**
   * The assets of the constellation.
   */
  assets: ConstellationImages;

  /**
   * Creates a new `ConstellationAssets` instance.
   * @param constellationId - The ID of the constellation.
   * @param language - The language used to get the name.
   */
  constructor(constellationId: string | number, language: string) {
    const constellation = talents[constellationId];

    this.name = genshinFinder[language].hash(constellation?.nameTextMapHash).value;
    this.assets = constellation
      ? new ConstellationImages(constellation)
      : ({} as ConstellationImages);
  }
}

/**
 * A class that structures the constellation images.
 */
export class ConstellationImages {
  /**
   * The constellation's icon.
   */
  icon: string;

  /**
   * Creates a new `ConstellationImages` instance.
   * @param data - The data of the constellation.
   */
  constructor(data: ConstellationImage) {
    this.icon = data ? data.icon : "";
  }
}
