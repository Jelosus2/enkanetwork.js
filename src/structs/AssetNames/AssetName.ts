import { hashes } from "../../utils/hashes"

export class AssetName {
  value: string 

  constructor(language: string, hash: string | number) {
    this.value = hashes[language][hash] || ""
  }
}