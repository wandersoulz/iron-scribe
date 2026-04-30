import { Ancestry } from "../ancestry/ancestry";
import { Class } from "../class/class";
import { StatValueResolver } from "../modifiers/stat-value-resolver";
import { HeroReference } from "./hero-reference";
import {
  BaseFeature,
  FeatureChoice,
  FeatureChoiceReference,
} from "../feature/feature";
import { Library } from "../sourcebook/library";
import { Modifier, ResolvedModifier } from "../modifiers/modifier";
import { Ability } from "../ability/ability";
import { FeatureRegistry } from "./feature-registry";

export class Hero extends StatValueResolver {
  private numericStatCache = new Map<string, number>();
  private stringStatCache = new Map<string, string>();
  private listCache = new Map<string, any[]>();
  private resolvedComponents: BaseFeature[] = [];
  public featureRegistry = new FeatureRegistry();

  public constructor(
    public reference: HeroReference,
    public components: BaseFeature[],
    public library: Library,
    private heroDefaults: any,
  ) {
    super();
    this.id = reference.id;
    this.name = reference.name;
    this.resolveAll();
    console.log(this.featureRegistry.getAllModifiers());
    console.log("resolved all values");
  }

  private resolveAll() {
    this.featureRegistry.clear();
    this.resolvedComponents = this.components
      .map((c) => c.resolveValue(this))
      .filter((c) => !!c) as BaseFeature[];
  }

  public get allAbilities(): Ability[] {
    return this.featureRegistry.getAllAbilities();
  }

  private getAllModifiers(): ResolvedModifier[] {
    return this.featureRegistry.getAllModifiers();
  }

  public get ancestry(): Ancestry | undefined {
    return this.resolvedComponents.find(
      (c) => c.type === "ancestry",
    ) as Ancestry;
  }

  public get class(): Class | undefined {
    return this.resolvedComponents.find((c) => c.type === "class") as Class;
  }

  public getStringStat(statName: string): string {
    if (this.stringStatCache.has(statName)) {
      return this.stringStatCache.get(statName)!;
    }
    let finalValue = (this.heroDefaults[statName] as string) || "";

    const relevantModifiers = this.getAllModifiers().filter(
      (m) => m.modifierType === "stat" && m.target === statName,
    );

    const overrides = relevantModifiers.filter(
      (m) => m.operation === "override",
    );
    if (overrides.length > 0) {
      finalValue = overrides[0].value as unknown as string;
    } else {
      const bases = relevantModifiers.filter((m) => m.operation === "base");
      if (bases.length > 0) {
        finalValue = bases[bases.length - 1].value as unknown as string;
      }
    }

    this.stringStatCache.set(statName, finalValue);
    return finalValue;
  }

  public getValueFromCombatState(statName: string): number | null {
    if (statName in this.reference.heroCombatState) {
      return this.reference.heroCombatState[
        statName as keyof typeof this.reference.heroCombatState
      ] as number;
    }
    return null;
  }

  public getNumericStat(statName: string): number {
    if (this.numericStatCache.has(statName)) {
      return this.numericStatCache.get(statName)!;
    }

    const defaultValue = (this.heroDefaults[statName] as number) || 0;
    let finalValue = this.getValueFromCombatState(statName);
    if (finalValue != null) {
      return finalValue;
    }

    const relevantModifiers = this.getAllModifiers().filter(
      (m) => m.modifierType === "stat" && m.target === statName,
    );

    const overrides = relevantModifiers.filter(
      (m) => m.operation === "override",
    );
    if (overrides.length > 0) {
      const overrideValues = overrides.map(
        (mod) => mod.value as unknown as number,
      );
      finalValue = Math.min(...overrideValues);
    } else {
      const baseModifiers = relevantModifiers.filter(
        (m) => m.operation === "base",
      );
      const baseValue =
        baseModifiers.length > 0
          ? Math.max(
              ...baseModifiers.map((mod) => mod.value as unknown as number),
            )
          : defaultValue;

      const bonusValue = relevantModifiers
        .filter((m) => m.operation === "bonus")
        .map((mod) => mod.value as unknown as number)
        .reduce((prev, curr) => prev + curr, 0);

      finalValue = baseValue + bonusValue;
    }

    this.numericStatCache.set(statName, finalValue);
    return finalValue;
  }

  public getList(listName: string): (string | number | BaseFeature)[] {
    console.log(listName);
    if (this.listCache.has(listName)) {
      return this.listCache.get(listName) || [];
    }

    const relevantModifiers = this.getAllModifiers().filter(
      (m) => m.modifierType === "list" && m.target === listName,
    );
    console.log(relevantModifiers);
    const results = relevantModifiers
      .filter((mod) => mod.operation === "add")
      .map((mod) => mod.value)
      .filter((feat) => feat != null);

    this.listCache.set(listName, results);
    return results;
  }

  public isComplete(): boolean {
    return !this.components.some(
      (comp) => !comp.isComplete(this.reference.selections || []),
    );
  }

  public resolveChoiceReference(
    choiceReference: FeatureChoiceReference,
  ): BaseFeature | null {
    // 1. Try to find the choice in the registry first (fast path)
    const foundChoice = this.featureRegistry
      .getAllChoices()
      .find(
        (f) => f.id === choiceReference.choiceId && f instanceof FeatureChoice,
      ) as FeatureChoice | undefined;
    if (foundChoice) {
      const selection = (this.reference.selections || []).find(
        (s) => s.choiceId === choiceReference.choiceId,
      );
      if (selection) {
        return foundChoice.getSelectionValue(selection, this);
      }
    }

    // 2. Fallback to recursive search if not found in registry (might happen during initial resolution)
    let searchedChoice: FeatureChoice | null = null;
    const traverse = (f: BaseFeature) => {
      if (!f || searchedChoice) return;

      if (f.choices) {
        const choice = f.choices.find((c) => c.id === choiceReference.choiceId);
        if (choice) {
          searchedChoice = choice;
          return;
        }
      }

      if (f.features) f.features.forEach(traverse);

      if (f.choices) {
        f.choices.forEach((choice) => {
          const selection = (this.reference.selections || []).find(
            (s) => s.choiceId === choice.id,
          );
          if (selection) {
            const selected = choice.getSelectionValue(selection, this);
            if (selected) traverse(selected);
          }
        });
      }
    };

    this.components.forEach(traverse);

    if (!searchedChoice) return null;

    const selection = (this.reference.selections || []).find(
      (selection) => selection.choiceId == choiceReference.choiceId,
    );
    if (!selection) return null;
    return (searchedChoice as FeatureChoice).getSelectionValue(selection, this);
  }
}
