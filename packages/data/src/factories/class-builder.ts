import {
  ClassFeature,
  FeatureChoice,
  CharacteristicName,
  StatDynamicValueType,
  RegistryName,
  Class,
  Modifier,
  NumericValue,
  ModifierValue,
  ClassReference,
  HeroReference,
} from "@iron-scribe/model";
import { plainToInstance } from "class-transformer";

export class ClassBuilder {
  public static build(
    def: Class,
    reference: ClassReference,
    heroReference: HeroReference,
  ): Class {
    const selections = heroReference.selections || [];

    // Base modifiers for primary characteristics
    const classModifiers = def.primaryCharacteristics.map(
      (char) =>
        new Modifier(
          "stat",
          "base",
          char.toLowerCase(),
          new ModifierValue({
            type: StatDynamicValueType.LiteralValue,
            value: 2,
            returnType: "number",
          } as NumericValue),
        ),
    );

    // Characteristic array choices
    const remainingChars = Object.values(CharacteristicName).filter(
      (c) => !def.primaryCharacteristics.includes(c),
    );

    const arrayChoiceId = `choice_${def.id}_array`;

    const arrayChoices: FeatureChoice[] = [
      plainToInstance(FeatureChoice, {
        id: arrayChoiceId,
        name: "Select Characteristic Array",
        type: "feature-choice",
        count: 1,
        values: {
          id: `values_${def.id}_array`,
          type: "static",
          contents: def.characteristicArrays.map((arr, arrIdx) =>
            plainToInstance(ClassFeature, {
              id: `feat_${def.id}_array_${arrIdx}`,
              name: arr.join(", "),
              type: "class-feat",
              description: `Assign ${arr.join(", ")} to your non-primary characteristics.`,
            }),
          ),
        },
      }),
      ...remainingChars.map((char) =>
        plainToInstance(FeatureChoice, {
          id: `choice_char_${char.toLowerCase()}`,
          name: `${char}`,
          type: "feature-choice",
          count: 1,
          values: {
            id: `values_char_${char.toLowerCase()}`,
            type: "dynamic",
            providerId: "characteristic-array-provider",
            config: {
              sourceChoiceId: arrayChoiceId,
              characteristic: char,
            },
          },
        }),
      ),
    ];

    // Subclass choices
    const subclassChoices: FeatureChoice[] = (def.subclasses || []).map(
      (sc) => {
        const subclassSelection = selections.find((s) => s.choiceId === sc.id);

        return plainToInstance(FeatureChoice, {
          id: sc.id,
          name: sc.name,
          type: "feature-choice",
          count: 1,
          values: {
            id: `values_${sc.id}`,
            type: "static",
            contents: sc.options
              .filter((opt) => {
                if (!subclassSelection) return true;
                return subclassSelection.selectedOptionId === opt.id;
              })
              .map((opt) => {
                const optFeature: ClassFeature = plainToInstance(ClassFeature, {
                  ...opt,
                  choices: opt.choices || [],
                  features: opt.features || [],
                });

                if (opt.levelFeatures) {
                  opt.levelFeatures.forEach((lf) => {
                    optFeature.features?.push(
                      plainToInstance(ClassFeature, {
                        id: `feat_${opt.id}_level_${lf.level}`,
                        name: `${opt.name} Level ${lf.level} Features`,
                        description: `Features gained at level ${lf.level}.`,
                        level: lf.level,
                        features: lf.features,
                        abilities: lf.abilities,
                        choices: lf.choices,
                      }),
                    );
                  });
                }

                if (opt.skillGroupId) {
                  optFeature.modifiers = [
                    plainToInstance(Modifier, {
                      modifierType: "list",
                      target: "skills",
                      operation: "add",
                      value: {
                        choiceReferenceValue: {
                          choiceId: `choice_${opt.id}_skill`,
                        },
                      },
                    } as Modifier),
                  ];

                  optFeature.choices?.push(
                    plainToInstance(FeatureChoice, {
                      id: `choice_${opt.id}_skill`,
                      name: `Select a ${opt.skillGroupId} skill`,
                      type: "feature-choice",
                      count: 1,
                      values: {
                        id: `values_${opt.id}_skill`,
                        type: "registry",
                        registryName: RegistryName.Skills,
                      },
                      filter: {
                        type: "eq",
                        field: "skillGroupId",
                        value: opt.skillGroupId,
                      },
                    }),
                  );
                }
                return optFeature;
              }),
          },
        });
      },
    ) as FeatureChoice[];

    const classInstance = plainToInstance(Class, def);
    classInstance.modifiers = classModifiers as Modifier[];
    classInstance.choices = [...subclassChoices, ...arrayChoices];

    return classInstance;
  }
}
