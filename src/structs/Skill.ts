import { AssetImageFinder } from "../client/AssetImageFinder"
import { AssetNameFinder } from "../client/AssetNameFinder"
import { AssetNameFinderOptions } from "../types"
import { TalentImages } from "./Utils"

export class Skill {
  level: number
  id: number
  assets: TalentImages

  constructor(level: number, id: number) {
    this.level = level
    this.id = id
    this.assets = new AssetImageFinder().talent(this.id)
  }

  name(options?: AssetNameFinderOptions) {
    let language = options?.language
    if (!options?.language) language = 'en'

    const skillHash = new AssetNameFinder({ language }).getTalentHash(this.id).value

    return new AssetNameFinder({ language }).search(skillHash).value
  }
}