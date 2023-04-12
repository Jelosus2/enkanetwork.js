import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SkillImage } from "../../types";

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
        const skills = JSON.parse(readFileSync(join(__dirname, '../../utils/skills.json'), 'utf-8'));
        const hashes = JSON.parse(readFileSync(join(__dirname, '../../utils/hashes.json'), 'utf-8'));

        this.name = hashes[language][skills[skillId]?.nameTextMapHash] || "";
        this.assets = skills[skillId] ? new SkillImages(skills[skillId]) : {} as SkillImages;
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
