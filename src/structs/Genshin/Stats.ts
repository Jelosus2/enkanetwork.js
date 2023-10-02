import { StatsAPI } from "../../types";

/**
 * A class that structures the stats data. The properties of it are self explanatory.
 */
export class Stats {
  baseHp: Stat;
  hpPercentage: StatPercentage;
  baseAtk: Stat;
  atkPercentage: StatPercentage;
  baseDef: Stat;
  defPercentage: StatPercentage;
  critRate: StatPercentage;
  critDamage: StatPercentage;
  energyRecharge: StatPercentage;
  healingBonus: StatPercentage;
  incomingHealingBonus: StatPercentage;
  elementalMastery: Stat;
  physicalRes: StatPercentage;
  physicalDamageBonus: StatPercentage;
  pyroDamageBonus: StatPercentage;
  electroDamageBonus: StatPercentage;
  hydroDamageBonus: StatPercentage;
  dendroDamageBonus: StatPercentage;
  anemoDamageBonus: StatPercentage;
  geoDamageBonus: StatPercentage;
  cryoDamageBonus: StatPercentage;
  pyroRes: StatPercentage;
  electroRes: StatPercentage;
  hydroRes: StatPercentage;
  dendroRes: StatPercentage;
  anemoRes: StatPercentage;
  geoRes: StatPercentage;
  cryoRes: StatPercentage;
  pyroEnergyCost: Stat;
  electroEnergyCost: Stat;
  hydroEnergyCost: Stat;
  dendroEnergyCost: Stat;
  anemoEnergyCost: Stat;
  cryoEnergyCost: Stat;
  geoEnergyCost: Stat;
  cooldownReduction: StatPercentage;
  shieldStrength: StatPercentage;
  currentPyroEnergy: Stat;
  currentElectroEnergy: Stat;
  currentHydroEnergy: Stat;
  currentDendroEnergy: Stat;
  currentAnemoEnergy: Stat;
  currentCryoEnergy: Stat;
  currentGeoEnergy: Stat;
  currentHp: Stat;
  maxHp: Stat;
  atk: Stat;
  def: Stat;

  /**
   * Creates a new `Stats` instance.
   * @param data - The data of the stats.
   */
  constructor(data: StatsAPI) {
    this.baseHp = new Stat(data[1]);
    this.hpPercentage = new StatPercentage(data[3]);
    this.baseAtk = new Stat(data[4]);
    this.atkPercentage = new StatPercentage(data[6]);
    this.baseDef = new Stat(data[7]);
    this.defPercentage = new StatPercentage(data[9]);
    this.critRate = new StatPercentage(data[20]);
    this.critDamage = new StatPercentage(data[22]);
    this.energyRecharge = new StatPercentage(data[23]);
    this.healingBonus = new StatPercentage(data[26]);
    this.incomingHealingBonus = new StatPercentage(data[27]);
    this.elementalMastery = new Stat(data[28]);
    this.physicalRes = new StatPercentage(data[29]);
    this.physicalDamageBonus = new StatPercentage(data[30]);
    this.pyroDamageBonus = new StatPercentage(data[40]);
    this.electroDamageBonus = new StatPercentage(data[41]);
    this.hydroDamageBonus = new StatPercentage(data[42]);
    this.dendroDamageBonus = new StatPercentage(data[43]);
    this.anemoDamageBonus = new StatPercentage(data[44]);
    this.geoDamageBonus = new StatPercentage(data[45]);
    this.cryoDamageBonus = new StatPercentage(data[46]);
    this.pyroRes = new StatPercentage(data[50]);
    this.electroRes = new StatPercentage(data[51]);
    this.hydroRes = new StatPercentage(data[52]);
    this.dendroRes = new StatPercentage(data[53]);
    this.anemoRes = new StatPercentage(data[54]);
    this.geoRes = new StatPercentage(data[55]);
    this.cryoRes = new StatPercentage(data[56]);
    this.pyroEnergyCost = new Stat(data[70]);
    this.electroEnergyCost = new Stat(data[71]);
    this.hydroEnergyCost = new Stat(data[72]);
    this.dendroEnergyCost = new Stat(data[73]);
    this.anemoEnergyCost = new Stat(data[74]);
    this.cryoEnergyCost = new Stat(data[75]);
    this.geoEnergyCost = new Stat(data[76]);
    this.cooldownReduction = new StatPercentage(data[80]);
    this.shieldStrength = new StatPercentage(data[81]);
    this.currentPyroEnergy = new Stat(data[1000]);
    this.currentElectroEnergy = new Stat(data[1001]);
    this.currentHydroEnergy = new Stat(data[1002]);
    this.currentDendroEnergy = new Stat(data[1003]);
    this.currentAnemoEnergy = new Stat(data[1004]);
    this.currentCryoEnergy = new Stat(data[1005]);
    this.currentGeoEnergy = new Stat(data[1006]);
    this.currentHp = new Stat(data[1010]);
    this.maxHp = new Stat(data[2000]);
    this.atk = new Stat(data[2001]);
    this.def = new Stat(data[2002]);
  }
}

/**
 * A class that implements a method that returns rounded values for raw stats.
 */
class Stat {
  /**
   * The stat's value.
   */
  value: number | string;

  /**
   * Creates a new `Stat` instance.
   * @param data - The value of the stat.
   */
  constructor(data: number) {
    this.value = data || "";
  }

  /**
   * A method that rounds the stat.
   * @returns The rounded stat.
   */
  toRounded() {
    return Math.round(+this.value);
  }
}

/**
 * A class that implements a method that returns the percentage value for percentage stats.
 */
class StatPercentage {
  /**
   * The stat's value.
   */
  value: number | string;

  /**
   * Creates a new `StatPercentage` instance.
   * @param data - The value of the stat.
   */
  constructor(data: number) {
    this.value = data || "0";
  }

  /**
   * A method that makes the stat to be percentage.
   * @returns The converted stat to percentage.
   */
  toPercentage() {
    return Math.round((+this.value * 100 + Number.EPSILON + 0.0001) * 10) / 10;
  }
}
