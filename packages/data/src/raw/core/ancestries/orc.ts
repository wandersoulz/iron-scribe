import {
  Ancestry,
  StatDynamicValueType,
  Modifier,
} from "@iron-scribe/model";

const ancestry = {
  id: "ancestry-orc",
  name: "Orc",
  description: "Relentless front-line warriors who refuse to stay down.",
  loreDescription:
    "Orcs are known for their incredible physical resilience and their culture of honor and craftsmanship.",
  ancestryPoints: 2,
} as Ancestry;

const signatureTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_orc_sig_relentless",
    ancestryId: ancestry.id,
    name: "Relentless",
    description:
      "When an attack would leave you dying, you can make a free strike. If that strike kills the target, you can spend a Recovery to stay in the fight.",
    abilities: [
      {
        id: "ability_orc_relentless",
        name: "Relentless Strike",
        description: "A final, desperate blow fueled by sheer will.",
        type: "ability",
        abilityType: "ancestry",
        action: "triggered",
        trigger: "When an attack would leave you dying.",
        target: "The attacker.",
        range: { distance: 0, type: "any" },
        keywords: ["Martial"],
        effect:
          "You make a free strike against the attacker. If the strike kills the target, you can spend a Recovery to regain Stamina as if you had caught your breath.",
      },
    ],
  },
];

const purchasedTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_orc_pt_bloodfire_rush",
    ancestryId: ancestry.id,
    name: "Bloodfire Rush",
    description:
      "The first time in a combat round that you take damage, you gain a +2 bonus to speed until the end of the round.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_orc_pt_passionate_artisan",
    ancestryId: ancestry.id,
    name: "Passionate Artisan",
    description:
      "You gain a +2 bonus to project rolls related to crafting or downtime projects.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_orc_pt_grounded",
    ancestryId: ancestry.id,
    name: "Grounded",
    description:
      "You have an advantage or bonus on saves/tests against being moved against your will.",
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
    id: "trait_orc_pt_glowing_recovery",
    ancestryId: ancestry.id,
    name: "Glowing Recovery",
    description:
      "When you take the Catch Breath maneuver, you can spend as many Recoveries as you want.",
    cost: 2,
  },
  {
    type: "ancestry-trait",
    id: "trait_orc_pt_nonstop",
    ancestryId: ancestry.id,
    name: "Nonstop",
    description: "You are immune to the Slowed condition.",
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

export const Orc = {
  ancestry,
  signatureTraits,
  purchasedTraits,
};
