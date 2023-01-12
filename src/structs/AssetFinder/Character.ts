import { characters, hashes } from "../../utils";
import {
    CharacterCostume,
    CharacterImage,
    CharacterSkillIcon,
} from "../../types";

/**
 * A class that structures the character assets and name.
 */
export class CharacterAssets {
    /**
     * The name of the character.
     */
    name: string;

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
        this.name = hashes[language][characters[characterId].nameTextMapHash] || "";
        this.assets = new CharacterImages(characters[characterId]);
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
