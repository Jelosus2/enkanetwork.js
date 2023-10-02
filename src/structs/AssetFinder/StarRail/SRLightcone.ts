import {
  lightcones as lContent,
  srhashes as sContent,
  types as tContent,
} from "../../../utils";

const lightcones: { [key: string]: any } = lContent;
const hashes: { [key: string]: any } = sContent;
const types: { [key: string]: any } = tContent;

export class SRLightcone {
  /**
   * The path of the lightcone.
   */
  path: string;

  /**
   * The name of the lightcone.
   */
  name: string;

  /**
   * The icon path of the lightcone.
   */
  icon: string;

  /**
   * Creates a new `SRLightcone` instance.
   * @param lightconeId - The ID of the lightcone.
   */
  constructor(lightconeId: string | number, language: string) {
    const lightcone = lightcones[lightconeId];

    this.path =
      types[language]?.[lightcone?.AvatarBaseType]?.name || "";
    this.name =
      hashes[language]?.[lightcone?.EquipmentName] || "";
    this.icon = lightcone?.ImagePath || "";
  }
}
