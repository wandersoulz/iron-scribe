import { BaseFeature, FeatureChoiceReference } from "../feature/feature";
import { Hero } from "../hero/hero";
import { FeatureTypeRegistry } from "../util/types/feature/registry";
import { DynamicValue, resolveDynamicValue } from "./dynamic-value";
import { Type } from "class-transformer";

export type ModifierOperation =
  | "base"
  | "bonus"
  | "multiplier"
  | "override"
  | "add"
  | "remove";

export type ModifierType = "list" | "stat";

export class ModifierValue {
  dynamicValue?: DynamicValue<any>;

  @Type(() => BaseFeature, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: "type",
      subTypes: FeatureTypeRegistry.subTypes,
    },
  })
  featureValue?: BaseFeature;

  choiceReferenceValue?: FeatureChoiceReference;

  constructor(
    dynamicValue?: DynamicValue<any>,
    featureValue?: BaseFeature,
    choiceReferenceValue?: FeatureChoiceReference,
  ) {
    this.dynamicValue = dynamicValue;
    this.featureValue = featureValue;
    this.choiceReferenceValue = choiceReferenceValue;
  }

  getValue(hero: Hero): BaseFeature | number | string | null {
    if (this.dynamicValue) {
      return resolveDynamicValue(this.dynamicValue, hero);
    } else if (this.choiceReferenceValue) {
      return hero.resolveChoiceReference(this.choiceReferenceValue);
    } else if (this.featureValue) {
      return this.featureValue.resolveValue(hero);
    }
    return null;
  }
}

export class Modifier {
  modifierType: ModifierType;
  operation: ModifierOperation;
  target: string;

  @Type(() => ModifierValue)
  value: ModifierValue;

  constructor(
    modifierType: ModifierType,
    operation: ModifierOperation,
    target: string,
    value: ModifierValue,
  ) {
    this.modifierType = modifierType;
    this.operation = operation;
    this.target = target;
    this.value = value;
  }

  public resolveValue(hero: Hero): ResolvedModifier {
    let resolvedValue = this.value.getValue(hero);

    return new ResolvedModifier(
      this.modifierType,
      this.operation,
      this.target,
      resolvedValue,
    );
  }
}

export class ResolvedModifier {
  modifierType: ModifierType;
  operation: ModifierOperation;
  target: string; // stat name or list name

  value: BaseFeature | string | number | null;

  constructor(
    modifierType: ModifierType,
    operation: ModifierOperation,
    target: string,
    value: BaseFeature | string | number | null,
  ) {
    this.modifierType = modifierType;
    this.operation = operation;
    this.target = target;
    this.value = value;
  }
}
