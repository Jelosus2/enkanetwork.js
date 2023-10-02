import { PropertiesAPI, PropMapContentAPI } from "../../types";

/**
 * A class that structures the properties of the character.
 */
export class Properties {
  /**
   * The xp of the character.
   */
  xp: PropertyContent;

  /**
   * The ascension of the character.
   */
  ascension: PropertyContent;

  /**
   * The level of the character.
   */
  level: PropertyContent;

  /**
   * The stamina of the character.
   */
  stamina: PropertyContent;

  /**
   * Creates a new `Properties` instance.
   * @param data - The data of the character's properties.
   */
  constructor(data: PropertiesAPI) {
    this.xp = new PropertyContent(data[1001]);
    this.ascension = new PropertyContent(data[1002]);
    this.level = new PropertyContent(data[4001]);
    this.stamina = new PropertyContent(data[10010]);
  }
}

/**
 * A class that structures the content of the character's properties.
 */
class PropertyContent {
  /**
   * The type of propertie.
   */
  type: number;

  /**
   * The value of the propertie.
   */
  val: string;

  /**
   * Creates a new `PropertyContent` instance.
   * @param data - The data of the propertie content.
   */
  constructor(data: PropMapContentAPI) {
    this.type = data.type;
    this.val = data.val || "";
  }
}
