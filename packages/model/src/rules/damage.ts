import { DynamicValue, resolveDynamicValue } from "../modifiers/dynamic-value";
import {
  BaseFeature,
  FeatureType,
  FeatureChoiceReference,
  FeatureChoiceSelection,
  ResolveContext,
} from "../feature/feature";
import { Transform, Type } from "class-transformer";
import { Hero } from "../hero/hero";
import { RegisterFeature } from "../util/types/feature/registry";
import { Named } from "../data/named";

@RegisterFeature("damage")
export class Damage extends BaseFeature {
  type: FeatureType = "damage";

  constructor(id: string, name: string) {
    super();
    this.id = id;
    this.name = name;
  }

  resolveValue(hero: Hero): Damage | null {
    if (this._resolvedCache) return this._resolvedCache as Damage;

    const resolved = new Damage(this.id, this.name);
    this.resolveBaseValue(hero, resolved);

    this._resolvedCache = resolved;
    return resolved;
  }

  isComplete(selections: FeatureChoiceSelection[]): boolean {
    return true;
  }
}

export class DamageType {
  @Type(() => Damage)
  damageValue?: Damage;
  damageChoiceReference?: FeatureChoiceReference;

  constructor(
    damageValue?: Damage,
    damageChoiceReference?: FeatureChoiceReference,
  ) {
    this.damageValue = damageValue;
    this.damageChoiceReference = damageChoiceReference;
  }
}

@RegisterFeature("damage-immunity")
export class DamageImmunity extends BaseFeature {
  type: FeatureType = "damage-immunity";

  value: number | DynamicValue<number>;

  damageType?: DamageType;

  constructor(
    id: string,
    name: string,
    value: number | DynamicValue<number>,
    damageType?: DamageType,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.value = value;
    this.damageType = damageType;
  }

  public resolveValue(hero: Hero): ResolvedDamageImmunity {
    if (this._resolvedCache)
      return this._resolvedCache as ResolvedDamageImmunity;

    const resolvedValue =
      typeof this.value === "number"
        ? (this.value as number)
        : (resolveDynamicValue(this.value, hero) as number);

    let resolvedDamageType: Damage | null = null;
    if (this.damageType) {
      if (this.damageType.damageChoiceReference) {
        resolvedDamageType = hero.resolveChoiceReference(
          this.damageType.damageChoiceReference,
        ) as Damage;
      } else {
        resolvedDamageType = this.damageType.damageValue!.resolveValue(hero);
      }
    }

    const resolved = new ResolvedDamageImmunity(
      this.id,
      this.name,
      resolvedValue,
      resolvedDamageType || undefined,
    );

    return resolved;
  }

  isComplete(selections: FeatureChoiceSelection[]): boolean {
    if (
      this.damageType &&
      "choiceId" in this.damageType &&
      typeof this.damageType.choiceId === "string"
    ) {
      const selection = selections.find(
        (select) =>
          select.choiceId ==
          (this.damageType! as FeatureChoiceReference).choiceId,
      );
      return selection != null;
    }

    return true;
  }
}

export class ResolvedDamageImmunity extends BaseFeature {
  type: FeatureType = "damage-immunity";

  value: number;

  damageType?: Damage;

  constructor(
    public id: string,
    public name: string,
    value: number,
    damageType?: Damage,
  ) {
    super();
    this.value = value;
    this.damageType = damageType;
  }

  resolveValue(hero: Hero): BaseFeature | null {
    return this;
  }

  isComplete(selections: FeatureChoiceSelection[]): boolean {
    return true;
  }
}
