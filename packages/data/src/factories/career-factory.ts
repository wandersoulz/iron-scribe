import {
  Career,
  CareerReference,
  Library,
  RegistryName,
  HeroReference,
} from "@iron-scribe/model";
import { Marshaller } from "../marshalling/marshaller";

export class CareerFactory {
  public static async create(
    state: CareerReference,
    library: Library,
    heroReference: HeroReference,
  ): Promise<Career> {
    const careerRegistry = library.getCompositeRegistry<Career>(
      RegistryName.Careers,
    );

    const rawCareer = await careerRegistry.get(state.careerId);
    if (!rawCareer) throw new Error(`Career not found: ${state.careerId}`);

    const career = Marshaller.marshall(Career, rawCareer as Career);

    // Filter choices based on selections
    if (career.choices) {
      career.choices = career.choices.map((choice) => {
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

    return career;
  }
}
