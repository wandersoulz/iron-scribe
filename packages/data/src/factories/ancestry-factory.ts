import {
  Ancestry,
  AncestryReference,
  AncestryTrait,
  Library,
  RegistryName,
  HeroReference,
  FeatureChoice,
} from "@iron-scribe/model";
import { Marshaller } from "../marshalling/marshaller";
import { AncestryTraitFactory } from "./ancestry-trait-factory";

export class AncestryFactory {
  public static async create(
    state: AncestryReference,
    library: Library,
    heroReference: HeroReference,
  ): Promise<Ancestry> {
    const ancestryRegister = library.getCompositeRegistry<Ancestry>(
      RegistryName.Ancestries,
    );
    const traitRegistry = library.getCompositeRegistry<AncestryTrait>(
      RegistryName.AncestryTraits,
    );

    const rawAncestry = await ancestryRegister.get(state.ancestryId);
    if (!rawAncestry)
      throw new Error(`Ancestry not found: ${state.ancestryId}`);

    const ancestry = Marshaller.marshall(Ancestry, rawAncestry as Ancestry);

    // Filter choices based on selections
    if (ancestry.choices) {
      ancestry.choices = ancestry.choices.map((choice) => {
        const selection = (heroReference.selections || []).find(
          (s) => s.choiceId === choice.id,
        );
        if (selection && choice.values.type === "static") {
          choice.values.contents = choice.values.contents.filter(
            (c) => c.id === selection.selectedOptionId,
          );
        }
        return choice;
      });
    }

    ancestry.signatureTraits = (
      await Promise.all(
        state.signatureTraits.map(async (t) => {
          return await AncestryTraitFactory.create(t.traitId, traitRegistry);
        }),
      )
    ).filter((t): t is AncestryTrait => !!t);

    ancestry.purchasedTraits = (
      await Promise.all(
        state.purchasedTraits.map(async (t) => {
          return await AncestryTraitFactory.create(t.traitId, traitRegistry);
        }),
      )
    ).filter((t): t is AncestryTrait => !!t);

    return ancestry;
  }
}
