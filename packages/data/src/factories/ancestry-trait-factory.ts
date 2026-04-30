import { AncestryTrait, ReadOnlyRegistry } from "@iron-scribe/model";
import { Marshaller } from "../marshalling/marshaller";

export class AncestryTraitFactory {
  public static async create(
    traitId: string,
    traitRegistry: ReadOnlyRegistry<AncestryTrait>,
  ): Promise<AncestryTrait | undefined> {
    const rawTrait = await traitRegistry.get(traitId);
    if (!rawTrait) return undefined;

    const trait = Marshaller.marshall(AncestryTrait, rawTrait);
    return trait;
  }
}
