import { SRLightCone } from "./SRLightCone";
import { SRRelics } from "./SRRelics";
import { SRSkillTreeList } from "./SRSkillTreeList";
import { SRCharacterImages } from "../AssetFinder";
import { SRShowcaseAPI } from "../../types";
import { LayerGenerator, PropState } from "../../handlers";
import { SRStats } from "./SRStats";
import { 
  starrailFinder, 
  srcharacters as sContent, 
  lightcones as lContent, 
  types as tContent 
} from "../../utils";

const characters: { [key: string]: any } = sContent;
const lightcones: { [key: string]: any } = lContent;
const types: { [key: string]: any } = tContent;

const maxLevelMapping = [
  20,
  30,
  40,
  50,
  60,
  70,
  80
];

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
   * The maximum level by the current ascension.
   */
  maxLevel: number;

  /**
   * How many eidolons the character has.
   */
  eidolons: number;

  /**
   * The ID of the skin the character is using if any.
   */
  skinId: number | string;

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
    const characterAssets = starrailFinder[language].character(data.avatarId);
    const character = characters[data.avatarId];

    this.characterId = data.avatarId;
    this.name = characterAssets.name;
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
    this.maxLevel = maxLevelMapping[data.promotion || 0];
    this.eidolons = data.rank || 0;
    this.skinId = data.dressedSkinId || "";
    this._assist = data._assist || false;
    this.assets = characterAssets.assets;
  }

  stats(): SRStats[] {
    const character = characters[this.characterId];
    const propState = new PropState();

    propState.add(LayerGenerator.character({ characterId: this.characterId, ascension: this.ascension, level: this.level }));
    if (this.lightcone)
      propState.add(LayerGenerator.weapon(this.lightcone));
    if (this.lightcone && lightcones[this.lightcone.lightConeId].AvatarBaseType == character?.AvatarBaseType)
      propState.add(LayerGenerator.weaponAffix(this.lightcone));
    propState.add(LayerGenerator.relic(this.relics));
    propState.add(LayerGenerator.relicSet(this.relics));
    propState.add(LayerGenerator.skillTree(this.traces));

    let props = propState.sum().props; 

    return props.map((data) => new SRStats(data));
  }
}