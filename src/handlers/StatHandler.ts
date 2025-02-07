/**	BASE CODE PROVIDED BY ALGOINDE, CREATOR OF ENKA.NETWORK **/

import { meta, zzzcharacters, zzzweaponmeta, zzzweapon, zzzequipment, zzzdiscdrivemeta } from "../utils";
import { SRLightCone, SRRelics, SRSkillTreeList } from "../structs";
import { ZZZDiscDrive } from "../structs/Zenless/ZZZDiscDrive";

const DiscDriveMeta: { [key: string]: any } = zzzdiscdrivemeta;
const ZZZCharacters: { [key: string]: any } = zzzcharacters;
const ZZZWeaponMeta: { [key: string]: any } = zzzweaponmeta;
const DiscDrive: { [key: string]: any } = zzzequipment;
const ZZZWeapon: { [key: string]: any } = zzzweapon;
const Meta: { [key: string]: any } = meta;

export class LayerGenerator {
	
	constructor() { }

	static character(c: { characterId: number, ascension: number, level: number }) {
		const ref = Meta.avatar[c.characterId][c.ascension || 0];
		const layer = new PropLayer('character');
		layer.BaseHP = ref.HPBase + ref.HPAdd * (c.level - 1);
		layer.BaseAttack = ref.AttackBase + ref.AttackAdd * (c.level - 1);
		layer.BaseDefence = ref.DefenceBase + ref.DefenceAdd * (c.level - 1);
		layer.BaseSpeed = ref.SpeedBase;
		layer.CriticalChance = ref.CriticalChance;
		layer.CriticalDamage = ref.CriticalDamage;
		layer.AggroBase = ref.BaseAggro;
		layer.SPRatio = 1;
		return layer;
	}

	static weapon(w: SRLightCone) {
		const layer = new PropLayer('weapon');
		const ref = Meta.equipment[w.lightConeId][w.ascension || 0];
		layer.BaseHP = ref.BaseHP + ref.HPAdd * (w.level - 1);
		layer.BaseAttack = ref.BaseAttack + ref.AttackAdd * (w.level - 1);
		layer.BaseDefence = ref.BaseDefence + ref.DefenceAdd * (w.level - 1);
		return layer;
	}

	static weaponAffix(w: SRLightCone) {
		const layer = new PropLayer('weaponAffix');
		const ref = Meta.equipmentSkill[w.lightConeId]?.[w.superImposition];
		if (!ref) return layer;
		for (const prop in ref.props) {
			// @ts-ignore
			layer[prop] += ref.props[prop];
		}
		return layer;
	}

	static relic(list?: SRRelics[]) {
		const layer = new PropLayer('relics');
		list?.forEach((relic) => {
			relic.substats.push(relic.mainStat);

			relic.substats.forEach((prop) => {
				// @ts-ignore
				layer[prop.type] += prop.value;
			});
		});
		return layer;
	}

	static relicSet(list?: SRRelics[]) {
		const layer = new PropLayer('relicSet');
		const sets = list?.map((r) => r?.setId || null).filter(Boolean);
		const setNames: { [key: number]: number } = {};
		sets?.forEach((set) => {
			if (!setNames[set as number]) setNames[set as number] = 0;
			setNames[set as number]++;
		});
		const setList = Object.entries(setNames)
			.map(([id, count]) => ({ id, count: count == 3 ? 2 : count }))
			.filter((s) => s.count > 1);
		setList.forEach((set) => {
			let { id, count } = set;
			let ref = Meta.relic.setSkill[id][count];
			for (const prop in ref.props) {
				// @ts-ignore
				layer[prop] += ref.props[prop];
			};
			count -= 2;
			if (count < 1) return;
			ref = Meta.relic.setSkill[id][count];
			for (const prop in ref.props) {
				// @ts-ignore
				layer[prop] += ref.props[prop];
			};
		});
		return layer;
	}

	static skillTree(list?: SRSkillTreeList[]) {
		const layer = new PropLayer('tree');
		list?.forEach((tree) => {
			const ref = Meta.tree[tree.traceId]?.[tree.level];
			if (!ref) return;
			for (const prop in ref.props) {
				// @ts-ignore
				layer[prop] += ref.props[prop];
			};
		});
		return layer;
	}
}

export class ZZZLayerGenerator {

	constructor() { }

	static character(c: { avatarId: number, level: number, promotion: number, coreSkillEnhancement: number  }) {
		const ref = ZZZCharacters[c.avatarId];
		const layer = new ZZZPropLayer("character");
		layer.BaseHP = ref.BaseProps["11101"] + Math.floor((ref.GrowthProps["11101"] * (c.level - 1)) / 10000) + ref.PromotionProps[c.promotion - 1]["11101"] + (ref.CoreEnhancementProps[c.coreSkillEnhancement]["11101"] || 0);
		layer.BaseAttack = ref.BaseProps["12101"] + Math.floor((ref.GrowthProps["12101"] * (c.level - 1)) / 10000) + ref.PromotionProps[c.promotion - 1]["12101"] + (ref.CoreEnhancementProps[c.coreSkillEnhancement]["12101"] || 0);
		layer.BaseDefence = ref.BaseProps["13101"] + Math.floor((ref.GrowthProps["13101"] * (c.level - 1)) / 10000) + ref.PromotionProps[c.promotion - 1]["13101"] + (ref.CoreEnhancementProps[c.coreSkillEnhancement]["13101"] || 0);
		layer.BaseImpact = ref.BaseProps["12201"] + (ref.CoreEnhancementProps[c.coreSkillEnhancement]["12201"] || 0);
		layer.CriticalChance = (ref.BaseProps["20101"] + (ref.CoreEnhancementProps[c.coreSkillEnhancement]["20101"] || 0));
		layer.CriticalDamage = (ref.BaseProps["21101"] + (ref.CoreEnhancementProps[c.coreSkillEnhancement]["21101"] || 0));
		layer.BaseAnomalyMastery = ref.BaseProps["31401"] + (ref.CoreEnhancementProps[c.coreSkillEnhancement]["31401"] || 0);
		layer.AnomalyProficiency = ref.BaseProps["31201"] + (ref.CoreEnhancementProps[c.coreSkillEnhancement]["31201"] || 0);
		layer.BaseEnergyRegen = (ref.BaseProps["30501"] + (ref.CoreEnhancementProps[c.coreSkillEnhancement]["30501"] || 0));
		layer.PenRatio = (ref.CoreEnhancementProps[c.coreSkillEnhancement]["23101"] || 0);
		return layer;
	}

	static weapon(w: { weaponId: number, level: number, breakLevel: number }) {
		const ref = ZZZWeapon[w.weaponId];
		const layer = new ZZZPropLayer("weapon");
		const mainStatName = propIdToName(ref.MainStat.PropertyId);
		const subStatName = propIdToName(ref.SecondaryStat.PropertyId);
		// @ts-ignore
		layer[mainStatName] = isPercentage(mainStatName)
			? ref.MainStat.PropertyValue * (1 + ZZZWeaponMeta.levels[ref.Rarity][w.level] / 10000 + ZZZWeaponMeta.breakLevels[ref.Rarity][w.breakLevel].Field_YYY / 10000)
			: Math.floor(ref.MainStat.PropertyValue * (1 + ZZZWeaponMeta.levels[ref.Rarity][w.level] / 10000 + ZZZWeaponMeta.breakLevels[ref.Rarity][w.breakLevel].Field_YYY / 10000));
		// @ts-ignore	
		layer[subStatName] = isPercentage(subStatName)
			? ref.SecondaryStat.PropertyValue * (1 + ZZZWeaponMeta.breakLevels[ref.Rarity][w.breakLevel].Field_ZZZ / 10000)
			: Math.floor(ref.SecondaryStat.PropertyValue * (1 + ZZZWeaponMeta.breakLevels[ref.Rarity][w.breakLevel].Field_ZZZ / 10000));
		return layer;
	}

	static discDrives(dd: ZZZDiscDrive[]) {
		const layer = new ZZZPropLayer("discDrive");
		dd?.forEach((discdrive) => {
			const ref = DiscDrive.Items[discdrive.id];
			const mainStatName = propIdToName(discdrive.mainStat.id);
			// @ts-ignore
			layer[mainStatName] += isPercentage(mainStatName)
				? discdrive.mainStat.baseValue * (1 + DiscDriveMeta[ref.Rarity][discdrive.level] / 10000)
				: Math.floor(discdrive.mainStat.baseValue * (1 + DiscDriveMeta[ref.Rarity][discdrive.level] / 10000));

			discdrive.substats.forEach((prop) => {
				const propName = propIdToName(prop.id);
				// @ts-ignore
				layer[propName] += isPercentage(propName)
					? prop.baseValue * prop.rolls
					: Math.floor(prop.baseValue * prop.rolls);
			});
		});
		return layer;
	}

	static discDrivesSet(dd: ZZZDiscDrive[]) {
		const layer = new ZZZPropLayer("discDriveSet");
		const sets = dd?.map((discdrive) => DiscDrive.Items[discdrive.id].SuitId);
		const setNames: { [key: number]: number } = {};
		sets.forEach((set: number) => {
			if (!setNames[set])
				setNames[set] = 0;

			setNames[set]++;
		});
		const setList = Object.entries(setNames)
			.map(([id, count]) => ({ id, count }))
			.filter((s) => s.count > 1);
		setList.forEach((set) => {
			const { id, count } = set;
			const ref = DiscDrive.Suits[id];
			for (const prop in ref.SetBonusProps) {
				const propName = propIdToName(+prop);
				// @ts-ignore
				layer[propName] += ref.SetBonusProps[prop]; 
			}
		});
		return layer;
	}
}

export class PropLayer {
	id: string;
	BaseHP: number;
	HPAddedRatio: number;
	HPDelta: number;
	HPConvert: number;
	BaseAttack: number;
	AttackAddedRatio: number;
	AttackDelta: number;
	AttackConvert: number;
	BaseDefence: number;
	DefenceAddedRatio: number;
	DefenceDelta: number;
	DefenceConvert: number;
	BaseSpeed: number;
	SpeedAddedRatio: number;
	SpeedDelta: number;
	SpeedConvert: number;
	CriticalChance: number;
	CriticalDamage: number;
	SPRatio: number;
	SPRatioConvert: number;
	StatusProbability: number;
	StatusProbabilityConvert: number;
	StatusResistance: number;
	StatusResistanceConvert: number;
	HealRatioBase: number;
	HealRatioConvert: number;
	HealTakenRatio: number;
	ShieldAddedRatio: number;
	ShieldTakenRatio: number;
	AggroBase: number;
	AggroAddedRatio: number;
	AggroDelta: number;
	BreakDamageAddedRatio: number;
	BreakDamageAddedRatioBase: number;
	AllDamageTypeResistance: number;
	PhysicalResistanceDelta: number;
	FireResistanceDelta: number;
	IceResistanceDelta: number;
	ThunderResistanceDelta: number;
	QuantumResistanceDelta: number;
	ImaginaryResistanceDelta: number;
	WindResistanceDelta: number;
	PhysicalPenetrate: number;
	FirePenetrate: number;
	IcePenetrate: number;
	ThunderPenetrate: number;
	QuantumPenetrate: number;
	ImaginaryPenetrate: number;
	WindPenetrate: number;
	AllDamageTypeTakenRatio: number;
	PhysicalTakenRatio: number;
	FireTakenRatio: number;
	IceTakenRatio: number;
	ThunderTakenRatio: number;
	QuantumTakenRatio: number;
	ImaginaryTakenRatio: number;
	WindTakenRatio: number;
	AllDamageTypeAddedRatio: number;
	DOTDamageAddedRatio: number;
	PhysicalAddedRatio: number;
	FireAddedRatio: number;
	IceAddedRatio: number;
	ThunderAddedRatio: number;
	QuantumAddedRatio: number;
	ImaginaryAddedRatio: number;
	WindAddedRatio: number;
	StanceBreakAddedRatio: number;
	AllDamageReduce: number;
	FatigueRatio: number;
	MinimumFatigueRatio: number;

	constructor(id?: string) {
		this.id = id || "";

		// HP = HP_BASE * (1 + HP_AddedRatio) + HP_Delta + HP_CONVERT
		this.BaseHP = 0;
		this.HPAddedRatio = 0;
		this.HPDelta = 0;
		this.HPConvert = 0;

		// Attack = Attack_BASE * (1 + Attack_AddedRatio) + Attack_Delta + Attack_CONVERT = 0
		this.BaseAttack = 0;
		this.AttackAddedRatio = 0;
		this.AttackDelta = 0;
		this.AttackConvert = 0;

		// Defence = Defence_BASE * (1 + Defence_AddedRatio) + Defence_Delta + Defence_CONVERT = 0
		this.BaseDefence = 0;
		this.DefenceAddedRatio = 0;
		this.DefenceDelta = 0;
		this.DefenceConvert = 0;

		// Speed = Speed_BASE * (1 + Speed_AddedRatio) + Speed_Delta + Speed_CONVERT = 0
		this.BaseSpeed = 0;
		this.SpeedAddedRatio = 0;
		this.SpeedDelta = 0;
		this.SpeedConvert = 0;

		// Crit = 0
		this.CriticalChance = 0;
		this.CriticalDamage = 0;

		// Energy Regen = 0
		this.SPRatio = 0;
		this.SPRatioConvert = 0;

		// Effect Hit Rate = 0
		this.StatusProbability = 0;
		this.StatusProbabilityConvert = 0;

		// Effect RES = 0
		this.StatusResistance = 0;
		this.StatusResistanceConvert = 0;

		// Increases heal strength that are created by target = 0
		this.HealRatioBase = 0;
		this.HealRatioConvert = 0;

		// Increases heal strength that are applied to target = 0
		this.HealTakenRatio = 0;

		// Increases shield strength that are created by target = 0
		this.ShieldAddedRatio = 0;

		// Increases shield strength that are applied to target = 0
		this.ShieldTakenRatio = 0;

		// AGGRO = AGGRO_BASE * (1 + AGGRO_AddedRatio) + AGGRO_Delta = 0
		this.AggroBase = 0;
		this.AggroAddedRatio = 0;
		this.AggroDelta = 0;

		// Break Effect = 0
		this.BreakDamageAddedRatio = 0;
		this.BreakDamageAddedRatioBase = 0;

		// Damage Resistances (RES = ALL_DMG_RES + ELEMENT_DMG_RES) = 0
		this.AllDamageTypeResistance = 0;
		this.PhysicalResistanceDelta = 0;
		this.FireResistanceDelta = 0;
		this.IceResistanceDelta = 0;
		this.ThunderResistanceDelta = 0;
		this.QuantumResistanceDelta = 0;
		this.ImaginaryResistanceDelta = 0;
		this.WindResistanceDelta = 0;

		// Elemental Penetrates = 0
		this.PhysicalPenetrate = 0;
		this.FirePenetrate = 0;
		this.IcePenetrate = 0;
		this.ThunderPenetrate = 0;
		this.QuantumPenetrate = 0;
		this.ImaginaryPenetrate = 0;
		this.WindPenetrate = 0;

		// Damage Taken Boost (TAKEN = ALL_DMG_TAKEN + ELEMENT_DMG_TAKEN) = 0
		this.AllDamageTypeTakenRatio = 0;
		this.PhysicalTakenRatio = 0;
		this.FireTakenRatio = 0;
		this.IceTakenRatio = 0;
		this.ThunderTakenRatio = 0;
		this.QuantumTakenRatio = 0;
		this.ImaginaryTakenRatio = 0;
		this.WindTakenRatio = 0;

		// DMG% increases (DMG% = ALL_DMG% + ELEMENT_DMG% + DOT_DMG%) = 0
		this.AllDamageTypeAddedRatio = 0;
		this.DOTDamageAddedRatio = 0;
		this.PhysicalAddedRatio = 0;
		this.FireAddedRatio = 0;
		this.IceAddedRatio = 0;
		this.ThunderAddedRatio = 0;
		this.QuantumAddedRatio = 0;
		this.ImaginaryAddedRatio = 0;
		this.WindAddedRatio = 0;

		// Stance DMG% increase (damage to toughness bar, not break effect) = 0
		this.StanceBreakAddedRatio = 0;

		// Multiplicative DMG reduction TOTAL_DMG_REDUCE = 1 - (1 - CUR_DMG_REDUCE)*(1 - ADDED_DMG_REDUCE)
		// DMG_REDUCE from target attacked, FATIGUE from attacker
		this.AllDamageReduce = 0;
		this.FatigueRatio = 0;
		this.MinimumFatigueRatio = 0;
	}

	static toProp(type: string, value: number, base: number) {
		return { type, value, base };
	}

	get props() {
		return [
			PropLayer.toProp('MaxHP', this.HP, this.BaseHP),
			PropLayer.toProp('Attack', this.Attack, this.BaseAttack),
			PropLayer.toProp('Defence', this.Defence, this.BaseDefence),
			PropLayer.toProp('Speed', this.Speed, this.BaseSpeed),
			PropLayer.toProp('CriticalChance', this.CriticalChance, this.CriticalChance),
			PropLayer.toProp('CriticalDamage', this.CriticalDamage, this.CriticalDamage),
			PropLayer.toProp('BreakDamageAddedRatio', this.BreakDamage, this.BreakDamageAddedRatioBase),
			PropLayer.toProp('HealRatio', this.HealRatioBase, this.HealRatioBase),
			PropLayer.toProp('SPRatio', this.SPRatio, this.SPRatio),
			PropLayer.toProp('StatusProbability', this.StatusProbability, this.StatusProbability),
			PropLayer.toProp('StatusResistance', this.StatusResistance, this.StatusResistance),
			PropLayer.toProp('PhysicalAddedRatio', this.PhysicalAddedRatio + this.AllDamageTypeAddedRatio, this.PhysicalAddedRatio),
			PropLayer.toProp('FireAddedRatio', this.FireAddedRatio + this.AllDamageTypeAddedRatio, this.FireAddedRatio),
			PropLayer.toProp('IceAddedRatio', this.IceAddedRatio + this.AllDamageTypeAddedRatio, this.IceAddedRatio),
			PropLayer.toProp('ThunderAddedRatio', this.ThunderAddedRatio + this.AllDamageTypeAddedRatio, this.ThunderAddedRatio),
			PropLayer.toProp('QuantumAddedRatio', this.QuantumAddedRatio + this.AllDamageTypeAddedRatio, this.QuantumAddedRatio),
			PropLayer.toProp('ImaginaryAddedRatio', this.ImaginaryAddedRatio + this.AllDamageTypeAddedRatio, this.ImaginaryAddedRatio),
			PropLayer.toProp('WindAddedRatio', this.WindAddedRatio + this.AllDamageTypeAddedRatio, this.WindAddedRatio)
		];
	}

	get HP() {
		return this.BaseHP * (1 + this.HPAddedRatio) + this.HPDelta + this.HPConvert;
	}

	get Attack() {
		return this.BaseAttack * (1 + this.AttackAddedRatio) + this.AttackDelta + this.AttackConvert;
	}

	get Defence() {
		return this.BaseDefence * (1 + this.DefenceAddedRatio) + this.DefenceDelta + this.DefenceConvert;
	}

	get Speed() {
		return this.BaseSpeed * (1 + this.SpeedAddedRatio) + this.SpeedDelta + this.SpeedConvert;
	}

	get BreakDamage() {
		return this.BreakDamageAddedRatioBase + this.BreakDamageAddedRatio;
	}

	get Aggro() {
		return this.AggroBase * (1 + this.AggroAddedRatio) + this.AggroDelta;
	}

	//proxies
	get SPRatioBase() {
		return this.SPRatio;
	}
	set SPRatioBase(v) {
		this.SPRatio = v;
	}
	get StatusProbabilityBase() {
		return this.StatusProbability;
	}
	set StatusProbabilityBase(v) {
		this.StatusProbability = v;
	}
	get CriticalChanceBase() {
		return this.CriticalChance;
	}
	set CriticalChanceBase(v) {
		this.CriticalChance = v;
	}
	get CriticalDamageBase() {
		return this.CriticalDamage;
	}
	set CriticalDamageBase(v) {
		this.CriticalDamage = v;
	}
	get StatusResistanceBase() {
		return this.StatusResistance;
	}
	set StatusResistanceBase(v) {
		this.StatusResistance = v;
	}
}

export class ZZZPropLayer {
	id: string;
	BaseHP: number;
	HPRatio: number;
	FlatHP: number;
	BaseAttack: number;
	AttackRatio: number;
	FlatAttack: number;
	BaseDefence: number;
	DefenceRatio: number;
	FlatDefence: number;
	BaseImpact: number;
	ImpactRatio: number;
	CriticalChance: number;
	CriticalDamage: number;
	BaseAnomalyMastery: number;
	AnomalyMasteryRatio: number;
	FlatAnomalyMastery: number;
	AnomalyProficiency: number;
	BaseEnergyRegen: number;
	EnergyRegenRatio: number;
	FlatEnergyRegen: number;
	PenRatio: number;
	Pen: number;
	AddedPhysicalDamageRatio: number;
	AddedFireDamageRatio: number;
	AddedIceDamageRatio: number;
	AddedElectricDamageRatio: number;
	AddedEtherDamageRatio: number;

	constructor(id?: string) {
		this.id = id || "";

		this.BaseHP = 0;
		this.HPRatio = 0;
		this.FlatHP = 0;
		
		this.BaseAttack = 0;
		this.AttackRatio = 0;
		this.FlatAttack = 0;

		this.BaseDefence = 0;
		this.DefenceRatio = 0;
		this.FlatDefence = 0;

		this.BaseImpact = 0;
		this.ImpactRatio = 0;

		this.CriticalChance = 0;
		this.CriticalDamage = 0;

		this.BaseAnomalyMastery = 0;
		this.AnomalyMasteryRatio = 0;
		this.FlatAnomalyMastery = 0;
		this.AnomalyProficiency = 0;

		this.BaseEnergyRegen = 0;
		this.EnergyRegenRatio = 0;
		this.FlatEnergyRegen = 0;

		this.PenRatio = 0;
		this.Pen = 0;

		this.AddedPhysicalDamageRatio = 0;
		this.AddedFireDamageRatio = 0;
		this.AddedIceDamageRatio = 0;
		this.AddedElectricDamageRatio = 0;
		this.AddedEtherDamageRatio = 0;
	}

	get props() {
		return [
			PropLayer.toProp("MaxHP", this.HP, this.BaseHP),
			PropLayer.toProp("Attack", this.Attack, this.BaseAttack),
			PropLayer.toProp("Defence", this.Defence, this.BaseDefence),
			PropLayer.toProp("Impact", this.Impact, this.BaseImpact),
			PropLayer.toProp("CriticalChance", this.CriticalChance / 10000, this.CriticalChance / 10000),
			PropLayer.toProp("CriticalDamage", this.CriticalDamage / 10000, this.CriticalDamage / 10000),
			PropLayer.toProp("AnomalyMastery", this.AnomalyMastery, this.BaseAnomalyMastery),
			PropLayer.toProp("AnomalyProficiency", this.AnomalyProficiency, this.AnomalyProficiency),
			PropLayer.toProp("EnergyRegen", this.EnergyRegen / 100, this.BaseEnergyRegen / 100),
			PropLayer.toProp("PenRatio", this.PenRatio, this.PenRatio),
			PropLayer.toProp("Pen", this.Pen, this.Pen),
			PropLayer.toProp("AddedPhysicalDamageRatio", this.AddedPhysicalDamageRatio / 10000, this.AddedPhysicalDamageRatio / 10000),
			PropLayer.toProp("AddedFireDamageRatio", this.AddedFireDamageRatio / 10000, this.AddedFireDamageRatio / 10000),
			PropLayer.toProp("AddedIceDamageRatio", this.AddedIceDamageRatio / 10000, this.AddedIceDamageRatio / 10000),
			PropLayer.toProp("AddedElectricDamageRatio", this.AddedElectricDamageRatio / 10000, this.AddedElectricDamageRatio / 10000),
			PropLayer.toProp("AddedEtherDamageRatio", this.AddedEtherDamageRatio / 10000, this.AddedEtherDamageRatio / 10000)
		];
	}

	get HP() {
		return this.BaseHP * (1 + this.HPRatio / 10000) + this.FlatHP;
	}

	get Attack() {
		return this.BaseAttack * (1 + this.AttackRatio / 10000) + this.FlatAttack;
	}

	get Defence() {
		return this.BaseDefence * (1 + this.DefenceRatio  / 10000) + this.FlatDefence;
	}

	get Impact() {
		return this.BaseImpact * (1 + this.ImpactRatio / 10000);
	}

	get EnergyRegen() {
		return this.BaseEnergyRegen * (1 + this.EnergyRegenRatio / 10000) + this.FlatEnergyRegen;
	}

	get AnomalyMastery() {
		return this.BaseAnomalyMastery * (1 + this.AnomalyMasteryRatio / 10000) + this.FlatAnomalyMastery;
	}
}

export class PropState {
	layers: Map<string, PropLayer | ZZZPropLayer>;

	constructor() {
		this.layers = new Map();
	}

	sum(type: "sr" | "zzz" = "sr", ...layerNames: string[]) {
		let sum = type === "sr" ? new PropLayer() : new ZZZPropLayer();
		this.layers.forEach((layer) => {
			if (layerNames.length && !layerNames.includes(layer.id)) return;
			for (let prop in layer) {
				if (prop === 'id' || prop === 'disabled') continue;
				// @ts-ignore
				sum[prop] += layer[prop];
			}
		});
		return sum;
	}

	add(layer: PropLayer | ZZZPropLayer) {
		this.layers.set(layer.id, layer);
	}

	clear() {
		this.layers.clear();
	}
}

export function ifProp(pr: any, type: string): number | string {
	if (type) {
		pr = {
			value: pr,
			type
		}
	}
	if (pr.type.includes('Speed')) return pr.value?.toFixed(1)
	const p = isPercentage(pr.type);
	if (p) {
		return (Math.floor(pr.value * 1000) / 10).toFixed(1) + '%';
	}
	return Math.floor(pr.value);
}

function propIdToName(propertyId: number) {
	const map: { [key: number]: string } = {
		11101: "BaseHP",
		11102: "HPRatio",
		11103: "FlatHP",
		12101: "BaseAttack",
		12102: "AttackRatio",
		12103: "FlatAttack",
		12201: "BaseImpact",
		12202: "ImpactRatio",
		13101: "BaseDefence",
		13102: "DefenceRatio",
		13103: "FlatDefence",
		20101: "CriticalChance",
		20103: "CriticalChance",
		21101: "CriticalDamage",
		21103: "CriticalDamage",
		23101: "PenRatio",
		23103: "PenRatio",
		23201: "Pen",
		23203: "Pen",
		30501: "BaseEnergyRegen",
		30502: "EnergyRegenRatio",
		30503: "FlatEnergyRegen",
		31201: "AnomalyProficiency",
		31203: "AnomalyProficiency",
		31401: "BaseAnomalyMastery",
		31402: "AnomalyMasteryRatio",
		31403: "FlatAnomalyMastery",
		31501: "AddedPhysicalDamageRatio",
		31503: "AddedPhysicalDamageRatio",
		31601: "AddedFireDamageRatio",
		31603: "AddedFireDamageRatio",
		31701: "AddedIceDamageRatio",
		31703: "AddedIceDamageRatio",
		31801: "AddedElectricDamageRatio",
		31803: "AddedElectricDamageRatio",
		31901: "AddedEtherDamageRatio",
		31903: "AddedEtherDamageRatio",
	};

	return map[propertyId] || "";
}

function isPercentage(property: string): boolean {
	return ['Ratio', 'Rate', 'Chance', 'Probability', 'Resistance', 'Damage'].some((r) => property.includes(r));
}