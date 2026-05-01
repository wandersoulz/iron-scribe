import {
  BaseFeature,
  FeatureType,
  FeatureChoiceSelection,
} from "../feature/feature";
import { Hero } from "../hero/hero";
import { RegisterFeature } from "../util/types/feature/registry";

@RegisterFeature("perk-type")
export class PerkType extends BaseFeature {
  type: FeatureType = "perk-type";

  constructor(
    public id: string,
    public name: string,
    public perkIds: string[],
  ) {
    super();
  }

  resolveValue(hero: Hero): PerkType | null {
    if (this._resolvedCache) return this._resolvedCache as PerkType;

    const resolved = new PerkType(this.id, this.name, this.perkIds);
    this.resolveBaseValue(hero, resolved);

    this._resolvedCache = resolved;
    return resolved;
  }

  isComplete(selections: FeatureChoiceSelection[]): boolean {
    return true;
  }
}
