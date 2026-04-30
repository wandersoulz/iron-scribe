import {
  Ancestry,
  StatDynamicValueType,
  CharacteristicName,
  RegistryName,
  FeatureChoice,
  DamageImmunity,
  Modifier,
} from "@iron-scribe/model";
import { getCharacteristic } from "../../rules/characteristic";

const ancestry = {
  id: "ancestry-dragon-knight",
  name: "Dragon Knight",
  description:
    "Muscled, draconic humanoids created through arcane rituals, designed to be the ultimate knights.",
  loreDescription:
    "Most Dragon Knights in the setting of Orden were created by the wizard Vitae to serve in Good King Omund's Dragon Phalanx. They were designed to be the ultimate knights, ensuring the rule of law.",
  ancestryPoints: 3,
} as Ancestry;

const signatureTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_dragon_knight_sig_wyrmplate",
    ancestryId: ancestry.id,
    name: "Wyrmplate",
    description:
      "Your hardened scales grant you damage immunity equal to your level to one of the following damage types: acid, cold, corruption, fire, lightning, or poison. You can change your damage immunity type whenever you finish a respite.",
    choices: [
      {
        id: "choice_dragon_knight_wyrmplate_damage_type",
        name: "Immunity Type",
        values: {
          id: "damage-immunity-registry-value",
          type: "registry",
          registryName: RegistryName.Damage,
        },
        count: 1,
        filter: {
          type: "in",
          field: "damageType",
          values: ["acid", "cold", "corruption", "fire", "lightning", "poison"],
        },
      } as FeatureChoice,
    ],
    modifiers: [
      {
        modifierType: "list",
        operation: "add",
        target: "damage-immunity",
        value: {
          featureValue: {
            id: "trait_dragon_knight_sig_wyrmplate_immunity",
            type: "damage-immunity",
            name: "Wyrmplate Immunity",
            value: {
              type: StatDynamicValueType.StatReference,
              statName: "level",
              returnType: "number",
            },
            damageType: {
              damageChoiceReference: {
                choiceId: "choice_dragon_knight_wyrmplate_damage_type",
              },
            },
          },
        },
      },
    ],
  },
];

const purchasedTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_dragon_knight_pt_draconian_guard",
    ancestryId: ancestry.id,
    name: "Draconian Guard",
    description:
      "Triggered Action: When you or an adjacent creature takes damage from a strike, you reduce that damage by an amount equal to your level.",
    cost: 1,
    abilities: [
      {
        id: "ability_dragon_knight_draconian_guard",
        name: "Draconian Guard",
        description: "You use your bulk and scales to shield those nearby.",
        type: "ability",
        abilityType: "ancestry",
        action: "triggered",
        trigger: "When you or an adjacent creature takes damage from a strike.",
        target: "You or an adjacent creature.",
        range: { distance: 1, type: "burst" },
        keywords: ["Draconic"],
        effect:
          "Reduce damage taken by you or an adjacent creature by an amount equal to your level.",
      },
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_dragon_knight_pt_prismatic_scales",
    ancestryId: ancestry.id,
    name: "Prismatic Scales",
    description:
      "You select a second damage type from the Wyrmplate list. You are now permanently immune to that type in addition to your rotating Wyrmplate immunity.",
    cost: 1,
    choices: [
      {
        id: "choice_dragon_knight_prismatic_scales_damage_type",
        name: "Secondary Immunity Type",
        values: {
          id: "secondary-damage-immunity-type-selections",
          type: "registry",
          registryName: RegistryName.Damage,
        },
        count: 1,
        filter: {
          type: "in",
          field: "damageType",
          values: ["acid", "cold", "corruption", "fire", "lightning", "poison"],
        },
      } as FeatureChoice,
    ],
    modifiers: [
      {
        modifierType: "list",
        operation: "add",
        target: "damage-immunity",
        value: {
          featureValue: {
            id: "trait_dragon_knight_pt_prismatic_scales_immunity",
            type: "damage-immunity",
            name: "Prismatic Scales Immunity",
            value: {
              type: StatDynamicValueType.StatReference,
              statName: "level",
              returnType: "number",
            },
            damageType: {
              damageChoiceReference: {
                choiceId: "choice_dragon_knight_prismatic_scales_damage_type",
              },
            },
            choices: [],
          },
        },
      },
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_dragon_knight_pt_remember_your_oath",
    ancestryId: ancestry.id,
    name: "Remember Your Oath",
    description:
      "Maneuver: You recite your knightly oath. Until the start of your next turn, you succeed on all saving throws on a roll of 4 or higher.",
    cost: 1,
    abilities: [
      {
        id: "ability_dragon_knight_remember_your_oath",
        name: "Remember Your Oath",
        description: "Recite your oath to bolster your resilience.",
        type: "ability",
        abilityType: "ancestry",
        action: "maneuver",
        target: "Self",
        range: { distance: 0, type: "any" },
        keywords: ["Oath"],
        effect:
          "Until the start of your next turn, you succeed on all saving throws on a roll of 4 or higher.",
      },
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_dragon_knight_pt_draconian_pride",
    ancestryId: ancestry.id,
    name: "Draconian Pride",
    description: "You have the following signature ability:",
    cost: 2,
    abilities: [
      {
        id: "ability_dragon_knight_draconian_pride",
        name: "Draconian Pride",
        description: "A mighty roar that damages and pushes enemies.",
        type: "ability",
        abilityType: "signature",
        action: "main",
        target: "All enemies in burst.",
        range: { distance: 1, type: "burst" },
        keywords: ["Draconic", "Fear"],
        powerRoll: {
          characteristics: [
            getCharacteristic(CharacteristicName.Might),
            getCharacteristic(CharacteristicName.Presence),
          ],
          tierOutcomes: {
            t1: { damage: { value: 2 }, potencies: ["Push 1"] },
            t2: { damage: { value: 4 }, potencies: ["Push 2"] },
            t3: { damage: { value: 6 }, potencies: ["Push 3"] },
          },
        },
        effect: "The target is pushed back based on the power roll.",
      },
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_dragon_knight_pt_dragon_breath",
    ancestryId: ancestry.id,
    name: "Dragon Breath",
    description:
      "Signature Ability (Action): A 3-cube blast of elemental energy. You choose the damage type (acid, cold, etc.) when you use it.",
    cost: 2,
    abilities: [
      {
        id: "ability_dragon_knight_dragon_breath",
        name: "Dragon Breath",
        description: "Exhale elemental energy in a blast.",
        type: "ability",
        abilityType: "signature",
        action: "main",
        target: "All enemies in cube.",
        range: { distance: 3, type: "cube" },
        keywords: ["Draconic", "Magic", "Area"],
        powerRoll: {
          characteristics: [
            getCharacteristic(CharacteristicName.Might),
            getCharacteristic(CharacteristicName.Presence),
          ],
          tierOutcomes: {
            t1: { damage: { value: 3 } },
            t2: { damage: { value: 6 } },
            t3: { damage: { value: 9 } },
          },
        },
        effect: "Damage type matches your current Wyrmplate immunity.",
      },
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_dragon_knight_pt_wings",
    ancestryId: ancestry.id,
    name: "Wings",
    description:
      "You can fly for a number of rounds equal to your Might (min 1) before falling. Note: You have damage weakness 5 while flying at levels 1–3.",
    cost: 2,
    modifiers: [
      {
        type: "stat",
        operation: "bonus",
        target: "damage_weakness",
        value: {
          dynamicValue: {
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
              value: 0,
              returnType: "number",
            },
            returnType: "number",
          },
        },
      },
    ],
  },
];

export const DragonKnight = {
  ancestry,
  purchasedTraits,
  signatureTraits,
};
