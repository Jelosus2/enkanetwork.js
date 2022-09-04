import { FightPropMapAPI } from "../types"
import { Stat } from "./Stat"
import { StatPercentage } from "./StatPercentage"

export class FightPropMap {
  baseHp: Stat 
  baseAtk: Stat 
  baseDef: Stat 
  critRate: StatPercentage 
  critDamage: StatPercentage 
  energyRecharge: StatPercentage 
  healingBonus: StatPercentage 
  incomingHealingBonus: StatPercentage 
  elementalMastery: Stat 
  physicalRes: StatPercentage 
  physicalDamageBonus: StatPercentage 
  pyroDamageBonus: StatPercentage 
  electroDamageBonus: StatPercentage 
  hydroDamageBonus: StatPercentage 
  dendroDamageBonus: StatPercentage
  anemoDamageBonus: StatPercentage 
  geoDamageBonus: StatPercentage 
  cryoDamageBonus: StatPercentage 
  pyroRes: StatPercentage 
  electroRes: StatPercentage 
  hydroRes: StatPercentage 
  dendroRes: StatPercentage 
  anemoRes: StatPercentage 
  geoRes: StatPercentage 
  cryoRes: StatPercentage 
  pyroEnergyCost: Stat | string 
  electroEnergyCost: Stat | string 
  hydroEnergyCost: Stat | string 
  dendroEnergyCost: Stat | string 
  anemoEnergyCost: Stat | string 
  cryoEnergyCost: Stat | string 
  geoEnergyCost: Stat | string 
  maxHp: Stat 
  atk: Stat 
  def: Stat 

  constructor(data: FightPropMapAPI) {
    this.baseHp = new Stat(data[1])
    this.baseAtk = new Stat(data[4])
    this.baseDef = new Stat(data[7])
    this.critRate = new StatPercentage(data[20])
    this.critDamage = new StatPercentage(data[22])
    this.energyRecharge = new StatPercentage(data[23])
    this.healingBonus = new StatPercentage(data[26])
    this.incomingHealingBonus = new StatPercentage(data[27])
    this.elementalMastery = new Stat(data[28])
    this.physicalRes = new StatPercentage(data[29])
    this.physicalDamageBonus = new StatPercentage(data[30])
    this.pyroDamageBonus = new StatPercentage(data[40])
    this.electroDamageBonus = new StatPercentage(data[41])
    this.hydroDamageBonus = new StatPercentage(data[42])
    this.dendroDamageBonus = new StatPercentage(data[43])
    this.anemoDamageBonus = new StatPercentage(data[44])
    this.geoDamageBonus = new StatPercentage(data[45])
    this.cryoDamageBonus = new StatPercentage(data[46])
    this.pyroRes = new StatPercentage(data[50])
    this.electroRes = new StatPercentage(data[51])
    this.hydroRes = new StatPercentage(data[52])
    this.dendroRes = new StatPercentage(data[53])
    this.anemoRes = new StatPercentage(data[54])
    this.geoRes = new StatPercentage(data[55])
    this.cryoRes = new StatPercentage(data[56])
    this.pyroEnergyCost = data[70] ? new Stat(data[70]) : ""
    this.electroEnergyCost = data[71] ? new Stat(data[71]) : ""
    this.hydroEnergyCost = data[72] ? new Stat(data[72]) : ""
    this.dendroEnergyCost = data[73] ? new Stat(data[73]) : ""
    this.anemoEnergyCost = data[74] ? new Stat(data[74]) : ""
    this.cryoEnergyCost = data[75] ? new Stat(data[75]) : ""
    this.geoEnergyCost = data[76] ? new Stat(data[76]) : ""
    this.maxHp = new Stat(data[2000])
    this.atk = new Stat(data[2001])
    this.def = new Stat(data[2002])
  }
}