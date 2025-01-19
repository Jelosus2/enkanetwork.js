import { ifProp } from "../../handlers";
import { substattypes as sContent } from "../../utils";
import { SRRelicList, SRRelicPropsAPI, SRSubAffixListAPI } from "../../types";

const substattypes: { [key: string]: any } = sContent;

/**
 * A class that structures the relic's data.
 */
export class SRRelics {
  /**
   * The level of the relic.
   */
  level: number;

  /**
   * The information about the substats of the relic.
   */
  substatList: SRSubAffixList[];

  /**
   * The ID of the main stat.
   */
  mainStatId: number;

  /**
   * The type of relic.
   */
  type: number;

  /**
   * The ID of the relic.
   */
  relicId: number;

  /**
   * The information about the main stat of the relic.
   */
  mainStat: SRAffixes;

  /**
   * The information about the substats stats of the relic. 
   */
  substats: SRAffixes[];

  /**
   * The name hash of the relic set.
   */
  setNameHash: number;

  /**
   * The ID of the relic set.
   */
  setId: number;

  /**
   * Creates a new `SRRelics` instance.
   * @param data - The data of the relics.
   */
  constructor(data: SRRelicList) {
    this.level = data.level || 0;
    this.substatList =
      data.subAffixList && data.subAffixList.length > 0
        ? data.subAffixList.map((data) => new SRSubAffixList(data))
        : [];
    this.mainStatId = data.mainAffixId;
    this.type = data.type;
    this.relicId = data.tid;
    this.mainStat = new SRAffixes(data._flat.props[0]);
    this.substats =
      data._flat.props.length > 1
        ? data._flat.props.slice(1).map((data) => new SRAffixes(data))
        : [];
    this.setNameHash = data._flat.setName;
    this.setId = data._flat.setID;
  }
}

/**
 * A class that structures the substats info's data.
 */
class SRSubAffixList {
  /**
   * The ID of the substat.
   */
  substatId: number;

  /**
   * The type of the stat.
   */
  type: string;

  /**
   * The number of rolls the substat had.
   */
  count: number;

  /**
   * The number of steps the substats had.
   */
  step: number;

  /**
   * The quality of the substat rolls.
   * - 3 - Max roll | 2 - Medium roll | 1 - Low roll
   */
  rollQuality: number[];

  /**
   * Creates a new `SRSubAffixList` instance.
   * @param data - The data of substats info.
   */
  constructor(data: SRSubAffixListAPI) {
    const stepsPerRoll = Math.ceil((data.step || 0) / data.cnt);
    const until = (data.step % data.cnt || data.cnt) - 1;

    const rollQuality = [...Array(data.cnt)].map((_, i) => 1 + stepsPerRoll - (i > until ? 1 : 0));

    this.substatId = data.affixId;
    this.type = substattypes[data.affixId].Property;
    this.count = data.cnt;
    this.step = data.step;
    this.rollQuality = rollQuality;
  }
}

/**
 * A class that structures the stats's data.
 */
class SRAffixes {
  /**
   * The type of stat.
   */
  type: string;

  /**
   * The raw value of the stat.
   */
  value: number;

  /**
   * Creates a new `SRAffixes` instance.
   * @param data - The data of the stats.
   */
  constructor(data: SRRelicPropsAPI) {
    this.type = data.type;
    this.value = data.value;
  }

  /**
   * @returns The parsed value of the stat
   */
  pasedValue(): number | string {
    return ifProp(this.value, this.type);
  }
}
