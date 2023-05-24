import { substats as sContent } from "../utils";
import { hashes as hContent } from "../utils";
import { AssetFinderOptions } from "../types";

const substats: { [key: number]: any } = sContent;
const hashes: { [key: string]: any } = hContent;

/**
 * A class that structures the parsed substats
 */
export class Substats {
    /**
     * The type of the substat. 
     */
    propType: string;

    /**
     * The value of the substat.
     */
    propValue: number;

    /**
     * The parsed name of the substat.
     */
    parsedPropType: string;

    /**
     * The parsed value of the substat.
     */
    parsedPropValue: number;

    /**
     * Indicates if the substat is percent or an integer.
     */
    isPercent: boolean;
    
    /**
     * Creates a new `Substats` instance.
     * @param substatId - The ID of the substat.
     */
    constructor (substatId: number, language: AssetFinderOptions["language"]) {
        const split = substats[substatId]?.propType.split('_') || [];
        const isPercent = ['HURT','CRITICAL','EFFICIENCY','PERCENT','ADD'].includes(split[split.length - 1] || "") || false;

        this.propType = substats[substatId]?.propType || "";
        this.propValue = substats[substatId]?.propValue || 0;
        this.parsedPropType = hashes[language as string]?.[substats[substatId]?.propType] || "";
        this.parsedPropValue = substats[substatId]?.propValue ? 
            isPercent ?
                Math.round((substats[substatId].propValue * 100 + 0.0001) * 10) / 10 :
                Math.round(substats[substatId].propValue) 
            : 0;
        this.isPercent = isPercent;
    }
}