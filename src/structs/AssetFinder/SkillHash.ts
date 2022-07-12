import { skills } from "../../utils/skills"

export class SkillHash {
  value: string | string
  
  constructor(skillId: string | number) {
    this.value = skills[skillId] ? skills[skillId].nameTextMapHash : 'not found'
  }
}