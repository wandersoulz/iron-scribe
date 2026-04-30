import { Type } from "class-transformer";
import { Ability } from "../ability/ability";
import {
  FeatureType,
  BaseFeature,
  FeatureChoiceSelection,
} from "../feature/feature";
import { Hero } from "../hero/hero";
import { RegisterFeature } from "../util/types/feature/registry";

@RegisterFeature("class-feat")
export class ClassFeature extends BaseFeature {
  type: FeatureType = "class-feat";

  level: number = 1;

  selections?: FeatureChoiceSelection[];

  @Type(() => Ability)
  abilities?: Ability[];

  constructor(
    public id: string,
    public name: string,
    public description: string,
    abilities?: Ability[],
  ) {
    super();
    this.abilities = abilities;
  }

  public resolveValue(hero: Hero): ClassFeature | null {
    if (this._resolvedCache) return this._resolvedCache as ClassFeature;

    const resolved = new ClassFeature(this.id, this.name, this.description);
    this.resolveBaseValue(hero, resolved);
    resolved.level = this.level;

    this._resolvedCache = resolved;
    return resolved;
  }

  public isComplete(selections: FeatureChoiceSelection[]): boolean {
    return !this.choices?.some((c) => !c.isComplete(selections || []));
  }
}
