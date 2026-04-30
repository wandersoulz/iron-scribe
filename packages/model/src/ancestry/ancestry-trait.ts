import {
  BaseFeature,
  FeatureType,
  FeatureChoice,
  FeatureChoiceSelection,
} from "../feature/feature";
import { Type } from "class-transformer";
import { Ability } from "../ability/ability";
import { Hero } from "../hero/hero";
import { RegisterFeature } from "../util/types/feature/registry";

@RegisterFeature("ancestry-trait")
export class AncestryTrait extends BaseFeature {
  type: FeatureType = "ancestry-trait";

  selections?: FeatureChoiceSelection[];

  @Type(() => Ability)
  abilities?: Ability[];

  constructor(
    public id: string,
    public name: string,
    public ancestryId: string,
    public description: string,
    abilities: Ability[],
    public cost?: number,
  ) {
    super();
    this.abilities = abilities;
  }

  resolveValue(hero: Hero): AncestryTrait {
    if (this._resolvedCache) return this._resolvedCache as AncestryTrait;

    // Handle abilities that are specific to an ancestry trait
    let resolvedAbilities: Ability[] = [];
    if (this.abilities) {
      resolvedAbilities = this.abilities
        .map((ability) => ability.resolveValue(hero))
        .filter((a) => !!a);
    }
    resolvedAbilities.forEach((a) =>
      hero.featureRegistry.registerAbility(this.id, a),
    );

    const resolved = new AncestryTrait(
      this.id,
      this.name,
      this.ancestryId,
      this.description,
      resolvedAbilities,
      this.cost,
    );
    this.resolveBaseValue(hero, resolved);

    this._resolvedCache = resolved;
    return resolved;
  }

  public get allChoices(): FeatureChoice[] {
    return this.choices || [];
  }

  public isComplete(selections: FeatureChoiceSelection[]): boolean {
    return !this.allChoices.some(
      (choice) => !choice.isComplete(selections || []),
    );
  }
}
