import { AssetFinder } from "../../client";
import { substats as sContent } from "../../utils";
import {
  AssetFinderOptions,
  ArtifactAPI,
  ArtifactSubstatsAPI,
} from "../../types";

const substats: { [key: string]: any } = sContent;

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
   * The roll quality of the substats.
   */
  substatsRollQuality: ArtifactRollQuality[];

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
    const { genshin: genshinFinder } = new AssetFinder({ language });

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
    this.substatsRollQuality = data.reliquary.appendPropIdList.length > 0
      ? data.reliquary.appendPropIdList.map((data) => new ArtifactRollQuality(data))
      : [];
    this.itemType = data.flat.itemType;
    this.icon = data.flat.icon;
    this.equipType = data.flat.equipType;
    this.name = genshinFinder.hash(
      this.nameTextMapHash
    ).value;
    this.setName = genshinFinder.hash(
      this.setNameTextMapHash
    ).value;
  }

  sumRollQuality(): any[] {
    const rollsQuality: any[] = [];

    this.substatsRollQuality.forEach((substat) => {
      if (!rollsQuality.find((data) => data.type == substat.type)) {
        rollsQuality.push({
          type: substat.type,
          rollQuality: this.substatsRollQuality
            .filter((x) => x.type == substat.type)
            .map((data) => data.rollQuality)
        })
      }
    });

    return rollsQuality;
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

class ArtifactRollQuality {
  /**
   * The ID of the substat roll.
   */
  id: number;

  /**
   * The type of the substat.
   */
  type: string;

  /**
   * The quality of the roll.
   * - 4 - Max roll | 3 - Almost max roll | 2 - Medium roll | 1 - Low roll
   */
  rollQuality: number;

  /**
   * Creates a new `ArtifactRollQuality` instance.
   * @param data - The rolled substat IDs.
   */
  constructor(substatId: number) {
    this.id = substatId;
    this.type = substats[substatId].propType;
    this.rollQuality = substatId % 10;
  }
}