import {
  BaseFeature,
  FeatureType,
  FeatureChoiceSelection,
} from "../feature/feature";
import { Hero } from "../hero/hero";
import { RegisterFeature } from "../util/types/feature/registry";

@RegisterFeature("career")
export class Career extends BaseFeature {
  type: FeatureType = "career";
  wealth: number = 0;
  renown: number = 0;
  projectPoints: number = 0;

  constructor(
    public id: string,
    public name: string,
    public description: string,
  ) {
    super();
  }

  public resolveValue(hero: Hero): Career {
    if (this._resolvedCache) return this._resolvedCache as Career;

    const resolved = new Career(this.id, this.name, this.description);
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
