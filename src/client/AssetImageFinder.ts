import { AssetFinderError } from "../errors/AssetFinderError"
import { CharacterImages } from "../structs/Utils/CharacterImages"
import { NamecardImages } from "../structs/Utils/NamecardImages"
import { TalentImages } from "../structs/Utils/TalentImages"
import { characters, namecards, skills, talents } from "../utils"

export class AssetImageFinder {
  constructor() {}

  character(avatarId: string | number) {
    if (!avatarId) throw new AssetFinderError('You must provide the avatar id')
    return new CharacterImages(characters[avatarId])
  }

  namecard(namecardId: string | number) {
    if (!namecardId) throw new AssetFinderError('You must provide the namecard id')
    
    return new NamecardImages(namecards[namecardId])
  }

  talent(skillId: string | number) {
    if (!skillId) throw new AssetFinderError('You must provide the talent id')
    
    return new TalentImages(skills[skillId])
  }

  constellations(talentId: string | number) {
    if (!talentId) throw new AssetFinderError('You must provide the constellation id')
    
    return new TalentImages(talents[talentId])
  }
}