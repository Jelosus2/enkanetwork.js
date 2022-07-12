import { DataAPI } from "../types"
import { CharactersInfo } from "./CharactersInfo"
import { PlayerInfo } from "./PlayerInfo"

export class Data {
  playerInfo: PlayerInfo
  charactersInfo: CharactersInfo[] | null
  ttl: number

  constructor(data: DataAPI) {
    this.playerInfo = new PlayerInfo(data.playerInfo) 
    this.charactersInfo = data.avatarInfoList ? data.avatarInfoList.map((data) => new CharactersInfo(data)) : null
    this.ttl = data.ttl
  }
}