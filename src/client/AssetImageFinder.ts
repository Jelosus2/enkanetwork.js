import { AssetFinderError } from "../errors/AssetFinderError"
import { CharacterImages } from "../structs/AssetImages/CharacterImages"
import { NamecardImages } from "../structs/AssetImages/NamecardImages"
import { TalentImages } from "../structs/AssetImages/TalentImages"
import { WeaponImages } from "../structs/AssetImages/WeaponImages"
import { characters, namecards, skills, talents, weapons } from "../utils"

export class AssetImageFinder {
  constructor() {}

  character(characterId: string | number) {
    if (!characterId) throw new AssetFinderError('You must provide the character id')
    return new CharacterImages(characters[characterId])
  }

  namecard(namecardId: string | number) {
    if (!namecardId) throw new AssetFinderError('You must provide the namecard id')
    
    return new NamecardImages(namecards[namecardId])
  }

  talent(talentId: string | number) {
    if (!talentId) throw new AssetFinderError('You must provide the talent id')
    
    return new TalentImages(skills[talentId])
  }

  constellation(constellationId: string | number) {
    if (!constellationId) throw new AssetFinderError('You must provide the constellation id')
    
    return new TalentImages(talents[constellationId])
  }

  weapon(weaponId: string | number) {
    if (!weaponId) throw new AssetFinderError('You must provide the weapon id')
    
    return new WeaponImages(weapons[weaponId])
  }

  toLink(imageName: string) {
    if (!imageName) throw new AssetFinderError('You must provide the image name')

    return `https://enka.network/ui/${imageName}.png`
  }
}