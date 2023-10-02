import { ranks as rContent, srhashes as sContent } from "../../../utils";

const ranks: { [key: string]: any } = rContent;
const hashes: { [key: string]: any } = sContent;

/**
 * A class that structures the eidolons assets and name.
 */
export class SREidolon {
  /**
   * The name of the eidolon.
   */
  name: string;

  /**
   * The icon path of the eidolon.
   */
  icon: string;

  /**
   * Creates a new `SREidolon` instance.
   * @param eidolonId - The ID of the eidolon.
   * @param language - The language to get the name.
   */
  constructor(eidolonId: string | number, language: string) {
    const eidolon = ranks[eidolonId];

    this.name = hashes[language]?.[eidolon?.Name] || "";
    this.icon = eidolon?.IconPath || "";
  }
}
