import {
  Ancestry,
  StatDynamicValueType,
  Modifier,
} from "@iron-scribe/model";

const ancestry = {
  id: "ancestry-human",
  name: "Human",
  description:
    "Defined by their mundane nature, humans possess a natural defense against the supernatural.",
  loreDescription:
    "Humans are the most populous and adaptable people of the Mundane World, often serving as the baseline for civilization.",
  ancestryPoints: 3,
} as Ancestry;

const signatureTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_human_sig_detect_supernatural",
    ancestryId: ancestry.id,
    name: "Detect the Supernatural",
    description:
      "As a maneuver, you can sense the location of supernatural objects or creatures within 5 squares.",
    abilities: [
      {
        id: "ability_human_detect_supernatural",
        name: "Detect the Supernatural",
        description:
          "You open your awareness to detect supernatural phenomena.",
        type: "ability",
        abilityType: "ancestry",
        action: "maneuver",
        target: "Self",
        range: { distance: 5, type: "any" },
        keywords: ["Mundane"],
        effect:
          "Until the end of your next turn, you know the location of any supernatural object, or any undead, construct, or creature from another world within 5 squares, even if you don't have line of effect. You also know the nature of any creature you detect.",
      },
    ],
  },
];

const purchasedTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_human_pt_perseverance",
    ancestryId: ancestry.id,
    name: "Perseverance",
    description:
      "You gain an edge on Endurance tests. Additionally, the slowed condition reduces your speed to 3 squares (instead of 2).",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_human_pt_cant_take_hold",
    ancestryId: ancestry.id,
    name: "Can't Take Hold",
    description:
      "You ignore temporary difficult terrain created by magic or psionics. When force-moved by magic or psionics, you can reduce the distance by 1.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_human_pt_resist_unnatural",
    ancestryId: ancestry.id,
    name: "Resist the Unnatural",
    description:
      "Your connection to the natural world provides resistance to specific supernatural effects.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_human_pt_staying_power",
    ancestryId: ancestry.id,
    name: "Staying Power",
    description: "You gain 2 additional Recoveries.",
    cost: 2,
    modifiers: [
      new Modifier("stat", "bonus", "recoveries", {
        type: StatDynamicValueType.LiteralValue,
        value: 2,
        returnType: "number",
      } as any),
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_human_pt_determination",
    ancestryId: ancestry.id,
    name: "Determination",
    description:
      "Your mental fortitude allows you to push through pain and fear.",
    cost: 2,
  },
];

export const Human = {
  ancestry,
  signatureTraits,
  purchasedTraits,
};
