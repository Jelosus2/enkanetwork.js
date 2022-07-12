import { AssetFinderError } from "../errors/AssetFinderError";
import { AssetName, CharacterHash, NamecardHash, TalentHash } from "../structs";
import { SkillHash } from "../structs/AssetFinder/SkillHash";
import { AssetNameFinderOptions } from "../types";

export class AssetNameFinder {
  private language: string | undefined
  private languages: string[] = ['en', 'ru', 'vi', 'th', 'pt', 'ko', 'ja', 'id', 'fr', 'es', 'de', 'zh-TW', 'zh-CN']

  constructor(options?: AssetNameFinderOptions) {
    this.language = options?.language
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

  getConstellationHash(talentId: string | number) {
    if (!talentId) throw new AssetFinderError('talentId parameter is required')
    if (isNaN(+talentId)) throw new AssetFinderError('The talent id must be an integer')

    return new TalentHash(talentId)
  }

  getTalentHash(skillId: string | number) {
    if (!skillId) throw new AssetFinderError('skillId parameter is required')
    if (isNaN(+skillId)) throw new AssetFinderError('The skill id must be an integer')

    return new SkillHash(skillId)
  }
}