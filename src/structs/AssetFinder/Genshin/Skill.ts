import { genshinFinder, skills as sContent } from "../../../utils";
import { SkillImage } from "../../../types";

const skills: { [key: string]: any } = sContent;

/**
 * A class that structures the skill assets and names.
 */
export class SkillAssets {
  /**
   * The skill name.
   */
  name: string;

  /**
   * The skill assets.
   */
  assets: SkillImages;

  /**
   * Creates a new `SkillAssets` instance.
   * @param skillId - The ID of the skill.
   * @param language - The language to get the name.
   */
  constructor(skillId: string | number, language: string) {
    this.name = genshinFinder[language].hash(skills[skillId]?.nameTextMapHash).value;
    this.assets = skills[skillId]
      ? new SkillImages(skills[skillId])
      : ({} as SkillImages);
  }
}

/**
 * A class that structures the skill images.
 */
export class SkillImages {
  /**
   * The skill's icon.
   */
  icon: string;

  /**
   * Creates a new `SkillImages` instance.
   * @param data - The data of the skill.
   */
  constructor(data: SkillImage) {
    this.icon = data ? data.icon : "";
  }
}
