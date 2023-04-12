import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * A class that structures the hash names.
 */
export class Hash {
    /**
     * The value of the hash.
     */
    value: string;

    /**
     * Creates a new `Hash` instance.
     * @param nameTextMapHash - The nameTextMapHash.
     * @param language - The language to get the name.
     */
    constructor(nameTextMapHash: string | number, language: string) {
        const hashes = JSON.parse(readFileSync(join(__dirname, '../../utils/hashes.json'), 'utf-8'));

        this.value = hashes[language]?.[nameTextMapHash] || "";
    }
}