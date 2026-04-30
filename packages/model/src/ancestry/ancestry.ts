import {
  BaseFeature,
  FeatureType,
  FeatureChoiceSelection,
} from "../feature/feature";
import { AncestryTrait } from "./ancestry-trait";
import { Type } from "class-transformer";
import { Hero } from "../hero/hero";
import { RegisterFeature } from "../util/types/feature/registry";

@RegisterFeature("ancestry")
export class Ancestry extends BaseFeature {
  type: FeatureType = "ancestry";

  @Type(() => AncestryTrait)
  signatureTraits: AncestryTrait[] = [];

  @Type(() => AncestryTrait)
  purchasedTraits: AncestryTrait[] = [];

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public loreDescription: string,
    public ancestryPoints: number,
  ) {
    super();
  }

  public resolveValue(hero: Hero): Ancestry {
    if (this._resolvedCache) return this._resolvedCache as Ancestry;

    const resolved = new Ancestry(
      this.id,
      this.name,
      this.description,
      this.loreDescription,
      this.ancestryPoints,
    );
    this.resolveBaseValue(hero, resolved);

    resolved.signatureTraits = this.signatureTraits.map(
      (t) => t.resolveValue(hero) as AncestryTrait,
    );
    resolved.purchasedTraits = this.purchasedTraits.map(
      (t) => t.resolveValue(hero) as AncestryTrait,
    );

    // In our new flat model, the traits are also features of the ancestry
    resolved.features = [
      ...resolved.features,
      ...resolved.signatureTraits,
      ...resolved.purchasedTraits,
    ];

    this._resolvedCache = resolved;
    return resolved;
  }

  public getSignatureTraits(hero: Hero): AncestryTrait[] {
    const resolved = this.resolveValue(hero);
    return resolved.signatureTraits;
  }

  public getPurchasedTraits(hero: Hero): AncestryTrait[] {
    const resolved = this.resolveValue(hero);
    return resolved.purchasedTraits;
  }

  public isComplete(selections: FeatureChoiceSelection[]): boolean {
    return !this.children.some((child) => !child.isComplete(selections));
  }

  private get children(): AncestryTrait[] {
    return [...this.signatureTraits, ...this.purchasedTraits];
  }
}
