
import { starrailFinder, lightcones as lContent } from "../../utils";
import {
  SRLightConeAPI,
  SRLightConePropsAPI,
} from "../../types";
import { ifProp } from "../../handlers";

const lightcones: { [key: string]: any } = lContent;

/**
 * A class that structures the lightcone's data.
 */
export class SRLightCone {
  /**
   * The ID of the lightcone.
   */
  lightConeId: number;

  /**
   * The name of the lightcone.
   */
  name: string;

  /**
   * The rarity of the lightcone.
   */
  rarity: number;

  /**
   * The path of the lightcone.
   */
  path: string;

  /**
   * The icon path of the lightcone.
   */
  icon: string;

  /**
   * The level of the lightcone.
   */
  level: number;

  /**
   * The ascension of the lightcone.
   */
  ascension: number;

  /**
   * The super imposition level of the lightcone.
   */
  superImposition: number;

  /**
   * The information about the stats of the lightcone.
   */
  stats: SRLightConeStats[];

  /**
   * The name hash of the lightcone.
   */
  nameHash: number;

  /**
   * Creates a new `SRLightCone` instance.
   * @param data - The data of the lightcone.
   * @param language - The language to get then name.
   */
  constructor(data: SRLightConeAPI, language: string) {
    const lightcone = starrailFinder[language].lightcone(data.tid);

    this.lightConeId = data.tid;
    this.name = lightcone.name;
    this.rarity = lightcones[data.tid].Rarity;
    this.path = lightcone.path;
    this.icon = lightcone.icon;
    this.level = data.level;
    this.ascension = data.promotion;
    this.superImposition = data.rank;
    this.stats = data._flat.props.map((data) => new SRLightConeStats(data));
    this.nameHash = data._flat.name;
  }
}

/**
 * A class that structures the lightcone stats.
 */
class SRLightConeStats {
  /**
   * The type of stat.
   */
  type: string;

  /**
   * The raw value of the stat.
   */
  value: number;

  constructor(data: SRLightConePropsAPI) {
    this.type = data.type;
    this.value = data.value;
  }

  /**
   * @returns The parsed value of the stat. 
   */
  parsedValue(): number {
    return ifProp(this.value, this.type) as number;
  }
}
