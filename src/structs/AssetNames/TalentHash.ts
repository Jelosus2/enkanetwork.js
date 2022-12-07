import { talents } from "../../utils/talents"

export class TalentHash {
  value: string | string
  
  constructor(talentId: string | number) {
    this.value = talents[talentId] ? talents[talentId].nameTextMapHash : 'not found'
  }
}