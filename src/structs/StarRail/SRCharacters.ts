import { SRLightCone } from "./SRLightCone";
import { SRRelics } from "./SRRelics";
import { SRSkillTreeList } from "./SRSkillTreeList";
import { AssetFinder } from "../../client";
import { srcharacters as sContent, types as tContent } from "../../utils";
import { SRCharacterImages } from "../AssetFinder";
import {
  AssetFinderOptions,
  SRShowcaseAPI,
} from "../../types";

const characters: { [key: string]: any } = sContent;
const types: { [key: string]: any } = tContent;

/**
 * A class that structures the character's data.
 */
export class SRCharacters {
  /**
   * The ID of the character.
   */
  characterId: number;

  /**
   * The name of the character.
   */
  name: string;

  /**
   * The rarity of the character.
   */
  rarity: number;

  /**
   * The element type of the character.
   */
  element: string;

  /**
   * The path of the character.
   */
  path: string;

  /**
   * The ascension of the character.
   */
  ascension: number;

  /**
   * The information about the lightcone of the character.
   */
  lightcone: SRLightCone;

  /**
   * The information about the traces of the character.
   */
  traces: SRSkillTreeList[];

  /**
   * The position of the character.
   */
  pos: number | string;

  /**
   * The experience of the character.
   */
  exp: number;

  /**
   * The information about the relics of the character.
   */
  relics: SRRelics[];

  /**
   * The level of the character.
   */
  level: number;

  /**
   * How many eidolons the character has.
   */
  eidolons: number;

  /**
   * Tells if the character is the support character.
   */
  _assist: boolean;

  /**
   * The information about the assets of the character.
   */
  assets: SRCharacterImages;

  /**
   * Creates a new `SRCharacters` instance.
   * @param data - The data of the character.
   * @param language - The language to get the names.
   */
  constructor(data: SRShowcaseAPI, language: string) {
    const character = characters[data.avatarId];

    const { starrail: finder } = new AssetFinder({
      language: language as AssetFinderOptions["language"],
    });

    this.characterId = data.avatarId;
    this.name = finder.character(data.avatarId).name;
    this.rarity = character.Rarity;
    this.element = character.Element;
    this.path = types[language][character.AvatarBaseType].name;
    this.ascension = data.promotion;
    this.lightcone = data.equipment
      ? new SRLightCone(data.equipment, language)
      : ({} as SRLightCone);
    this.traces = data.skillTreeList.map(
      (data) => new SRSkillTreeList(data, language)
    );
    this.pos = data.pos || "";
    this.exp = data.exp || 0;
    this.relics =
      data.relicList && data.relicList.length > 0
        ? data.relicList.map((data) => new SRRelics(data))
        : [];
    this.level = data.level;
    this.eidolons = data.rank || 0;
    this._assist = data._assist || false;
    this.assets = finder.character(data.avatarId).assets;
  }
}
