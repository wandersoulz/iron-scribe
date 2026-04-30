import { BaseFeature, FeatureType } from "../feature/feature";
import { Hero } from "../hero/hero";
import { RegisterFeature } from "../util/types/feature/registry";
import { SubclassOption } from "./subclass-option";

@RegisterFeature("domain")
export class Domain extends SubclassOption {
  type: FeatureType = "domain";
  skillGroupId: string = "";
  dieties?: string[];

  constructor() {
    super();
  }

  resolveValue(hero: Hero): Domain | null {
    if (this._resolvedCache) return this._resolvedCache as Domain;

    const resolved = new Domain();
    Object.assign(resolved, this);
    this.resolveBaseValue(hero, resolved);

    this._resolvedCache = resolved;
    return resolved;
  }
}
