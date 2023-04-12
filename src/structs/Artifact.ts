import { AssetFinder } from "../client";
import {
    AssetFinderOptions,
    ArtifactAPI,
    ArtifactSubstatsAPI,
} from "../types";

/**
 * A class that structures the artifact's data.
 */
export class Artifact {
    /**
     * The artifact's ID.
     */
    artifactId: number | string;

    /**
     * The artifact's level.
     */
    level: number;

    /**
     * The artifact's name text map hash.
     */
    nameTextMapHash: string;

    /**
     * The artifact's set name text map hash.
     */
    setNameTextMapHash: string;

    /**
     * The artifact's rank stars.
     */
    stars: number;

    /**
     * The artifact's main stat data.
     */
    mainstat: ArtifactMainStat;

    /**
     * The artifact's sub stats data.
     */
    substats: ArtifactSubstats[];

    /**
     * The artifact's rolled sub stats IDs.
     */
    rolledSubstatsIds: number[];

    /**
     * The item type.
     */
    itemType: string;

    /**
     * The artifact's icon.
     */
    icon: string;

    /**
     * The artifact's equip type.
     */
    equipType: string;

    /**
     * The artifact's name.
     */
    name: string;

    /**
     * The artifact's set name.
     */
    setName: string;

    /**
     * Creates a new `Artifact` instance.
     * @param data - The data of the artifact.
     * @param language - The language to get the name.
     */
    constructor(data: ArtifactAPI, language: AssetFinderOptions["language"]) {
        this.artifactId = data.itemId;
        this.level = data.reliquary.level;
        this.nameTextMapHash = data.flat.nameTextMapHash;
        this.setNameTextMapHash = data.flat.setNameTextMapHash;
        this.stars = data.flat.rankLevel;
        this.mainstat = new ArtifactMainStat(data);
        this.substats = data.flat.reliquarySubstats
            ? data.flat.reliquarySubstats.map((data) => new ArtifactSubstats(data))
            : [];
        this.rolledSubstatsIds = data.reliquary.appendPropIdList;
        this.itemType = data.flat.itemType;
        this.icon = data.flat.icon;
        this.equipType = data.flat.equipType;
        this.name = new AssetFinder({ language }).hash(this.nameTextMapHash).value;
        this.setName = new AssetFinder({ language }).hash(this.setNameTextMapHash).value;
    }
}

/**
 * A class that structures the artifact's main stat data.
 */
class ArtifactMainStat {
    /**
     * The artifact's main stat.
     */
    stat: string;

    /**
     * The artifact's main stat value.
     */
    statValue: number;

    /**
     * The artifact's main stat id.
     */
    id: number;

    /**
     * Creates a new `ArtifactMainStat` instance.
     * @param data - The data of the artifact.
     */
    constructor(data: ArtifactAPI) {
        this.stat = data.flat.reliquaryMainstat.mainPropId;
        this.statValue = data.flat.reliquaryMainstat.statValue;
        this.id = data.reliquary.mainPropId;
    }
}

/**
 * A class that structures the artifact's sub stats data.
 */
class ArtifactSubstats {
    /**
     * The artifact's sub stat.
     */
    stat: string;

    /**
     * The artifact's sub stat value.
     */
    statValue: number;

    /**
     * Creates a new `ArtifactSubstats` instance.
     * @param data - The data of the artifact's substats.
     */
    constructor(data: ArtifactSubstatsAPI) {
        this.stat = data.appendPropId;
        this.statValue = data.statValue;
    }
}
