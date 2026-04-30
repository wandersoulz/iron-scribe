import {
  Ancestry,
  StatDynamicValueType,
  Modifier,
} from "@iron-scribe/model";

const ancestry = {
  id: "ancestry-high-elf",
  name: "High Elf",
  description:
    "Stately and graceful, High Elves use a supernatural glamor to appear more attractive or engaging to others.",
  loreDescription:
    "High elves are the children of the stars, possessors of a regal and ancient magic that commands respect and awe.",
  ancestryPoints: 3,
} as Ancestry;

const signatureTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_high_elf_sig_glamor",
    ancestryId: ancestry.id,
    name: "High Elf Glamor",
    description:
      "A magic glamor makes others perceive you as interesting and engaging, \
granting you an edge on Presence tests using the Flirt or Persuade skills. \
This glamor makes you appear and sound slightly different to each \
creature you meet, since what is engaging to one might be different for \
another. However, you never appear to be anyone other than yourself.",
  },
];

const purchasedTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_high_elf_pt_glamor_of_terror",
    ancestryId: ancestry.id,
    name: "Glamor of Terror",
    description:
      "When a foe strikes, you reverse the magic of your glamor to instill fear into their heart. Whenever you take damage from a creature, you can use a triggered action to make that creature frightened of you until the end of their next turn.",
    cost: 2,
    abilities: [
      {
        id: "ability_high_elf_glamor_of_terror",
        name: "Glamor of Terror",
        description: "Your glamor shifts into a vision of pure dread.",
        type: "ability",
        abilityType: "ancestry",
        action: "triggered",
        trigger: "When you take damage.",
        target: "The attacker.",
        range: { distance: 0, type: "any" },
        keywords: ["Magic", "Fear"],
        effect:
          "The target is frightened of you until the end of their next turn.",
      },
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_high_elf_pt_otherworldly_grace",
    ancestryId: ancestry.id,
    name: "Otherworldly Grace",
    description:
      "Your elf body and mind can't be contained for long. Whenever you make a saving throw, you succeed on a roll of 5 or higher.",
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
    id: "trait_high_elf_pt_unstoppable_mind",
    ancestryId: ancestry.id,
    name: "Unstoppable Mind",
    description:
      "Your mind allows you to maintain your focus in any situation. You can't be made dazed.",
    cost: 2,
    modifiers: [
      new Modifier("list", "remove", "conditions", {
        type: StatDynamicValueType.LiteralValue,
        value: "Dazed",
        returnType: "string",
      } as any),
      new Modifier("list", "add", "condition_immunity", {
        type: StatDynamicValueType.LiteralValue,
        value: "Dazed",
        returnType: "string",
      } as any),
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_high_elf_pt_graceful_retreat",
    ancestryId: ancestry.id,
    name: "Graceful Retreat",
    description:
      "You gain a +1 bonus to the distance you can shift when you take the Disengage move action.",
    cost: 1,
    modifiers: [
      new Modifier("stat", "bonus", "disengage_movement", {
        type: StatDynamicValueType.LiteralValue,
        value: 1,
        returnType: "number",
      } as any),
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_high_elf_pt_high_senses",
    ancestryId: ancestry.id,
    name: "High Senses",
    description:
      "Your senses are especially keen and perceptive. You gain an edge on tests made to notice threats.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_high_elf_pt_revisit_memory",
    ancestryId: ancestry.id,
    name: "Revisit Memory",
    description: "You gain an edge on tests made to recall lore.",
    cost: 1,
  },
];

export const HighElf = {
  ancestry,
  signatureTraits,
  purchasedTraits,
};
