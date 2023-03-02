import { AssetFinderError } from "../errors";
import { AssetFinderOptions } from "../types";
import {
    CharacterAssets,
    ConstellationAssets,
    Hash,
    NamecardAssets,
    SkillAssets,
    WeaponAssets,
    CostumeAssets
} from "../structs";

/**
 * A class for finding and retrieving assets by their ID and names by their hash.
 */
export class AssetFinder {
    /**
     * The default language to use when no language is specified.
     */
    private language: string;

    /**
     * The list of valid languages that can be used.
     */
    private languages: string[] = [
        "en",
        "ru",
        "vi",
        "th",
        "pt",
        "ko",
        "ja",
        "id",
        "fr",
        "es",
        "de",
        "zh-TW",
        "zh-CN",
        "it",
        "tr",
    ];

    /**
     * Creates a new `AssetFinder` instance.
     * @param options - The options for the AssetFinder class.
     * @param options.language - The language to get the names. If not specified, the default language will be used.
     */
    constructor(options?: AssetFinderOptions) {
        this.language = options?.language || "en";

        if (!this.languages.includes(this.language))
            throw new AssetFinderError("Invalid or not available language.");
    }

    /**
     * Finds and returns the assets and the name of a character with the given ID and language.
     * @param characterId - The ID of the character.
     * @param language - The language to get the name. If not specified, the default language will be used.
     * @returns The assets and name of the character.
     */
    character(
        characterId: string | number,
        language: string = this.language
    ): CharacterAssets {
        if (!characterId)
            throw new AssetFinderError("You must provide a character id");

        if (isNaN(+characterId))
            throw new AssetFinderError("The character id must be an integer or string");

        return new CharacterAssets(characterId, language);
    }

    /**
     * Finds and returns the assets and the name of a namecard with the given ID and language.
     * @param namecardId - The ID of the namecard.
     * @param language - The language to get the name. If not specified, the default language will be used.
     * @returns The assets and name of the namecard.
     */
    namecard(
        namecardId: string | number,
        language: string = this.language
    ): NamecardAssets {
        if (!namecardId)
            throw new AssetFinderError("You must provide a namecard id");

        if (isNaN(+namecardId))
            throw new AssetFinderError("The namecard id must be an integer or string");

        return new NamecardAssets(namecardId, language);
    }

    /**
     * Finds and returns the assets and the name of a skill with the given ID and language.
     * @param skillId - The ID of the skill.
     * @param language - The language to get the name. If not specified, the default language will be used.
     * @returns The assets and name of the skill.
     */
    skill(
        skillId: string | number,
        language: string = this.language
    ): SkillAssets {
        if (!skillId)
            throw new AssetFinderError("You must provide a talent id");

        if (isNaN(+skillId))
            throw new AssetFinderError("The talent id must be an integer or string");

        return new SkillAssets(skillId, language);
    }

    /**
     * Finds and returns the assets and the name of a constellation with the given ID and language.
     * @param constellationId - The ID of the constellation.
     * @param language - The language to get the name. If not specified, the default language will be used.
     * @returns The assets and name of the constellation.
     */
    constellation(
        constellationId: string | number,
        language: string = this.language
    ): ConstellationAssets {
        if (!constellationId)
            throw new AssetFinderError("You must provide a constellation id");

        if (isNaN(+constellationId))
            throw new AssetFinderError("The constellation id must be an integer or string");

        return new ConstellationAssets(constellationId, language);
    }

    /**
     * Finds and returns the assets and the name of a weapon with the given ID and language.
     * @param weaponId - The ID of the weapon.
     * @param language - The language to get the name. If not specified, the default language will be used.
     * @returns The assets and name of the weapon.
     */
    weapon(
        weaponId: string | number,
        language: string = this.language
    ): WeaponAssets {
        if (!weaponId)
            throw new AssetFinderError("You must provide a weapon id");

        if (isNaN(+weaponId))
            throw new AssetFinderError("The weapon id must be an integer or string");

        return new WeaponAssets(weaponId, language);
    }

    /**
     * Finds and returns the assets of a character costume with the given ID.
     * @param weaponId - The ID of the costume.
     * @returns The assets of the costume.
     */
    costume(
        costumeId: string | number
    ): CostumeAssets {
        if (!costumeId)
            throw new AssetFinderError("You must provide a costume id");

        if (isNaN(+costumeId))
            throw new AssetFinderError("The costume id must be an integer or string");

        return new CostumeAssets(costumeId);
    }

    /**
     * Finds and returns a name depending on the given nameTextMapHash.
     * @param nameTextMapHash - The nameTextMapHash.
     * @param language - The language to get the name. If not specified, the default language will be used.
     * @returns The name of the nameTextMapHash.
     */
    hash(
        nameTextMapHash: string | number,
        language: string = this.language
    ): Hash {
        if (!nameTextMapHash)
            throw new AssetFinderError("You must provide a hash");

        if (isNaN(+nameTextMapHash))
            throw new AssetFinderError("The hash must be an integer or string");

        return new Hash(nameTextMapHash, language);
    }

    /**
     * Converts a string to an enka asset link.
     * @param s - The string to convert.
     * @returns The converted string as a link.
     */
    toLink(s: string): string {
        return `https://enka.network/ui/${s}.png`;
    }
}
