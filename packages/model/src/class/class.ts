import {
  BaseFeature,
  FeatureType,
  FeatureChoice,
  FeatureChoiceSelection,
} from "../feature/feature";
import { Type } from "class-transformer";
import { Hero } from "../hero/hero";
import { Ability } from "../ability/ability";
import { RegisterFeature } from "../util/types/feature/registry";
import { SubclassDefinition } from "./subclass-definition";
import { ClassFeature } from "./class-feature";
import { CharacteristicName } from "../rules/characteristic";

export class LevelFeatures {
  level: number = 0;

  @Type(() => ClassFeature)
  features?: ClassFeature[];

  @Type(() => Ability)
  abilities?: Ability[];

  @Type(() => FeatureChoice)
  choices?: FeatureChoice[];
}

@RegisterFeature("class")
export class Class extends BaseFeature {
  type: FeatureType = "class";
  id: string = "";
  name: string = "";
  description: string = "";
  heroicResourceName: string = "";
  staminaBase: number = 0;
  staminaPerLevel: number = 0;
  recoveries: number = 0;

  primaryCharacteristics: CharacteristicName[] = [];
  characteristicArrays: number[][] = [];

  @Type(() => LevelFeatures)
  levelFeatures: LevelFeatures[] = [];

  @Type(() => SubclassDefinition)
  subclasses: SubclassDefinition[] = [];

  @Type(() => Ability)
  abilities?: Ability[];

  constructor() {
    super();
  }

  public isComplete(selections: FeatureChoiceSelection[]): boolean {
    return !this.features.some((f) => !f.isComplete(selections));
  }

  public resolveValue(hero: Hero): Class {
    if (this._resolvedCache) return this._resolvedCache as Class;

    const resolved = new Class();
    Object.assign(resolved, this);
    this.resolveBaseValue(hero, resolved);

    // Subclass resolution - they are choices that result in features
    this.subclasses.forEach((sc) => {
      const selection = (hero.reference.selections || []).find(
        (s) => s.choiceId === sc.id,
      );
      if (selection) {
        const selectedSubclass = sc.options.find(
          (o) => o.id === selection.selectedOptionId,
        );
        if (selectedSubclass) {
          const scFeature = new ClassFeature(
            selectedSubclass.id,
            selectedSubclass.name,
            selectedSubclass.description,
          );
          // ... assign abilities, features from selectedSubclass ...
          const resolvedSc = scFeature.resolveValue(hero);
          if (resolvedSc) resolved.features.push(resolvedSc);
        }
      }
    });

    // Characteristic Array Resolution logic from ClassBuilder would go here
    // For now, ensure existing modifiers and features from base are kept

    this._resolvedCache = resolved;
    return resolved;
  }

  public getAvailableCharacteristicScores(hero: Hero): number[] {
    const arrayChoiceId = `choice_${this.id}_array`;
    const arraySelection = (hero.reference.selections || []).find(
      (s) => s.choiceId === arrayChoiceId,
    );
    if (!arraySelection) return [];

    const arrayIdx = parseInt(
      arraySelection.selectedOptionId.split("_").pop() || "0",
    );
    const fullArray = [...this.characteristicArrays[arrayIdx]];

    // Find which values have already been assigned
    const assignedValues: number[] = [];
    (hero.reference.selections || []).forEach((s) => {
      if (s.choiceId.startsWith(`choice_${this.id}_array_${arrayIdx}_val_`)) {
        // This is a value assignment choice.
        // In a real implementation we'd need to map back which value from the array this was.
      }
    });

    return fullArray; // Simplified for now
  }
}
