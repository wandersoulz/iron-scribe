import {
  Ancestry,
  StatDynamicValueType,
  Modifier,
} from "@iron-scribe/model";

const ancestry = {
  id: "ancestry-wode-elf",
  name: "Wode Elf",
  description:
    "Lithe and wild, Wode Elves possess a glamor that allows them to blend into their surroundings.",
  loreDescription:
    "Wode elves are the guardians of the deep forests, their magic reflecting the untamed and shifting nature of the wild.",
  ancestryPoints: 3,
} as Ancestry;

const signatureTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_wode_elf_sig_glamor",
    ancestryId: ancestry.id,
    name: "Wode Elf Glamor",
    description:
      "You gain an edge on tests made to hide and sneak, and tests made to search for you while you are hidden take a bane.",
  },
];

const purchasedTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_wode_elf_pt_wode_defends",
    ancestryId: ancestry.id,
    name: "The Wode Defends",
    description:
      "Signature Ability: A magical ranged strike that slows enemies.",
    cost: 2,
    abilities: [
      {
        id: "ability_wode_elf_wode_defends",
        name: "The Wode Defends",
        description: "Vines and roots rise to hamper your foes.",
        type: "ability",
        abilityType: "signature",
        action: "main",
        target: "One creature.",
        range: { distance: 10, type: "any" },
        keywords: ["Magic", "Nature"],
        powerRoll: {
          tierOutcomes: {
            t1: { damage: { value: 3 }, potencies: ["Slowed"] },
            t2: { damage: { value: 6 }, potencies: ["Slowed"] },
            t3: { damage: { value: 9 }, potencies: ["Slowed"] },
          },
        },
        effect: "The target is slowed.",
      },
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_wode_elf_pt_otherworldly_grace",
    ancestryId: ancestry.id,
    name: "Otherworldly Grace",
    description: "You succeed on saving throws on a roll of 5 or higher.",
    cost: 2,
    modifiers: [
      new Modifier("stat", "base", "saving_throw", {
        type: StatDynamicValueType.LiteralValue,
        value: 5,
        returnType: "number",
      } as any),
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_wode_elf_pt_quick_and_brutal",
    ancestryId: ancestry.id,
    name: "Quick and Brutal",
    description:
      "When you score a critical hit, you can take an additional main action and move action (instead of just a main action).",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_wode_elf_pt_swift",
    ancestryId: ancestry.id,
    name: "Swift",
    description: "Your speed increases to 6.",
    cost: 1,
    modifiers: [
      new Modifier("stat", "base", "speed", {
        type: StatDynamicValueType.LiteralValue,
        value: 6,
        returnType: "number",
      } as any),
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_wode_elf_pt_forest_walk",
    ancestryId: ancestry.id,
    name: "Forest Walk",
    description: "You can shift into and while within difficult terrain.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_wode_elf_pt_revisit_memory",
    ancestryId: ancestry.id,
    name: "Revisit Memory",
    description: "You gain an edge on tests made to recall lore.",
    cost: 1,
  },
];

export const WodeElf = {
  ancestry,
  signatureTraits,
  purchasedTraits,
};
