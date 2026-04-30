import { StatDynamicValueType, RegistryName } from "@iron-scribe/model";

export const Sage = {
  id: "career-sage",
  name: "Sage",
  description: "You have spent your years in study, mastering the lore of the world.",
  type: "career",
  wealth: 2,
  renown: 1,
  projectPoints: 1,
  modifiers: [
    {
      modifierType: "stat",
      operation: "bonus",
      target: "wealth",
      value: {
        dynamicValue: {
          type: StatDynamicValueType.LiteralValue,
          value: 2,
          returnType: "number"
        }
      }
    },
    {
      modifierType: "stat",
      operation: "bonus",
      target: "renown",
      value: {
        dynamicValue: {
          type: StatDynamicValueType.LiteralValue,
          value: 1,
          returnType: "number"
        }
      }
    },
    {
      modifierType: "stat",
      operation: "bonus",
      target: "project_points",
      value: {
        dynamicValue: {
          type: StatDynamicValueType.LiteralValue,
          value: 1,
          returnType: "number"
        }
      }
    }
  ],
  choices: [
    {
      id: "choice-sage-inciting-incident",
      name: "Inciting Incident",
      type: "feature-choice",
      count: 1,
      values: {
        type: "static",
        contents: [
          { id: "sage-ii-1", name: "Ancient Discovery", description: "You found a lost text that changed everything.", type: "feature" },
          { id: "sage-ii-2", name: "Master's Last Words", description: "Your master revealed a secret with their dying breath.", type: "feature" },
          { id: "sage-ii-3", name: "Forbidden Knowledge", description: "You glimpsed something you weren't meant to see.", type: "feature" },
          { id: "sage-ii-4", name: "Debunked Theory", description: "Your life's work was proven wrong, sending you on a new path.", type: "feature" },
          { id: "sage-ii-5", name: "Library Fire", description: "You saved what you could from a burning archive.", type: "feature" },
          { id: "sage-ii-6", name: "Prophecy Fulfillment", description: "You realized a prophecy was about you.", type: "feature" }
        ]
      }
    },
    {
      id: "choice-sage-skill-1",
      name: "Sage Skill 1",
      type: "feature-choice",
      count: 1,
      values: {
        type: "registry",
        registryName: RegistryName.Skills
      },
      filter: {
        type: "eq",
        field: "skillGroupId",
        value: "sg_lore"
      }
    },
    {
      id: "choice-sage-skill-2",
      name: "Sage Skill 2",
      type: "feature-choice",
      count: 1,
      values: {
        type: "registry",
        registryName: RegistryName.Skills
      },
      filter: {
        type: "eq",
        field: "skillGroupId",
        value: "sg_lore"
      }
    }
  ]
};
