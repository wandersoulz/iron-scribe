import {
  BaseFeature,
  FeatureType,
  FeatureChoiceSelection,
} from "../feature/feature";
import { Hero } from "../hero/hero";
import { RegisterFeature } from "../util/types/feature/registry";

@RegisterFeature("skill")
export class Skill extends BaseFeature {
  type: FeatureType = "skill";

  constructor(
    public id: string,
    public name: string,
    public skillGroupId: string,
  ) {
    super();
  }

  resolveValue(hero: Hero): Skill | null {
    if (this._resolvedCache) return this._resolvedCache as Skill;

    const resolved = new Skill(this.id, this.name, this.skillGroupId);
    this.resolveBaseValue(hero, resolved);

    this._resolvedCache = resolved;
    return resolved;
  }

  isComplete(selections: FeatureChoiceSelection[]): boolean {
    return true;
  }
}
