import { SRCharacterImage } from "../../../types";
import {
  starrailFinder,
  srcharacters as sContent,
  srskills as ssContent
} from "../../../utils";

const characters: { [key: string]: any } = sContent;
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

    this.name = starrailFinder[language].hash(character?.AvatarName).value;
    this.assets = character
      ? new SRCharacterImages(character, language)
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
   * The name and paths of the character skins assets.
   */
  skins: SRCharacterSkins[];

  /**
   * Creates a new `SRCharacterImages` instance.
   * @param data - The data of the character assets.
   */
  constructor(data: SRCharacterImage, language: string) {
    this.icon = data.AvatarSideIconPath;
    this.gachaIcon = data.AvatarCutinFrontImgPath;
    this.eidolons = data.RankIDList.map((id) => starrailFinder.en.eidolon(id).icon);
    this.skills = new SRCharacterSkills(data.SkillList);
    this.skins = data.Skins
      ? data.Skins.map((data) => new SRCharacterSkins(data, language))
      : [];
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

class SRCharacterSkins {
  /**
   * The ID of the skin.
   */
  id: number;

  /**
   * The name of the skin.
   */
  name: string;

  /**
   * The path to the full image of the skin.
   */
  fullImage: string;

  /**
   * The path to the icon of the skin.
   */
  icon: string;

  constructor(data: SRCharacterImage["Skins"][0], language: string) {
    this.id = data.ID;
    this.name = starrailFinder[language].hash(data.AvatarSkinName).value;
    this.fullImage = data.AvatarCutinFrontImgPath;
    this.icon = data.AvatarSideIconPath;
  }
}