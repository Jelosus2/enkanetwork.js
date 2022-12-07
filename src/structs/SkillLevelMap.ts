import { AssetImageFinder } from "../client/AssetImageFinder"
import { AssetNameFinder } from "../client/AssetNameFinder"
import { AssetNameFinderOptions } from "../types"
import { TalentImages } from "./AssetImages"

const fourSkills: { [key: string]: any } = {
  "10000002": {
    "normalAttacks": 3,
    "elementalSkill": 1,
    "elementalBurst": 2
  },
  "10000041": {
    "normalAttacks": 0,
    "elementalSkill": 1,
    "elementalBurst": 3
  }
}

export class SkillLevelMap {
  normalAttacks: Skill 
  elementalSkill: Skill 
  elementalBurst: Skill 

  constructor(data: any, characterId: number) {
    this.normalAttacks = new Skill(data[Object.keys(data)[fourSkills[characterId]?.normalAttacks || 0]], +Object.keys(data)[fourSkills[characterId]?.normalAttacks || 0])
    this.elementalSkill = new Skill(data[Object.keys(data)[fourSkills[characterId]?.elementalSkill || 1]], +Object.keys(data)[fourSkills[characterId]?.elementalSkill || 1])
    this.elementalBurst = new Skill(data[Object.keys(data)[fourSkills[characterId]?.elementalBurst || 2]], +Object.keys(data)[fourSkills[characterId]?.elementalBurst || 2])
  }
}

class Skill {
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