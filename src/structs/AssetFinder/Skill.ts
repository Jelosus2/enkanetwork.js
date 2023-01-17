import { SkillImage } from "../../types";
import { hashes, skills } from "../../utils";

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
        this.name = hashes[language][skills[skillId].nameTextMapHash] || "";
        this.assets = new SkillImages(skills[skillId]);
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
