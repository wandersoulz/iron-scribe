import { Hero, HeroReference, Library, BaseFeature } from "@iron-scribe/model";
import { AncestryFactory } from "./ancestry-factory";
import { ClassFactory } from "./class-factory";
import { CareerFactory } from "./career-factory";
import { HERO_DEFAULTS } from "../raw/rules/default-values";

export type ComponentFactory<
  TState,
  TComponent extends BaseFeature = BaseFeature,
> = (
  state: TState,
  library: Library,
  heroReference: HeroReference,
) => Promise<TComponent>;

export const ComponentBuilder: {
  [K in keyof Required<HeroReference["modules"]>]?: ComponentFactory<
    Required<HeroReference["modules"]>[K]
  >;
} = {
  ancestry: (reference, library, heroReference) =>
    AncestryFactory.create(reference, library, heroReference),
  class: (reference, library, heroReference) =>
    ClassFactory.create(reference, library, heroReference),
  career: (reference, library, heroReference) =>
    CareerFactory.create(reference, library, heroReference),
};

export class HeroFactory {
  public static async create(
    reference: HeroReference,
    library: Library,
  ): Promise<Hero> {
    const components: BaseFeature[] = [];
    if (reference.modules) {
      for (const [moduleKey, moduleReference] of Object.entries(
        reference.modules,
      )) {
        const builder =
          ComponentBuilder[moduleKey as keyof HeroReference["modules"]];

        if (moduleReference && builder) {
          components.push(
            await builder(moduleReference as any, library, reference),
          );
        }
      }
    }

    if (reference.heroCombatState == null) {
      reference.heroCombatState = {
        conditions: [],
        currentRecoveries: 0,
        currentStamina: 0,
        currentTempStamina: 0,
        level: 1,
        numHeroicResources: 0,
        surges: 0,
      };
    }

    return new Hero(reference, components, library, HERO_DEFAULTS);
  }
}
