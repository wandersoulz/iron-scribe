import {
  BaseFeature,
  FeatureType,
  FeatureChoiceSelection,
} from "../feature/feature";
import { Characteristic } from "../rules/characteristic";
import { Damage } from "../rules/damage";
import { MovementType } from "../rules/movement-type";
import { Hero } from "../hero/hero";
import { RegisterFeature } from "../util/types/feature/registry";

export type AbilityType = "standard" | "ancestry" | "heroic" | "signature";

export type ActionType =
  | "main"
  | "maneuver"
  | "move"
  | "triggered"
  | "free triggered"
  | "free"
  | "free maneuver"
  | (string & {});

export interface ConditionEffect {
  condition: string;
  endOfCondition?: string;
}

export interface RolledDamage {
  value: number;
  damageType?: Damage;
  characteristic?: Characteristic[];
  dice?: string;
  movementType?: MovementType;
  movementDistance?: number;
}

export interface TierOutcome {
  damage: RolledDamage;
  movementType?: string;
  movementDistance?: number;
  damageType?: string;
  potencies?: string[];
  conditions?: ConditionEffect[];
}

export interface PowerRoll {
  tierOutcomes: {
    t1: TierOutcome;
    t2: TierOutcome;
    t3: TierOutcome;
  };
  characteristics?: Characteristic[];
}

export type RangeType =
  | "melee"
  | "ranged"
  | "any"
  | "burst"
  | "blast"
  | "cube"
  | "aura"
  | "line"
  | "wall"
  | "special";

export interface Range {
  type: RangeType;
  distance: number;
  size?: number;
}

@RegisterFeature("ability")
export class Ability extends BaseFeature {
  type: FeatureType = "ability";
  abilityType: AbilityType = "standard";
  action: ActionType = "main";
  target: string = "";
  level?: number;
  trigger?: string;
  range: Range = { type: "melee", distance: 0 };
  keywords: string[] = [];
  powerRoll?: PowerRoll;
  effect?: string;
  cost?: number;

  constructor() {
    super();
  }

  resolveValue(hero: Hero): Ability | null {
    if (this._resolvedCache) return this._resolvedCache as Ability;

    const resolved = new Ability();
    Object.assign(resolved, this);
    this.resolveBaseValue(hero, resolved);

    // Explicitly register as an ability in the hero's registry
    hero.featureRegistry.registerAbility(this.id, resolved);

    this._resolvedCache = resolved;
    return resolved;
  }

  isComplete(selections: FeatureChoiceSelection[]): boolean {
    return (
      this.choices
        .map((choice) =>
          selections.find((selection) => selection.choiceId == choice.id),
        )
        .filter((choice) => choice == null).length > 0
    );
  }
}
