import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ConstellationImage } from "../../types";

/**
 * A class that structures the constellation assets and name.
 */
export class ConstellationAssets {
    /**
     * The name of the constellation.
     */
    name: string;

    /**
     * The assets of the constellation.
     */
    assets: ConstellationImages;

    /**
     * Creates a new `ConstellationAssets` instance.
     * @param constellationId - The ID of the constellation.
     * @param language - The language used to get the name.
     */
    constructor(constellationId: string | number, language: string) {
        const talents = JSON.parse(readFileSync(join(__dirname, '../../utils/talents.json'), 'utf-8'));
        const hashes = JSON.parse(readFileSync(join(__dirname, '../../utils/hashes.json'), 'utf-8'));

        this.name = hashes[language][talents[constellationId]?.nameTextMapHash] || "";
        this.assets = talents[constellationId] ? new ConstellationImages(talents[constellationId]) : {} as ConstellationImages;
    }
}

/**
 * A class that structures the constellation images.
 */
export class ConstellationImages {
    /**
     * The constellation's icon.
     */
    icon: string;

    /**
     * Creates a new `ConstellationImages` instance.
     * @param data - The data of the constellation.
     */
    constructor(data: ConstellationImage) {
        this.icon = data ? data.icon : "";
    }
}
