/**	BASE CODE PROVIDED BY ALGOINDE, CREATOR OF ENKA.NETWORK **/

import { SRLightCone, SRRelics, SRSkillTreeList } from "../structs";
import { meta } from "../utils";

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

export class PropLayer {
	id: string;
	disabled: boolean;
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
		this.disabled = false;

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

export class PropState {
	layers: Map<string, PropLayer>;

	constructor() {
		this.layers = new Map();
	}

	sum(...layerNames: string[]) {
		let sum = new PropLayer();
		this.layers.forEach((layer) => {
			if (layer.disabled) return;
			if (layerNames.length && !layerNames.includes(layer.id)) return;
			for (let prop in layer) {
				if (prop === 'id' || prop === 'disabled') continue;
				// @ts-ignore
				sum[prop] += layer[prop];
			}
		});
		return sum;
	}

	add(layer: PropLayer) {
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
	const p = ['Ratio', 'Rate', 'Chance', 'Probability', 'Resistance', 'Damage'].some((r) => pr.type.includes(r));
	if (p) {
		return (Math.floor(pr.value * 1000) / 10).toFixed(1) + '%';
	}
	return Math.floor(pr.value);
}