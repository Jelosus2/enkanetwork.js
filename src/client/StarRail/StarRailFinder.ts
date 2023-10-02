import { AssetFinderError } from "../../errors";
import { AssetFinderOptions } from "../../types";
import {
  SRCharacterAssets,
  SREidolon,
  SRHash,
  SRLightcone,
  SRProfilePicture,
  SRRelic,
  SRSkillTree,
} from "../../structs";

/**
 * A class for finding and retrieving Star Rail assets by their ID and names by their hash.
 */
export class StarRailFinder {
  /**
   * The default language to use when no language is specified.
   */
  private language: string;

  /**
   * The list of valid languages that can be used.
   */
  private languages: string[] = [
    "en",
    "ru",
    "vi",
    "th",
    "pt",
    "ko",
    "ja",
    "id",
    "fr",
    "es",
    "de",
    "zh-TW",
    "zh-CN",
  ];

  /**
   * Creates a new `StarRailFinder` instance.
   * @param options - The options from the AssetFinder class.
   * @param options.language - The language to get the names. If not specified, the default language will be used.
   */
  constructor(options?: AssetFinderOptions) {
    this.language = options?.language || "en";

    if (!this.languages.includes(this.language))
      throw new AssetFinderError("Invalid or not available language.");
  }

  /**
   * Finds and returns the Star Rail assets and name of a character with the given ID and language.
   * @param characterId - The ID of the character.
   * @param language - The language to get the name. If not specified, the default language will be used.
   * @returns The assets and name of the Star Rail character.
   */
  character(
    characterId: string | number,
    language: string = this.language
  ): SRCharacterAssets {
    if (!characterId)
      throw new AssetFinderError("You must provide a character id");
    if (isNaN(+characterId))
      throw new AssetFinderError("The character id must be a valid integer or string");

    return new SRCharacterAssets(characterId, language);
  }

  /**
   * Finds and returns the Star Rail assets and name of a lightcone with the given ID and language.
   * @param lightconeId - The ID of the lightcone.
   * @param language - The language to get the name. If not specified, the default language will be used.
   * @returns The assets and name of the lightcone.
   */
  lightcone(
    lightconeId: string | number,
    language: string = this.language
  ): SRLightcone {
    if (!lightconeId)
      throw new AssetFinderError("You must provide a lightcone id");
    if (isNaN(+lightconeId))
      throw new AssetFinderError("The lightcone id must be a valid integer or string");

    return new SRLightcone(lightconeId, language);
  }

  /**
   * Finds and returns the StarRail assets of a profile picture with the given ID.
   * @param iconId - The ID of the profile picture.
   * @returns The assets of the Star Rail profile picture.
   */
  profilePicture(iconId: string | number): SRProfilePicture {
    if (!iconId) 
      throw new AssetFinderError("You must provide an icon id");
    if (isNaN(+iconId))
      throw new AssetFinderError("The icon id must be a valid integer or string");

    return new SRProfilePicture(iconId);
  }

  /**
   * Finds and returns the StarRail assets and name of an eidolon with the given ID and language.
   * @param eidolonId - The ID of the eidolon.
   * @param language - The language to get the name. If not specified, the default language will be used. 
   * @returns The assets and name of the eidolon.
   */
  eidolon(
    eidolonId: string | number,
    language: string = this.language
  ): SREidolon {
    if (!eidolonId)
      throw new AssetFinderError("You must provide an eidolon id");
    if (isNaN(+eidolonId))
      throw new AssetFinderError("The eidolon id must be a valid integer or string");

    return new SREidolon(eidolonId, language);
  }

  /**
   * Finds and returns the StarRail assets and name of a relic with the given ID and language.
   * @param relicId - The ID of the relic.
   * @param language - The language to get the name. If not specified, the default language will be used.
   * @returns The assets and name of the relic.
   */
  relic(
    relicId: string | number, 
    language: string = this.language
  ): SRRelic {
    if (!relicId) 
      throw new AssetFinderError("You must provide a relic id");
    if (isNaN(+relicId))
      throw new AssetFinderError("The relic id must be a valid integer or string");

    return new SRRelic(relicId, language);
  }

  /**
   * Finds and returns the StarRail assets and name of a trace with the given ID and language.
   * @param traceId - The ID of the trace.
   * @param language - The language to get the name. If not specified, the default language will be used.
   * @returns The assets and name of the trace.
   */
  trace(
    traceId: string | number,
    language: string = this.language
  ): SRSkillTree {
    if (!traceId) 
      throw new AssetFinderError("You must provide a trace id");
    if (isNaN(+traceId))
      throw new AssetFinderError("The trace id must be a valid integer or string");

    return new SRSkillTree(traceId, language);
  }

  /**
   * Finds and returns a name depending on the given Star Rail hash.
   * @param hash - The hash.
   * @param language - The language to get the name. If not specified, the default language will be used.
   * @returns The value of the hash.
   */
  hash(
    hash: string | number, 
    language: string = this.language
  ): SRHash {
    if (!hash) 
      throw new AssetFinderError("You must provide a hash");
    if (isNaN(+hash))
      throw new AssetFinderError("The hash must be a valid integer or string");

    return new SRHash(hash, language);
  }

  /**
   * Function to convert string names (hashes) into normal (numeric) hashes.
   * @param name - The stringified hash.
   * @author secretlyrice in Discord
   * @returns The normal (numeric) hash.
   */
  getStableHash(name: string): number {
    let hash1 = 5381 | 0;
    let hash2 = hash1 | 0;

    for (let i = 0; i < name.length; i += 2) {
      hash1 = ((hash1 << 5) + hash1) ^ name.charCodeAt(i);
      if (i == name.length - 1 || name[i + 1] == "\0") break;
      hash2 = ((hash2 << 5) + hash2) ^ name.charCodeAt(i + 1);
    }

    return (hash1 + Math.imul(hash2, 1566083941)) | 0;
  }

  /**
   * Converts a string to an enka Star Rail asset link.
   * @param s - The string to convert.
   * @returns The converted string as a link.
   */
  toLink(s: string): string {
    return `https://enka.network/ui/hsr/${s}`;
  }
}