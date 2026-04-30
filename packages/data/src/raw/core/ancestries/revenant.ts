import {
  Ancestry,
  StatDynamicValueType,
  Modifier,
} from "@iron-scribe/model";

const ancestry = {
  id: "ancestry-revenant",
  name: "Revenant",
  description:
    "Heroes who have returned from death to fulfill unfinished business.",
  loreDescription:
    "A revenant is a soul so determined or so cursed that not even death could hold them. They wear their mortality as a withered shroud.",
  ancestryPoints: 2,
} as Ancestry;

const signatureTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_revenant_sig_former_life",
    ancestryId: ancestry.id,
    name: "Former Life",
    description: "You retain the size of your original ancestry.",
  },
  {
    type: "ancestry-trait",
    id: "trait_revenant_sig_tough_but_withered",
    ancestryId: ancestry.id,
    name: "Tough But Withered",
    description:
      "You have immunity to cold, corruption, lightning, and poison equal to your level, but have fire weakness 5. You don't need to eat, drink, or breathe.",
    modifiers: [
      new Modifier("stat", "bonus", "damage_weakness", {
        type: StatDynamicValueType.Conditional,
        condition: {
          type: "has_component",
          componentId: "damage_type_fire",
        } as any,
        trueValue: { type: StatDynamicValueType.LiteralValue, value: 5 },
        falseValue: { type: StatDynamicValueType.LiteralValue, value: 0 },
        returnType: "number",
      } as any),
    ],
  },
];

const purchasedTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_revenant_pt_undead_influence",
    ancestryId: ancestry.id,
    name: "Undead Influence",
    description: "Gain an edge on social tests to interact with undead.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_revenant_pt_bloodless",
    ancestryId: ancestry.id,
    name: "Bloodless",
    description: "You cannot be made bleeding, even while dying.",
    cost: 2,
    modifiers: [
      new Modifier("stat", "add", "condition_immunity", {
        type: StatDynamicValueType.LiteralValue,
        value: "Bleeding",
        returnType: "string",
      } as any),
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_revenant_pt_vengeance_mark",
    ancestryId: ancestry.id,
    name: "Vengeance Mark",
    description:
      "You can place a magic sigil on a creature to track them or detonate it for damage.",
    cost: 2,
    abilities: [
      {
        id: "ability_revenant_vengeance_mark",
        name: "Vengeance Mark",
        description: "You mark your prey for retribution.",
        type: "ability",
        abilityType: "ancestry",
        action: "maneuver",
        target: "One creature.",
        range: { distance: 10, type: "any" },
        keywords: ["Magic", "Curse"],
        effect:
          "You place a magical mark on the target. You always know the direction and distance to the target as long as they are on the same plane. You can detonated the mark as a maneuver to deal 1d10 psychic damage per your level.",
      },
    ],
  },
];

export const Revenant = {
  ancestry,
  signatureTraits,
  purchasedTraits,
};
