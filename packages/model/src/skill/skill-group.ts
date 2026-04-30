import {
  BaseFeature,
  FeatureType,
  FeatureChoiceSelection,
} from "../feature/feature";
import { Hero } from "../hero/hero";
import { RegisterFeature } from "../util/types/feature/registry";

@RegisterFeature("skill-group")
export class SkillGroup extends BaseFeature {
  type: FeatureType = "skill-group";

  constructor(
    public id: string,
    public name: string,
    public skillIds: string[],
  ) {
    super();
  }

  resolveValue(hero: Hero): SkillGroup | null {
    if (this._resolvedCache) return this._resolvedCache as SkillGroup;

    const resolved = new SkillGroup(this.id, this.name, this.skillIds);
    this.resolveBaseValue(hero, resolved);

    this._resolvedCache = resolved;
    return resolved;
  }

  isComplete(selections: FeatureChoiceSelection[]): boolean {
    return true;
  }
}
