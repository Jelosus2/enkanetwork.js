import { hashes } from "../../utils/hashes"

export class AssetName {
  value: string | null

  constructor(language: string, hash: string | number) {
    this.value = hashes[language][hash] ? hashes[language][hash] : null
  }
}