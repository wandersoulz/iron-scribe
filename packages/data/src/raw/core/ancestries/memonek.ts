import {
  Ancestry,
  StatDynamicValueType,
  Modifier,
} from "@iron-scribe/model";

const ancestry = {
  id: "ancestry-memonek",
  name: "Memonek",
  description:
    "Beings of Uttermost Law from the plane of Axiom, with non-carbon-based bodies made of silicone, metal, or glass.",
  loreDescription:
    "Memonek are living constructs of order. Their silicon bodies are lightweight and durable, and their minds operate with a cold, systematic logic that eschews the messy emotions of carbon-based life.",
  ancestryPoints: 4,
} as Ancestry;

const signatureTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_memonek_sig_fall_lightly",
    ancestryId: ancestry.id,
    name: "Fall Lightly",
    description:
      "Whenever you fall, you reduce the distance of the fall by 2 squares.",
  },
  {
    type: "ancestry-trait",
    id: "trait_memonek_sig_lightweight",
    ancestryId: ancestry.id,
    name: "Lightweight",
    description:
      "When a creature attempts to force move you, you treat your size as one size smaller.",
  },
];

const purchasedTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_memonek_pt_i_am_law",
    ancestryId: ancestry.id,
    name: "I Am Law",
    description: "Enemies cannot move through your space unless you allow it.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_memonek_pt_systematic_mind",
    ancestryId: ancestry.id,
    name: "Systematic Mind",
    description:
      "Gain an edge on tests to parse schematics/maps and treat unknown languages as related.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_memonek_pt_unphased",
    ancestryId: ancestry.id,
    name: "Unphased",
    description: "You cannot be surprised.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_memonek_pt_useful_emotion",
    ancestryId: ancestry.id,
    name: "Useful Emotion",
    description: "Gain 1 surge at the start of any combat.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_memonek_pt_keeper_of_order",
    ancestryId: ancestry.id,
    name: "Keeper of Order",
    description:
      "Once per round, use a triggered action to remove an edge/bane or downgrade a double edge/bane for yourself or an adjacent ally.",
    cost: 2,
  },
  {
    type: "ancestry-trait",
    id: "trait_memonek_pt_lightning_nimbleness",
    ancestryId: ancestry.id,
    name: "Lightning Nimbleness",
    description: "Your speed increases to 7.",
    cost: 2,
    modifiers: [
      new Modifier("stat", "base", "speed", {
        type: StatDynamicValueType.LiteralValue,
        value: 7,
        returnType: "number",
      } as any),
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_memonek_pt_nonstop",
    ancestryId: ancestry.id,
    name: "Nonstop",
    description: "You cannot be made slowed.",
    cost: 2,
    modifiers: [
      new Modifier("stat", "add" as any, "condition_immunity", {
        type: StatDynamicValueType.LiteralValue,
        value: "Slowed",
        returnType: "string",
      } as any),
    ],
  },
];

export const Memonek = {
  ancestry,
  signatureTraits,
  purchasedTraits,
};
