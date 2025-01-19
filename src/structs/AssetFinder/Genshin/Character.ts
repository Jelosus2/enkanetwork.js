import { genshinFinder, characters as cContent } from "../../../utils";
import {
  CharacterCostume,
  CharacterImage,
  CharacterSkillIcon,
} from "../../../types";

const characters: { [key: string]: any } = cContent;

/**
 * A class that structures the character assets and name.
 */
export class CharacterAssets {
  /**
   * The name of the character.
   */
  name: string;

  /**
   * The element of the character.
   */
  element: string;

  /**
   * The character's rank stars.
   */
  stars: number;

  /**
   * The assets of the character.
   */
  assets: CharacterImages;

  /**
   * Creates a new `CharacterAssets` instance.
   * @param characterId - The ID of the character.
   * @param language - The language to get the name.
   */
  constructor(characterId: string | number, language: string) {
    const character = characters[characterId];

    this.name = genshinFinder[language].hash(character?.nameTextMapHash).value;
    this.element = character?.element || "";
    this.stars = character?.rarity || 0;
    this.assets = character
      ? new CharacterImages(character)
      : ({} as CharacterImages);
  }
}

/**
 * A class that structures the character image types.
 */
export class CharacterImages {
  /**
   * The character's icon.
   */
  icon: string;

  /**
   * The character's side icon.
   */
  sideIcon: string;

  /**
   * The character's gacha icon.
   */
  gachaIcon: string;

  /**
   * The character's constellation icons.
   */
  constellations: string[];

  /**
   * The character's talent icons.
   */
  talents: CharacterSkillIcons;

  /**
   * The character's costumes.
   */
  costumes: CharacterCostumes[];

  /**
   * Creates a new `CharacterImages` instance.
   * @param data - The data of the character.
   */
  constructor(data: CharacterImage) {
    this.icon = data ? data.icon : "";
    this.sideIcon = data ? data.sideIcon : "";
    this.gachaIcon = data ? data.gachaIcon : "";
    this.constellations = data ? data.constellations : [];
    this.talents = new CharacterSkillIcons(data.skills);
    this.costumes =
      data && data.costumes
        ? data.costumes.map((data) => new CharacterCostumes(data))
        : [];
  }
}

/**
 * A class that structures the character costumes.
 */
class CharacterCostumes {
  /**
   * The costume's side icon name.
   */
  sideIconName: string;

  /**
   * The costume's icon.
   */
  icon: string;

  /**
   * The costume's art.
   */
  art: string;

  /**
   * Creates a new `CharacterCostumes` instance.
   * @param data - The data of the character images.
   */
  constructor(data: CharacterCostume) {
    this.sideIconName = data ? data.sideIconName : "";
    this.icon = data ? data.icon : "";
    this.art = data ? data.art : "";
  }
}

/**
 * A class that structures the character skill icons.
 */
class CharacterSkillIcons {
  /**
   * The normal attack icon.
   */
  normalAttack: string;

  /**
   * The elemental skill icon.
   */
  elementalSkill: string;

  /**
   * The elemental burst icon.
   */
  elementalBurst: string;

  /**
   * Creates a new `CharacterSkillIcons` instance.
   * @param data - The data of the character images.
   */
  constructor(data: CharacterSkillIcon) {
    this.normalAttack = data ? data.normalAttack : "";
    this.elementalBurst = data ? data.elementalBurst : "";
    this.elementalSkill = data ? data.elementalSkill : "";
  }
}
