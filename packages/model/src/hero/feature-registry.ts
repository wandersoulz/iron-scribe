import { BaseFeature, FeatureChoice } from "../feature/feature";
import { ResolvedModifier } from "../modifiers/modifier";
import { Ability } from "../ability/ability";

export class FeatureRegistry {
  private modifiers = new Map<string, ResolvedModifier[]>();
  private abilities = new Map<string, Ability[]>();
  private features = new Map<string, BaseFeature[]>();
  private choices = new Map<string, FeatureChoice[]>();

  public registerChoice(sourceId: string, choice: FeatureChoice) {
    const existing = this.choices.get(sourceId) || [];
    this.choices.set(sourceId, [...existing, choice]);
  }
  public registerModifier(sourceId: string, modifier: ResolvedModifier) {
    const existing = this.modifiers.get(sourceId) || [];
    this.modifiers.set(sourceId, [...existing, modifier]);
  }

  public registerAbility(sourceId: string, ability: Ability) {
    const existing = this.abilities.get(sourceId) || [];
    this.abilities.set(sourceId, [...existing, ability]);
  }

  public registerFeature(sourceId: string, feature: BaseFeature) {
    const existing = this.features.get(sourceId) || [];
    this.features.set(sourceId, [...existing, feature]);
  }

  public getAllModifiers(): ResolvedModifier[] {
    return Array.from(this.modifiers.values()).flat();
  }

  public getAllAbilities(): Ability[] {
    return Array.from(this.abilities.values()).flat();
  }

  public getAllFeatures(): BaseFeature[] {
    return Array.from(this.features.values()).flat();
  }

  public getAllChoices(): FeatureChoice[] {
    return Array.from(this.choices.values()).flat();
  }

  public getModifiersForComponent(componentId: string): ResolvedModifier[] {
    return this.modifiers.get(componentId) || [];
  }

  public getAbilitiesForComponent(componentId: string): Ability[] {
    return this.abilities.get(componentId) || [];
  }

  public getFeaturesForComponent(componentId: string): BaseFeature[] {
    return this.features.get(componentId) || [];
  }

  public clear() {
    this.modifiers.clear();
    this.abilities.clear();
    this.features.clear();
  }
}
