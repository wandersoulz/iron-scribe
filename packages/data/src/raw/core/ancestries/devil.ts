import {
  Ancestry,
  AncestryTrait,
  RegistryName,
  Modifier,
  FeatureChoice,
  StatDynamicValueType,
  Ability,
  ModifierValue,
  NumericValue,
  ConditionalValue,
  Range,
} from "@iron-scribe/model";
import { SkillGroups } from "../../../skills/core/skill-groups";

const ancestry = {
  id: "ancestry-devil",
  name: "Devil",
  description: "",
  loreDescription: "",
  ancestryPoints: 3,
} as Ancestry;

const signatureTraits: AncestryTrait[] = [
  {
    type: "ancestry-trait",
    id: "trait_devil_sig_silver_tongue",
    ancestryId: ancestry.id,
    name: "Silver Tongue",
    description:
      "Your innate magic allows you to twist how your words are perceived to get a better read on people and convince them to see things your way. You have one skill of your choice from the interpersonal skill group and you gain an edge on tests when attempting to discover an NPC's motivations and pitfalls during a negotiation.",
    choices: [
      {
        id: "trait_devil_sig_silver_tongue_skill_selection",
        name: "Skill Selection",
        values: {
          id: "trait_devil_sig_silver_tongue_skill_selection_value_id",
          type: "registry",
          registryName: RegistryName.Skills,
        },
        count: 1,
        filter: {
          type: "eq",
          field: "skillGroupId",
          value: SkillGroups.Interpersonal,
        },
      },
    ],
    modifiers: [
      new Modifier(
        "list",
        "add",
        "skills",
        new ModifierValue(undefined, undefined, {
          choiceId: "trait_devil_sig_silver_tongue_skill_selection",
        }),
      ),
    ],
  } as AncestryTrait,
];

const purchasedTraits: AncestryTrait[] = [
  {
    type: "ancestry-trait",
    id: "trait_devil_pt_beast_legs",
    ancestryId: ancestry.id,
    name: "Beast Legs",
    description: "Your powerful legs make you faster. You have speed 6.",
    cost: 1,
    modifiers: [
      new Modifier(
        "stat",
        "base",
        "speed",
        new ModifierValue({
          type: StatDynamicValueType.LiteralValue,
          value: 6,
          returnType: "number",
        } as NumericValue),
      ),
    ],
  } as AncestryTrait,
  {
    type: "ancestry-trait",
    id: "trait_devil_pt_glowing_eyes",
    ancestryId: ancestry.id,
    name: "Glowing Eyes",
    description:
      "Triggered action to deal psychic damage equal to 1d10 + level when taking damage.",
    cost: 1,
    abilities: [
      {
        id: "trait_devil_pt_glowing_eyes_ability",
        name: "Glowing Eyes",
        type: "ability",
        description: "",
        abilityType: "ancestry",
        target: "Creature that targeted you",
        range: {
          distance: 0,
          type: "any",
        } as Range,
        action: "triggered",
        keywords: [],
        effect: "Deal psychic damage equal to 1d10 + your level",
        modifiers: [],
        features: [],
        choices: [],
      } as unknown as Ability,
    ],
  } as AncestryTrait,
  {
    type: "ancestry-trait",
    id: "trait_devil_pt_hellsight",
    ancestryId: ancestry.id,
    name: "Hellsight",
    description: "No bane on strikes made against creatures with concealment.",
    cost: 1,
  } as AncestryTrait,
  {
    type: "ancestry-trait",
    id: "trait_devil_pt_impressive_horns",
    ancestryId: ancestry.id,
    name: "Impressive Horns",
    description:
      "Whenever you make a saving throw, you succeed on a roll of 5 or higher.",
    cost: 2,
    modifiers: [
      new Modifier(
        "stat",
        "base",
        "saving_throw",
        new ModifierValue({
          type: StatDynamicValueType.LiteralValue,
          value: 5,
          returnType: "number",
        } as NumericValue),
      ),
    ],
  } as AncestryTrait,
  {
    type: "ancestry-trait",
    id: "trait_devil_pt_prehensile_tail",
    ancestryId: ancestry.id,
    name: "Prehensile Tail",
    description: "You cannot be flanked.",
    cost: 2,
    modifiers: [
      new Modifier(
        "stat",
        "bonus",
        "condition_immunity",
        new ModifierValue({
          type: StatDynamicValueType.LiteralValue,
          value: 1,
          returnType: "number",
        } as NumericValue),
      ),
    ],
  } as AncestryTrait,
  {
    type: "ancestry-trait",
    id: "trait_devil_pt_wings",
    ancestryId: ancestry.id,
    name: "Wings",
    description:
      "You possess wings powerful enough to take you airborne. While using your wings to fly, you can stay aloft for a number of rounds equal to your Might score (minimum 1 round) before you fall. While using your wings to fly at 3rd level or lower, you have damage weakness 5.",
    cost: 2,
    modifiers: [
      new Modifier(
        "stat",
        "bonus",
        "damage_weakness",
        new ModifierValue({
          type: StatDynamicValueType.Conditional,
          condition: {
            type: "and",
            conditions: [
              {
                type: "numeric_value_compare",
                leftSideValue: {
                  type: StatDynamicValueType.StatReference,
                  statName: "level",
                  returnType: "number",
                },
                rightSideValue: {
                  type: StatDynamicValueType.LiteralValue,
                  value: 3,
                  returnType: "number",
                },
                operator: "<=",
              },
              {
                type: "has_component",
                componentId: "condition_flying",
              },
            ],
          },
          trueValue: {
            type: StatDynamicValueType.LiteralValue,
            value: 5,
            returnType: "number",
          },
          falseValue: {
            type: StatDynamicValueType.LiteralValue,
            value: 5,
            returnType: "number",
          },
          returnType: "number",
        } as ConditionalValue<any>),
      ),
    ],
  } as AncestryTrait,
];

export const Devil = {
  ancestry,
  purchasedTraits,
  signatureTraits,
};
