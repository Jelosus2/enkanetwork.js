import { SRCharacterSkin } from "../../../types";
import { starrailFinder, skins as sContent } from "../../../utils";

const skins: { [key: string]: SRCharacterSkin } = sContent as any;

/**
 * A class that structures the character skin assets.
 */
export class SRSkin {
    /**
     * The ID of the character associated with the skin.
     */
    characterId: number;

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

    /**
     * Creates a new `SRSkin` instance.
     * @param data - The data of the character skin.
     */
    constructor(skinId: string | number, language: string) {
        const skin = skins[skinId];

        this.characterId = skin?.AvatarID;
        this.name = starrailFinder[language].hash(skin?.AvatarSkinName).value;
        this.fullImage = skin?.AvatarCutinFrontImgPath || "";
        this.icon = skin?.AvatarSideIconPath || "";
    }
}