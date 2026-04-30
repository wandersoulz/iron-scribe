import {
  Class,
  ClassReference,
  ClassFeature,
  Library,
  RegistryName,
  Modifier,
  StatDynamicValueType,
  ModifierValue,
  NumericValue,
  MathValue,
  HeroReference,
} from "@iron-scribe/model";
import { plainToInstance } from "class-transformer";
import { ClassBuilder } from "./class-builder";

export class ClassFactory {
  public static async create(
    reference: ClassReference,
    library: Library,
    heroReference: HeroReference,
  ): Promise<Class> {
    const classRegistry = library.getCompositeRegistry<any>(
      RegistryName.Classes,
    );

    const rawClass = await classRegistry.get(reference.classId);
    if (!rawClass) throw new Error(`Class not found: ${reference.classId}`);

    const classInstance: Class = ClassBuilder.build(
      rawClass,
      reference,
      heroReference,
    );

    classInstance.features.push(
      plainToInstance(ClassFeature, {
        id: `${classInstance.id}_stamina`,
        name: "Stamina",
        description: "Class Stamina",
        modifiers: [
          new Modifier(
            "stat",
            "base",
            "max_stamina",
            new ModifierValue({
              type: StatDynamicValueType.LiteralValue,
              returnType: "number",
              value: classInstance.staminaBase,
            } as NumericValue),
          ),
          new Modifier(
            "stat",
            "bonus",
            "max_stamina",
            new ModifierValue({
              type: StatDynamicValueType.Math,
              returnType: "number",
              operator: "*",
              left: {
                type: StatDynamicValueType.LiteralValue,
                returnType: "number",
                value: classInstance.staminaPerLevel,
              },
              right: {
                type: StatDynamicValueType.Math,
                returnType: "number",
                operator: "-",
                left: {
                  type: StatDynamicValueType.StatReference,
                  returnType: "number",
                  statName: "level",
                },
                right: {
                  type: StatDynamicValueType.LiteralValue,
                  returnType: "number",
                  value: 1,
                },
              },
            } as MathValue),
          ),
          new Modifier("stat", "base", "recoveries", {
            type: StatDynamicValueType.LiteralValue,
            returnType: "number",
            value: classInstance.recoveries,
          } as any),
        ],
      }),
    );

    return classInstance;
  }
}
