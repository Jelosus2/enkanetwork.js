import { characters } from "../../utils/characters"

export class CharacterHash {
  value: string | string
  
  constructor(characterId: string | number) {
    this.value = characters[characterId] ? characters[characterId].nameTextMapHash : 'not found'
  }
}