import { hashes } from "../../utils";

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
        this.value = hashes[language][nameTextMapHash] || "";
    }
}