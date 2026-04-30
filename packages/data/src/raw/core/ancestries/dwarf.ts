import {
  Ancestry,
  StatDynamicValueType,
  FeatureChoice,
  BaseFeature,
  Modifier,
} from "@iron-scribe/model";

const ancestry = {
  id: "ancestry-dwarf",
  name: "Dwarf",
  description:
    "Short, stout humanoids with stony skin and a deep connection to the elder god Ord.",
  loreDescription:
    "Dwarves are the children of Ord, the elder god of the mundane world. They are renowned as savvy engineers and technologists, inheriting lore from their extinct ancestors, the Steel Dwarves. Their stony skin and the runes they carve into their flesh are their most defining features.",
  ancestryPoints: 3,
} as Ancestry;

const runicCarvings = [
  {
    id: "dwarf_anestry_rune_detection",
    name: "Detection",
    type: "feature",
    description:
      "Pick a specific type of creature (such as goblins or humans) \
or object (such as gems or potions). Your rune glows softly when you \
are within 20 squares of any creature or object of that type, even if \
you don't have line of effect to the creature or object. You can change \
the type of creature or object as a maneuver.",
  } as BaseFeature,
  {
    id: "dwarf_ancestry_rune_light",
    name: "Light",
    type: "feature",
    description:
      "Your skin sheds light for 10 squares. You can turn this light on \
and off as a maneuver.",
  } as BaseFeature,
  {
    id: "dwarf_ancestry_rune_voice",
    name: "Voice",
    type: "feature",
    description:
      "As a maneuver, you can communicate telepathically with a \
willing creature you have met before and who is within 1 mile of \
you. You must know the creature's name, and they must speak \
and understand a language you know. You and the creature can \
respond to one another as if having a spoken conversation. You can \
communicate with a different creature by changing the rune.",
  } as BaseFeature,
];

const runicCarvingChoice = {
  id: "choice_dwarf_runic_carving_benefit",
  name: "Rune Benefit",
  count: 1,
  values: {
    id: "static_dwarf_runic_carving_benefits",
    type: "static",
    contents: runicCarvings,
  },
} as FeatureChoice;

const signatureTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_dwarf_sig_runic_carving",
    ancestryId: ancestry.id,
    name: "Runic Carving",
    description:
      "You can carve a rune onto your skin (taking 10 minutes). The rune is powered by your internal magic and provides one of the following benefits (which you can change as a maneuver): Detection, Light, or Voice.",
    choices: [runicCarvingChoice],
    abilities: [
      {
        id: "ability_dwarf_runic_carving_initial",
        name: "Carve Rune",
        description:
          "You can carve a rune onto your skin with 10 uninterrupted minutes of work, which is activated by the magic within your body. The rune you carve determines the benefit you receive, chosen from among the following:",
        type: "ability",
        abilityType: "ancestry",
        action: "10 minutes",
        target: "Self",
        range: { distance: 0, type: "any" },
        keywords: ["Magic", "Runes", "Dwarf"],
        effect:
          "You carve a rune on your body that provides one of the following benefits:",
        choices: [runicCarvingChoice],
      },
    ],
  },
];

const purchasedTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_dwarf_pt_great_fortitude",
    ancestryId: ancestry.id,
    name: "Great Fortitude",
    description:
      "Your hearty constitution prevents you from losing strength. You can't be made weakened.",
    cost: 2,
    modifiers: [
      new Modifier("list", "add", "condition_immunity", {
        type: StatDynamicValueType.LiteralValue,
        value: "Weakened",
        returnType: "string",
      } as any),
      new Modifier("list", "remove", "active_conditions", {
        type: StatDynamicValueType.LiteralValue,
        value: "Weakened",
        returnType: "string",
      } as any),
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_dwarf_pt_spark_off_your_skin",
    ancestryId: ancestry.id,
    name: "Spark Off Your Skin",
    description:
      "Your stone skin affords you potent protection. You have a +6 bonus to Stamina, and that bonus increases by 6 at 4th, 7th, and 10th levels.",
    cost: 2,
    modifiers: [
      new Modifier("stat", "bonus", "max_stamina", {
        type: StatDynamicValueType.LiteralValue,
        value: 6,
        returnType: "number",
      } as any),
      new Modifier("stat", "bonus", "max_stamina", {
        type: StatDynamicValueType.Conditional,
        condition: {
          type: "numeric_value_compare",
          leftSideValue: {
            type: StatDynamicValueType.StatReference,
            statName: "level",
            returnType: "number",
          },
          operator: ">=",
          rightSideValue: {
            type: StatDynamicValueType.LiteralValue,
            value: 4,
            returnType: "number",
          },
        },
        trueValue: {
          type: StatDynamicValueType.LiteralValue,
          value: 6,
          returnType: "number",
        },
        falseValue: {
          type: StatDynamicValueType.LiteralValue,
          value: 0,
          returnType: "number",
        },
        returnType: "number",
      } as any),
      new Modifier("stat", "bonus", "max_stamina", {
        type: StatDynamicValueType.Conditional,
        condition: {
          type: "numeric_value_compare",
          leftSideValue: {
            type: StatDynamicValueType.StatReference,
            statName: "level",
            returnType: "number",
          },
          operator: ">=",
          rightSideValue: {
            type: StatDynamicValueType.LiteralValue,
            value: 7,
            returnType: "number",
          },
        },
        trueValue: {
          type: StatDynamicValueType.LiteralValue,
          value: 6,
          returnType: "number",
        },
        falseValue: {
          type: StatDynamicValueType.LiteralValue,
          value: 0,
          returnType: "number",
        },
        returnType: "number",
      } as any),
      new Modifier("stat", "bonus", "max_stamina", {
        type: StatDynamicValueType.Conditional,
        condition: {
          type: "numeric_value_compare",
          leftSideValue: {
            type: StatDynamicValueType.StatReference,
            statName: "level",
            returnType: "number",
          },
          operator: ">=",
          rightSideValue: {
            type: StatDynamicValueType.LiteralValue,
            value: 10,
            returnType: "number",
          },
        },
        trueValue: {
          type: StatDynamicValueType.LiteralValue,
          value: 6,
          returnType: "number",
        },
        falseValue: {
          type: StatDynamicValueType.LiteralValue,
          value: 0,
          returnType: "number",
        },
        returnType: "number",
      } as any),
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_dwarf_pt_grounded",
    ancestryId: ancestry.id,
    name: "Grounded",
    description:
      "Your heavy stone body and connection to the earth make it difficult for others to move you. You have a +1 bonus to stability.",
    cost: 1,
    modifiers: [
      new Modifier("stat", "bonus", "stability", {
        type: StatDynamicValueType.LiteralValue,
        value: 1,
        returnType: "number",
      } as any),
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_dwarf_pt_stand_tough",
    ancestryId: ancestry.id,
    name: "Stand Tough",
    description:
      "Your body is made to withstand the blows of your enemies. Your Might score is treated as 1 higher for the purpose of resisting potencies, and you gain an edge on Might tests when called for to resist environmental effects or a creature's traits or abilities.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_dwarf_pt_stone_singer",
    ancestryId: ancestry.id,
    name: "Stone Singer",
    description:
      "You can 'hear' through stone. You gain an edge on Intuition tests to find secret doors or hidden compartments in stone structures.",
    cost: 1,
  },
];

export const Dwarf = {
  ancestry,
  purchasedTraits,
  signatureTraits,
};
