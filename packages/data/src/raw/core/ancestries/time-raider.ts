import {
  Ancestry,
  StatDynamicValueType,
  Modifier,
} from "@iron-scribe/model";

const ancestry = {
  id: "ancestry-time-raider",
  name: "Time Raider",
  description: "Four-armed, yellow-skinned humanoids native to the timescape.",
  loreDescription:
    "Time Raiders are the nomads of the stars, their four arms and psychic potential making them formidable explorers and warriors across the infinite possibilities of the timescape.",
  ancestryPoints: 3,
} as Ancestry;

const signatureTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_time_raider_sig_psychic_scar",
    ancestryId: ancestry.id,
    name: "Psychic Scar",
    description:
      "Your mind is a formidable layer of defense. You have psychic immunity equal to your level.",
    // Immunity logic would be handled by the engine
  },
];

const purchasedTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_time_raider_pt_beyondsight",
    ancestryId: ancestry.id,
    name: "Beyondsight",
    description:
      "As a maneuver, you can see through mundane obstructions up to 1 square thick.",
    cost: 1,
    abilities: [
      {
        id: "ability_time_raider_beyondsight",
        name: "Beyondsight",
        description: "You peer through the fabric of reality.",
        type: "ability",
        abilityType: "ancestry",
        action: "maneuver",
        target: "Self",
        range: { distance: 1, type: "any" },
        keywords: ["Psionic"],
        effect:
          "You can see through mundane obstructions up to 1 square thick until the end of your next turn.",
      },
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_time_raider_pt_foresight",
    ancestryId: ancestry.id,
    name: "Foresight",
    description:
      "You gain an edge on initiative tests and defense against the first attack in a round.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_time_raider_pt_four_armed_athletics",
    ancestryId: ancestry.id,
    name: "Four-Armed Athletics",
    description: "Gain an edge on tests to climb, swim, or grapple.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_time_raider_pt_four_armed_martial_arts",
    ancestryId: ancestry.id,
    name: "Four-Armed Martial Arts",
    description:
      "You can wield multiple weapons or use specialized combat maneuvers.",
    cost: 2,
  },
  {
    type: "ancestry-trait",
    id: "trait_time_raider_pt_psionic_gift",
    ancestryId: ancestry.id,
    name: "Psionic Gift",
    description: "You gain a psionic signature ability.",
    cost: 2,
    abilities: [
      {
        id: "ability_time_raider_psionic_bolt",
        name: "Psionic Bolt",
        description: "A bolt of pure mental energy.",
        type: "ability",
        abilityType: "signature",
        action: "main",
        target: "One creature.",
        range: { distance: 10, type: "any" },
        keywords: ["Psionic", "Magic"],
        powerRoll: {
          tierOutcomes: {
            t1: { damage: { value: 4 } },
            t2: { damage: { value: 7 } },
            t3: { damage: { value: 10 } },
          },
        },
        effect: "Deals psychic damage.",
      },
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_time_raider_pt_unstoppable_mind",
    ancestryId: ancestry.id,
    name: "Unstoppable Mind",
    description: "You cannot be made dazed.",
    cost: 2,
    modifiers: [
      new Modifier("stat", "add", "condition_immunity", {
        type: StatDynamicValueType.LiteralValue,
        value: "Dazed",
        returnType: "string",
      } as any),
    ],
  },
];

export const TimeRaider = {
  ancestry,
  signatureTraits,
  purchasedTraits,
};
