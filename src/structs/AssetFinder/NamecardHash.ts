import { namecards } from "../../utils/namecards"

export class NamecardHash {
  value: string | string
  
  constructor(namecardId: string | number) {
    this.value = namecards[namecardId] ? namecards[namecardId].nameTextMapHash : 'not found'
  }
}