import { srhashes as sContent } from "../../../utils";

const hashes: { [key: string]: any } = sContent;

/**
 * A class that structures the hash names.
 */
export class SRHash {
  /**
   * The value of the hash.
   */
  value: string;

  /**
   * Creates a new `SRHash` instance.
   * @param hash - The hash.
   * @param language - The language to get the name.
   */
  constructor(hash: string | number, language: string) {
    this.value = hashes[language]?.[hash] || "";
  }
}
