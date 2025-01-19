import { starrailFinder, skilltree as sContent } from "../../utils";
import { SRSkillTreeListAPI } from "../../types";
import { ifProp } from "../../handlers";

const skillTree: { [key: string]: any } = sContent;

interface BaseSkill {
  Id: number;
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
    const traceAssets = starrailFinder[language].trace(data.pointId);
    const trace = skillTree[language][data.pointId];

    this.traceId = data.pointId;
    this.level = data.level;
    this.type = +traceAssets.type;
    this.pos = traceAssets.pos;
    this.icon = traceAssets.icon;
    this.baseSkill = trace.baseSkill.Id
      ? new SRBaseSkill(trace.baseSkill)
      : ({} as SRBaseSkill);
    this.status = trace.status.Value
      ? new SRStatus(trace.status)
      : ({} as SRStatus);
    this.name = traceAssets.name;
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
   * Creates a new `SRBaseSkill` instance.
   * @param data - The data of the base skill.
   * @param language - The language to get the name.
   */
  constructor(data: BaseSkill) {
    this.id = data.Id;
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
