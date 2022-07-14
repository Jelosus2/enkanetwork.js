import { PropMapAPI } from "../types"
import { PropMapContent } from "./PropMapContent"

export class PropMap {
  xp: PropMapContent // changed
  ascension: PropMapContent // changed
  level: PropMapContent // changed
  1003: PropMapContent 
  1004: PropMapContent 
  10010: PropMapContent 

  constructor(data: PropMapAPI) {
    this.xp = new PropMapContent(data[1001]) 
    this.ascension = new PropMapContent(data[1002]) 
    this.level = new PropMapContent(data[4001]) 
    this[1003] = new PropMapContent(data[1003]) 
    this[1004] = new PropMapContent(data[1004]) 
    this[10010] = new PropMapContent(data[10010]) 
  }
}