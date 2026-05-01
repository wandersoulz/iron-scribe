import {
  StatDynamicValueType,
  RegistryName,
  NumericValue,
  ModifierValue,
  Feature,
  FeatureChoiceRegistryValue,
  FeatureChoice,
  FeatureChoiceStaticValue,
  Modifier,
} from "@iron-scribe/model";
import { PerkTypeIds } from "../perks/perks";

export const Sage = {
  id: "career-sage",
  name: "Sage",
  description:
    "You have spent your years in study, mastering the lore of the world.",
  type: "career",
  wealth: 2,
  renown: 1,
  projectPoints: 240,
  modifiers: [
    {
      modifierType: "stat",
      operation: "bonus",
      target: "wealth",
      value: {
        dynamicValue: {
          type: StatDynamicValueType.LiteralValue,
          value: 2,
          returnType: "number",
        } as unknown as NumericValue,
      } as unknown as ModifierValue,
    } as Modifier,
    {
      modifierType: "stat",
      operation: "bonus",
      target: "renown",
      value: {
        dynamicValue: {
          type: StatDynamicValueType.LiteralValue,
          value: 1,
          returnType: "number",
        } as unknown as NumericValue,
      } as unknown as ModifierValue,
    } as Modifier,
    {
      modifierType: "stat",
      operation: "bonus",
      target: "project_points",
      value: {
        dynamicValue: {
          type: StatDynamicValueType.LiteralValue,
          value: 240,
          returnType: "number",
        } as unknown as NumericValue,
      } as unknown as ModifierValue,
    } as Modifier,
    {
      modifierType: "list",
      operation: "add",
      target: "skills",
      value: {
        choiceReferenceValue: {
          choiceId: "choice-sage-skill-1",
        },
      },
    },
    {
      modifierType: "list",
      operation: "add",
      target: "skills",
      value: {
        choiceReferenceValue: {
          choiceId: "choice-sage-skill-2",
        },
      },
    },
    {
      modifierType: "list",
      operation: "add",
      target: "languages",
      value: {
        choiceReferenceValue: {
          choiceId: "choice-sage-language",
        },
      },
    },
    {
      modifierType: "list",
      operation: "add",
      target: "perks",
      value: {
        choiceReferenceValue: {
          choiceId: "choice-sage-perk",
        },
      },
    },
  ],
  choices: [
    {
      id: "choice-sage-inciting-incident",
      name: "Inciting Incident",
      type: "feature-choice",
      count: 1,
      values: {
        id: "choice-sage-inciting-incident-static-values",
        type: "static",
        contents: [
          {
            id: "sage-ii-1",
            name: "Ancient Discovery",
            description: "You found a lost text that changed everything.",
            type: "feature",
          },
          {
            id: "sage-ii-2",
            name: "Master's Last Words",
            description:
              "Your master revealed a secret with their dying breath.",
            type: "feature",
          },
          {
            id: "sage-ii-3",
            name: "Forbidden Knowledge",
            description: "You glimpsed something you weren't meant to see.",
            type: "feature",
          },
          {
            id: "sage-ii-4",
            name: "Debunked Theory",
            description:
              "Your life's work was proven wrong, sending you on a new path.",
            type: "feature",
          },
          {
            id: "sage-ii-5",
            name: "Library Fire",
            description: "You saved what you could from a burning archive.",
            type: "feature",
          },
          {
            id: "sage-ii-6",
            name: "Prophecy Fulfillment",
            description: "You realized a prophecy was about you.",
            type: "feature",
          },
        ] as Feature[],
      } as FeatureChoiceStaticValue,
    } as FeatureChoice,
    {
      id: "choice-sage-skill-1",
      name: "Sage Skill 1",
      type: "feature-choice",
      count: 1,
      values: {
        id: "choice-sage-skill-1-registry-values",
        type: "registry",
        registryName: RegistryName.Skills,
      } as unknown as FeatureChoiceRegistryValue,
      filter: {
        type: "eq",
        field: "skillGroupId",
        value: "sg_lore",
      },
    } as FeatureChoice,
    {
      id: "choice-sage-skill-2",
      name: "Sage Skill 2",
      type: "feature-choice",
      count: 1,
      values: {
        id: "choice-sage-skill-2-registry-values",
        type: "registry",
        registryName: RegistryName.Skills,
      } as unknown as FeatureChoiceRegistryValue,
      filter: {
        type: "eq",
        field: "skillGroupId",
        value: "sg_lore",
      },
    } as FeatureChoice,
    {
      id: "choice-sage-language",
      name: "Language",
      type: "feature-choice",
      count: 1,
      values: {
        id: "choice-sage-language-registry-values",
        type: "registry",
        registryName: RegistryName.Languages,
      } as unknown as FeatureChoiceRegistryValue,
    } as FeatureChoice,
    {
      id: "choice-sage-perk",
      name: "Lore Perk",
      type: "feature-choice",
      count: 1,
      values: {
        id: "choice-sage-perk-registry-values",
        type: "registry",
        registryName: RegistryName.Perks,
      } as unknown as FeatureChoiceRegistryValue,
      filter: {
        type: "eq",
        field: "perkTypeId",
        value: PerkTypeIds.Lore,
      },
    } as FeatureChoice,
  ],
};
