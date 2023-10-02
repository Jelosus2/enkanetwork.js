import { skilltree as sContent } from "../../../utils";

const skillTree: { [key: string]: any } = sContent;

export class SRSkillTree {
  /**
   * The type of the trace.
   */
  type: number | string;

  /**
   * The position of the trace in the tree.
   */
  pos: string;

  /**
   * The icon path of the trace.
   */
  icon: string;

  /**
   * The name of the trace (if available).
   */
  name: string;

  /**
   * Creates a new `SRSkillTree` instance.
   * @param traceId - The ID of the trace.
   * @param language - The language to get the name.
   */
  constructor(traceId: string | number, language: string) {
    const trace = skillTree[language][traceId];

    this.type = trace?.type || "";
    this.pos = trace?.pos || "";
    this.icon = trace?.icon || "";
    this.name = trace?.name || "";
  }
}
