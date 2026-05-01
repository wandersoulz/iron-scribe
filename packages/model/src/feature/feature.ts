import { Named } from "../data/named";
import { Hero } from "../hero/hero";
import { Modifier, ResolvedModifier } from "../modifiers/modifier";
import { Type } from "class-transformer";
import {
  FeatureTypeRegistry,
  RegisterFeature,
} from "../util/types/feature/registry";
import { Library } from "../sourcebook/library";
import { Identifiable } from "../data/identifiable";
import { ChoiceProviderRegistry } from "./choice-provider";

export type FeatureType =
  | "feature"
  | "class-feat"
  | "class"
  | "characteristic"
  | "ancestry"
  | "ancestry-trait"
  | "career"
  | "perk"
  | "perk-type"
  | "domain"
  | "subclass-option"
  | "subclass-definition"
  | "ability"
  | "skill"
  | "skill-group"
  | "language"
  | "damage"
  | "damage-immunity"
  | "condition"
  | "stat-modifier"
  | "list-modifier"
  | "feature-choice";

export abstract class BaseFeature implements Named {
  name: string = "";
  id: string = "";
  type: FeatureType = "feature";
  description: string = "";

  @Type(() => Modifier)
  modifiers: Modifier[] | ResolvedModifier[] = [];

  @Type(() => BaseFeature, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: "type",
      subTypes: FeatureTypeRegistry.subTypes,
    },
  })
  features: BaseFeature[] = [];

  @Type(() => FeatureChoice)
  choices: FeatureChoice[] = [];

  @Type(() => BaseFeature, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: "type",
      subTypes: FeatureTypeRegistry.subTypes,
    },
  })
  featuresByLevel?: BaseFeature[][];

  protected _resolvedCache?: BaseFeature;

  abstract resolveValue(hero: Hero): BaseFeature | null;

  abstract isComplete(selections: FeatureChoiceSelection[]): boolean;

  protected resolveBaseValue(hero: Hero, resolved: BaseFeature) {
    // 1. Basic Metadata
    resolved.name = this.name;
    resolved.id = this.id;
    resolved.type = this.type;
    resolved.description = this.description;

    // 2. Register self early
    hero.featureRegistry.registerFeature(this.id, resolved);

    // 3. Resolve and register Choices
    resolved.choices = (this.choices || [])
      .map((c) => c.resolveValue(hero))
      .filter((c) => !!c) as FeatureChoice[];
    resolved.choices.forEach((choice) => {
      hero.featureRegistry.registerChoice(this.id, choice);
    });

    // 5. Resolve and register Sub-Features
    resolved.features = (this.features || [])
      .map((f) => f.resolveValue(hero))
      .filter((f) => f !== null);

    // 6. Resolve Modifiers (last, so they can resolve references)
    resolved.modifiers = this.modifiers
      .map((m) => (m instanceof Modifier ? m.resolveValue(hero) : null))
      .filter((m) => !!m);
    resolved.modifiers.forEach((m) =>
      hero.featureRegistry.registerModifier(this.id, m),
    );

    // 7. Resolve featuresByLevel
    if (this.featuresByLevel) {
      resolved.featuresByLevel = [];
      const heroLevel = hero.getNumericStat("level") || 1;
      for (let i = 0; i < heroLevel; i++) {
        if (this.featuresByLevel[i]) {
          resolved.featuresByLevel[i] = this.featuresByLevel[i]
            .map((f) => f.resolveValue(hero))
            .filter((f) => f !== null);
        }
      }
    }
  }
}

@RegisterFeature("feature")
export class Feature extends BaseFeature {
  resolveValue(hero: Hero): BaseFeature | null {
    const resolved = new Feature();
    this.resolveBaseValue(hero, resolved);
    return resolved;
  }

  isComplete(selections: FeatureChoiceSelection[]): boolean {
    return !this.choices.some(choice => !choice.isComplete(selections));
  }
}

@RegisterFeature("characteristic")
export class CharacteristicFeature extends BaseFeature {
  resolveValue(hero: Hero): BaseFeature | null {
    const resolved = new CharacteristicFeature();
    this.resolveBaseValue(hero, resolved);
    return resolved;
  }

  isComplete(selections: FeatureChoiceSelection[]): boolean {
    return true;
  }
}

export type FeatureFilterNode =
  | { type: "all" }
  | { type: "eq"; field: string; value: string }
  | { type: "in"; field: string; values: string[] }
  | { type: "gt" | "gte" | "lt" | "lte"; field: string; value: number }
  | { type: "has_tag"; tag: string }
  | { type: "and"; queries: FeatureFilterNode[] }
  | { type: "or"; queries: FeatureFilterNode[] }
  | {
      type: "context_stat";
      field: string;
      statName: string;
      operator: "<=" | ">=" | "==";
    };

export interface ResolveContext {}

export interface FeatureChoiceResolveContext {
  selections: FeatureChoiceSelection[];
  library: Library;
}

export class FeatureChoiceDynamicValue implements Identifiable {
  id: string = "";
  type: "dynamic" = "dynamic";
  providerId: string = "";
  config: Record<string, any> = {};

  resolveValue(hero: Hero): FeatureChoiceDynamicValue {
    return this;
  }
}

export class FeatureChoiceRegistryValue implements Identifiable {
  id: string = "";
  type: "registry" = "registry";
  registryName: string = "";

  resolveValue(hero: Hero): FeatureChoiceRegistryValue {
    return this;
  }
}

export class FeatureChoiceStaticValue implements Identifiable {
  id: string = "";
  type: "static" = "static";

  @Type(() => BaseFeature, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: "type",
      subTypes: FeatureTypeRegistry.subTypes,
    },
  })
  contents: BaseFeature[] = [];

  resolveValue(hero: Hero): FeatureChoiceStaticValue {
    const resolved = new FeatureChoiceStaticValue();

    resolved.contents = this.contents
      .map((feat) => feat.resolveValue(hero))
      .filter((feat) => feat != null);

    return resolved;
  }
}

export type FeatureChoiceValue =
  | FeatureChoiceRegistryValue
  | FeatureChoiceStaticValue
  | FeatureChoiceDynamicValue;

@RegisterFeature("feature-choice")
export class FeatureChoice extends BaseFeature {
  @Type(() => Object, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: "type",
      subTypes: [
        { value: FeatureChoiceStaticValue, name: "static" },
        { value: FeatureChoiceRegistryValue, name: "registry" },
        { value: FeatureChoiceDynamicValue, name: "dynamic" },
      ],
    },
  })
  public values: FeatureChoiceValue;

  constructor(
    public id: string,
    public name: string,
    values: FeatureChoiceValue,
    public count: number,
    public filter?: FeatureFilterNode,
  ) {
    super();
    this.values = values;
  }
  type: FeatureType = "feature-choice";

  resolveValue(hero: Hero): FeatureChoice {
    if (this._resolvedCache) return this._resolvedCache as FeatureChoice;

    const resolved = new FeatureChoice(
      this.id,
      this.name,
      this.values.resolveValue(hero),
      this.count,
      this.filter,
    );
    this.resolveBaseValue(hero, resolved);

    // Register this choice in the feature registry
    hero.featureRegistry.registerChoice(this.id, resolved);

    this._resolvedCache = resolved;
    return resolved;
  }

  private getChoiceValue(
    selection: FeatureChoiceSelection,
    hero: Hero,
  ): BaseFeature | null {
    const library = hero.library;
    if (!selection || !selection.selectedOptionId) {
      return null;
    }

    let val: BaseFeature | null = null;
    if (this.values.type == "registry") {
      val =
        library
          .getCompositeRegistry<BaseFeature>(this.values.registryName)
          .getSync(selection.selectedOptionId) || null;
    } else if (this.values.type == "dynamic") {
      const options = ChoiceProviderRegistry.resolve(this.values, hero);
      val = options.find((opt) => opt.id === selection.selectedOptionId) || null;
    } else {
      val =
        this.values.contents.find(
          (val) => val.id == selection.selectedOptionId,
        ) || null;
    }

    return val?.resolveValue(hero) || null;
  }

  public getSelectionValue(
    selection: FeatureChoiceSelection,
    hero: Hero,
  ): BaseFeature | null {
    return this.getChoiceValue(selection, hero);
  }

  public isComplete(selections: FeatureChoiceSelection[]): boolean {
    return selections.find((s) => s.choiceId == this.id) != null;
  }
}

export interface FeatureChoiceSelection {
  choiceId: string;
  selectedOptionId: string;
}

export interface FeatureChoiceReference {
  choiceId: string;
}
