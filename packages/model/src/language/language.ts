import {
  BaseFeature,
  FeatureType,
  FeatureChoiceSelection,
} from "../feature/feature";
import { Hero } from "../hero/hero";
import { RegisterFeature } from "../util/types/feature/registry";

@RegisterFeature("language")
export class Language extends BaseFeature {
  type: FeatureType = "language";

  constructor(
    public id: string,
    public name: string,
    public description: string = "",
  ) {
    super();
  }

  resolveValue(hero: Hero): Language | null {
    if (this._resolvedCache) return this._resolvedCache as Language;

    const resolved = new Language(this.id, this.name, this.description);
    this.resolveBaseValue(hero, resolved);

    this._resolvedCache = resolved;
    return resolved;
  }

  isComplete(selections: FeatureChoiceSelection[]): boolean {
    return true;
  }
}
