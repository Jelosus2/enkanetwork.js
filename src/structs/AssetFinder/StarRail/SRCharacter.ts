import { SRCharacterImage } from "../../../types";
import {
  srcharacters as sContent,
  srhashes as shContent,
  ranks as rContent,
  srskills as ssContent,
} from "../../../utils";

const characters: { [key: string]: any } = sContent;
const hashes: { [key: string]: any } = shContent;
const ranks: { [key: string]: any } = rContent;
const skills: { [key: string]: any } = ssContent;

/**
 * A class that structures the character assets and name.
 */
export class SRCharacterAssets {
  /**
   * The name of the character.
   */
  name: string;

  /**
   * The assets of the character.
   */
  assets: SRCharacterImages;

  /**
   * Creates a new `SRCharacterAssets` instance.
   * @param characterId - The ID of the character.
   * @param language - The language to get the name.
   */
  constructor(characterId: string | number, language: string) {
    const character = characters[characterId];

    this.name = hashes[language]?.[character?.AvatarName] || "";
    this.assets = character
      ? new SRCharacterImages(character)
      : ({} as SRCharacterImages);
  }
}

export class SRCharacterImages {
  /**
   * The icon path of the character.
   */
  icon: string;

  /**
   * The gacha splash icon path of the character.
   */
  gachaIcon: string;

  /**
   * The paths of all the eidolon icons of the character.
   */
  eidolons: string[];

  /**
   * The paths for the skill icons of the character.
   */
  skills: SRCharacterSkills;

  /**
   * Creates a new `SRCharacterImages` instance.
   * @param data - The data of the character assets.
   */
  constructor(data: SRCharacterImage) {
    this.icon = data.AvatarSideIconPath;
    this.gachaIcon = data.AvatarCutinFrontImgPath;
    this.eidolons = data.RankIDList.map((id) => ranks[id].IconPath);
    this.skills = new SRCharacterSkills(data.SkillList);
  }
}

export class SRCharacterSkills {
  /**
   * The path of the basic attack icon.
   */
  basicAttack: string;

  /**
   * The path of the skill icon.
   */
  skill: string;

  /**
   * The path of the ultimate icon.
   */
  ultimate: string;

  /**
   * The path of the talent icon.
   */
  talent: string;

  /**
   * The path of the technique icon.
   */
  technique: string;

  /**
   * Creates a new `SRCharacterSkills` instance.
   * @param data - The data of the character skills.
   */
  constructor(data: number[]) {
    this.basicAttack = skills[data[0]].SkillIcon;
    this.skill = skills[data[1]].SkillIcon;
    this.ultimate = skills[data[2]].SkillIcon;
    this.talent = skills[data[3]].SkillIcon;
    this.technique = skills[data[5]].SkillIcon;
  }
}
