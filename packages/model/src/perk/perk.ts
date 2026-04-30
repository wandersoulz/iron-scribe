import {
  BaseFeature,
  FeatureType,
  FeatureChoiceSelection,
} from "../feature/feature";
import { Hero } from "../hero/hero";
import { RegisterFeature } from "../util/types/feature/registry";

@RegisterFeature("perk")
export class Perk extends BaseFeature {
  type: FeatureType = "perk";

  public resolveValue(hero: Hero): Perk {
    if (this._resolvedCache) return this._resolvedCache as Perk;

    const resolved = new Perk();
    Object.assign(resolved, this);
    this.resolveBaseValue(hero, resolved);

    this._resolvedCache = resolved;
    return resolved;
  }

  public isComplete(selections: FeatureChoiceSelection[]): boolean {
    const choicesComplete = this.choices.every((choice) =>
      selections.some((selection) => selection.choiceId === choice.id),
    );
    const featuresComplete = this.features.every((feature) =>
      feature.isComplete(selections),
    );
    return choicesComplete && featuresComplete;
  }
}
