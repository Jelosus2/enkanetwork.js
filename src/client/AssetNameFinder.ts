import { AssetFinderError } from "../errors/AssetFinderError"
import { AssetName, NamecardHash, TalentHash } from "../structs"
import { CharacterHash } from "../structs/AssetNames/CharacterHash"
import { SkillHash } from "../structs/AssetNames/SkillHash"
import { AssetNameFinderOptions } from "../types"

export class AssetNameFinder {
  private language: string
  private languages: string[] = ['en', 'ru', 'vi', 'th', 'pt', 'ko', 'ja', 'id', 'fr', 'es', 'de', 'zh-TW', 'zh-CN', 'it', 'tr']

  constructor(options?: AssetNameFinderOptions) {
    this.language = options?.language || 'en'
    if (options?.language && !this.languages.includes(options.language)) throw new AssetFinderError('Invalid or not available language')
  }

  search(hash: string | number) {
    if (!this?.language) this.language = 'en'
    if (!hash) throw new AssetFinderError('hash parameter is required')
    if (isNaN(+hash) && hash != 'not found') throw new AssetFinderError('The hash must be an integer')

    return new AssetName(this.language, hash)
  }

  getCharacterHash(characterId: string | number) {
    if (!characterId) throw new AssetFinderError('characterId parameter is required')
    if (isNaN(+characterId)) throw new AssetFinderError('The character id must be an integer')

    return new CharacterHash(characterId)
  }

  getNamecardHash(namecardId: string | number) {
    if (!namecardId) throw new AssetFinderError('namecardId parameter is required')
    if (isNaN(+namecardId)) throw new AssetFinderError('The name card id must be an integer')

    return new NamecardHash(namecardId)
  }

  getConstellationHash(constellationId: string | number) {
    if (!constellationId) throw new AssetFinderError('constellationId parameter is required')
    if (isNaN(+constellationId)) throw new AssetFinderError('The constellation id must be an integer')

    return new TalentHash(constellationId)
  }

  getTalentHash(talentId: string | number) {
    if (!talentId) throw new AssetFinderError('talentId parameter is required')
    if (isNaN(+talentId)) throw new AssetFinderError('The talent id must be an integer')

    return new SkillHash(talentId)
  }
}