import {
  Ancestry,
  StatDynamicValueType,
  Modifier,
} from "@iron-scribe/model";

const ancestry = {
  id: "ancestry-polder",
  name: "Polder",
  description:
    "Small, shadow-touched folk known for their stealth and resilience.",
  loreDescription:
    "Polders are the dwellers of the shadow-drenched margins of the world, having a natural affinity for darkness and obfuscation.",
  ancestryPoints: 4,
} as Ancestry;

const signatureTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_polder_sig_small",
    ancestryId: ancestry.id,
    name: "Small!",
    description: "Your size is 1S.",
    modifiers: [
      new Modifier("stat", "base", "size", {
        type: StatDynamicValueType.LiteralValue,
        value: "1S",
        returnType: "string",
      } as any),
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_polder_sig_shadowmeld",
    ancestryId: ancestry.id,
    name: "Shadowmeld",
    description:
      "You can flatten yourself into a shadow. While in this form, you are hidden and strikes against you take a bane.",
    abilities: [
      {
        id: "ability_polder_shadowmeld",
        name: "Shadowmeld",
        description: "You merge with the shadows around you.",
        type: "ability",
        abilityType: "ancestry",
        action: "maneuver",
        target: "Self",
        range: { distance: 0, type: "any" },
        keywords: ["Magic", "Shadow"],
        effect:
          "You flatten yourself into a shadow against a surface. While in this form, you are hidden from creatures you have cover or concealment from, and strikes against you take a bane. You cannot move or take main actions or maneuvers except to exit this form.",
      },
    ],
  },
];

const purchasedTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_polder_pt_corruption_immunity",
    ancestryId: ancestry.id,
    name: "Corruption Immunity",
    description: "You have corruption immunity 3.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_polder_pt_graceful_retreat",
    ancestryId: ancestry.id,
    name: "Graceful Retreat",
    description: "When you disengage, you can move 1 additional square.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_polder_pt_polder_geist",
    ancestryId: ancestry.id,
    name: "Polder Geist",
    description:
      "You can send thread-like tendrils into objects to help you climb.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_polder_pt_reactive_tumble",
    ancestryId: ancestry.id,
    name: "Reactive Tumble",
    description:
      "Triggered when you take damage; you take half damage and teleport up to 4 squares.",
    cost: 1,
    abilities: [
      {
        id: "ability_polder_reactive_tumble",
        name: "Reactive Tumble",
        description:
          "You slip through the shadow-realm to avoid the worst of a blow.",
        type: "ability",
        abilityType: "ancestry",
        action: "triggered",
        trigger: "When you take damage.",
        target: "Self",
        range: { distance: 4, type: "any" },
        keywords: ["Magic", "Shadow"],
        effect:
          "You take half damage from the triggering source and teleport up to 4 squares.",
      },
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_polder_pt_fearless",
    ancestryId: ancestry.id,
    name: "Fearless",
    description: "You cannot be made frightened.",
    cost: 2,
    modifiers: [
      new Modifier("stat", "add" as any, "condition_immunity", {
        type: StatDynamicValueType.LiteralValue,
        value: "Frightened",
        returnType: "string",
      } as any),
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_polder_pt_nimblestep",
    ancestryId: ancestry.id,
    name: "Nimblestep",
    description: "You ignore difficult terrain.",
    cost: 2,
  },
];

export const Polder = {
  ancestry,
  signatureTraits,
  purchasedTraits,
};
