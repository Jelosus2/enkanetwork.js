import { SRCharacterStats } from "../../types";
import { ifProp } from "../../handlers";  

export class SRStats {
  /**
   * The name of stat.
   */
  name: string;

  /**
   * The value of the stat.
   */
  value: number;

  /**
   * The base value of the stat.
   */
  baseValue: number;

  /**
   * Creates a new `Stats` instance.
   * @param data - The stats of the character.
   */
  constructor(data: SRCharacterStats) {
    this.name = data.type;
    this.value = data.value;
    this.baseValue = data.base;
  }

  parsedValue(): number | string {
    return ifProp(this.value, this.name);
  }
}