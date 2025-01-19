import { 
  starrailFinder,
  relics as rContent
} from "../../../utils";

const relics: { [key: string]: any } = rContent;

export class SRRelic {
  /**
   * The type of relic.
   */
  type: string;

  /**
   * The ID of the relic's set.
   */
  setId: number;

  /**
   * The path icon of the relic.
   */
  icon: string;

  /**
   * The name of the relic.
   */
  name: string;

  /**
   * The name of the relic's set.
   */
  setName: string;

  /**
   * Creates a new `SRRelic` instance.
   * @param relicId - The ID of the relic.
   * @param language - The language to get the names.
   */
  constructor(relicId: string | number, language: string) {
    this.type = relics[relicId]?.Type || "";
    this.setId = relics[relicId]?.SetID || 0;
    this.icon = relics[relicId]?.Icon || "";
    this.name = starrailFinder[language].hash(relics[relicId]?.Name).value;
    this.setName = starrailFinder[language].hash(relics[relicId]?.SetName).value;
  }
}