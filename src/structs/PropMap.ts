import { PropMapAPI, PropMapContentAPI } from "../types"

export class PropMap {
  xp: PropMapContent 
  ascension: PropMapContent 
  level: PropMapContent 
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

class PropMapContent {
  type: number
  ival: string
  val: string

  constructor(data: PropMapContentAPI) {
    this.type = data.type
    this.ival = data.ival || ""
    this.val = data.val || ""
  }
}