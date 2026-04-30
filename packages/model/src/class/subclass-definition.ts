import {
  BaseFeature,
  FeatureType,
  FeatureChoiceSelection,
} from "../feature/feature";
import { Hero } from "../hero/hero";
import { RegisterFeature } from "../util/types/feature/registry";
import { SubclassOption } from "./subclass-option";
import { Type } from "class-transformer";

@RegisterFeature("subclass-definition")
export class SubclassDefinition extends BaseFeature {
  type: FeatureType = "subclass-definition";

  @Type(() => SubclassOption)
  options: SubclassOption[] = [];

  constructor() {
    super();
  }

  resolveValue(hero: Hero): SubclassDefinition | null {
    if (this._resolvedCache) return this._resolvedCache as SubclassDefinition;

    const resolved = new SubclassDefinition();
    Object.assign(resolved, this);
    this.resolveBaseValue(hero, resolved);

    resolved.options = this.options
      .map((o) => o.resolveValue(hero))
      .filter((o) => o !== null) as SubclassOption[];

    this._resolvedCache = resolved;
    return resolved;
  }

  isComplete(selections: FeatureChoiceSelection[]): boolean {
    return !this.options.some((opts) => !opts.isComplete(selections));
  }
}
