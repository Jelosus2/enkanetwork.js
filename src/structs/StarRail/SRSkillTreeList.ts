import { AssetFinderOptions, SRSkillTreeListAPI } from "../../types";
import { AssetFinder } from "../../client";
import { skilltree as sContent, srhashes as hContent } from "../../utils";
import { ifProp } from "../../handlers";

const skillTree: { [key: string]: any } = sContent;
const hashes: { [key: string]: any } = hContent;

interface BaseSkill {
  Id: number;
  Name: string;
}

interface Status {
  PropertyType: string;
  Value: number;
}

/**
 * A class that structures the skill tree's data.
 */
export class SRSkillTreeList {
  /**
   * The ID of the trace.
   */
  traceId: number;

  /**
   * The level of the trace.
   */
  level: number;

  /**
   * The type of the trace.
   */
  type: number;

  /**
   * The position of the trace in the tree.
   */
  pos: string;

  /**
   * The icon path of the trace.
   */
  icon: string;

  /**
   * The information about the base skill of the trace.
   */
  baseSkill: SRBaseSkill;

  /**
   * The information about the trace stat.
   */
  status: SRStatus;

  /**
   * The name of the trace.
   */
  name: string;

  /**
   * Creates a new `SRSkillTreeList` instance.
   * @param data - The data of the skill tree.
   * @param language - The language to get the name.
   */
  constructor(data: SRSkillTreeListAPI, language: string) {
    const trace = skillTree[language][data.pointId];

    const { starrail: finder } = new AssetFinder({
      language: language as AssetFinderOptions["language"],
    });

    this.traceId = data.pointId;
    this.level = data.level;
    this.type = +finder.trace(data.pointId).type;
    this.pos = finder.trace(data.pointId).pos;
    this.icon = finder.trace(data.pointId).icon;
    this.baseSkill = trace.baseSkill.Id
      ? new SRBaseSkill(trace.baseSkill, language)
      : ({} as SRBaseSkill);
    this.status = trace.status.Value
      ? new SRStatus(trace.status)
      : ({} as SRStatus);
    this.name = finder.trace(data.pointId).name;
  }
}

/**
 * A class that structures the base skill's data.
 */
class SRBaseSkill {
  /**
   * The ID of the base skill.
   */
  id: number;

  /**
   * The name of the base skill.
   */
  name: string;

  /**
   * Creates a new `SRBaseSkill` instance.
   * @param data - The data of the base skill.
   * @param language - The language to get the name.
   */
  constructor(data: BaseSkill, language: string) {
    this.id = data.Id;
    this.name = hashes[language][data.Name];
  }
}

/**
 * A class that structures the trace stat's data.
 */
class SRStatus {
  /**
   * The type of stat.
   */
  type: string;

  /**
   * The raw value of the trace.
   */
  value: number;

  /**
   * Creates a new `SRStatus` instance.
   * @param data - The data of the status stat.
   */
  constructor(data: Status) {
    this.type = data.PropertyType;
    this.value = data.Value;
  }

  /**
   * @returns The parsed value of the stat.
   */
  parsedValue(): number | string {
    return ifProp(this.cleanup(this.value), this.type);
  }

  private cleanup(v: number): number {
    return Math.round(v * 100000000) / 100000000; 
  }
}
