import { Ability } from "../ability/ability";
import { Modifier } from "../modifiers/modifier";
import {
  BaseFeature,
  FeatureType,
  FeatureChoice,
  FeatureChoiceSelection,
} from "../feature/feature";
import { RegisterFeature } from "../util/types/feature/registry";
import { ClassFeature } from "./class-feature";
import { Hero } from "../hero/hero";
import { LevelFeatures } from "./class";
import { Type } from "class-transformer";

@RegisterFeature("subclass-option")
export class SubclassOption extends BaseFeature {
  type: FeatureType = "subclass-option";
  skillGroupId?: string;

  @Type(() => ClassFeature)
  features: BaseFeature[] = []; // Changed from ClassFeature[] to Feature[] to match base

  @Type(() => LevelFeatures)
  levelFeatures?: LevelFeatures[];

  constructor() {
    super();
  }

  resolveValue(hero: Hero): SubclassOption | null {
    if (this._resolvedCache) return this._resolvedCache as SubclassOption;

    const resolved = new SubclassOption();
    Object.assign(resolved, this);
    this.resolveBaseValue(hero, resolved);

    this._resolvedCache = resolved;
    return resolved;
  }

  isComplete(selections: FeatureChoiceSelection[]): boolean {
    return true;
  }
}
