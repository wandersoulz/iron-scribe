import {
  Ancestry,
  StatDynamicValueType,
  Modifier,
} from "@iron-scribe/model";

const ancestry = {
  id: "ancestry-hakaan",
  name: "Hakaan",
  description:
    "Giant-kin who traded their size for the ability to see their own demise.",
  loreDescription:
    "Hakaan are massive, stoic warriors who carry the weight of their fate in their eyes. Their doomsight is both a blessing and a heavy burden.",
  ancestryPoints: 3,
} as Ancestry;

const signatureTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_hakaan_sig_big",
    ancestryId: ancestry.id,
    name: "Big!",
    description: "Your stature reflects your giant forebears. Your size is 1L.",
    modifiers: [
      new Modifier("stat", "base", "size", {
        type: StatDynamicValueType.LiteralValue,
        value: "1L",
        returnType: "string",
      } as any),
    ],
  },
];

const purchasedTraits: any[] = [
  {
    type: "ancestry-trait",
    id: "trait_hakaan_pt_all_is_a_feather",
    ancestryId: ancestry.id,
    name: "All Is a Feather",
    description:
      "You are exceptionally strong. You gain an edge on tests made to lift and haul heavy objects.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_hakaan_pt_forceful",
    ancestryId: ancestry.id,
    name: "Forceful",
    description:
      "Whenever you force move a creature or object, the forced movement distance gains a +1 bonus.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_hakaan_pt_stand_tough",
    ancestryId: ancestry.id,
    name: "Stand Tough",
    description:
      "Your body is made to withstand the blows of your enemies. Your Might score is treated as 1 higher for the purpose of resisting potencies, and you gain an edge on Might tests when called for to resist environmental effects or a creature's traits or abilities.",
    cost: 1,
  },
  {
    type: "ancestry-trait",
    id: "trait_hakaan_pt_great_fortitude",
    ancestryId: ancestry.id,
    name: "Great Fortitude",
    description:
      "Your hearty constitution prevents you from losing strength. You can't be made weakened.",
    cost: 2,
    modifiers: [
      new Modifier("list", "remove", "conditions", {
        type: StatDynamicValueType.LiteralValue,
        value: "Weakened",
        returnType: "string",
      } as any),
      new Modifier("list", "add", "condition_immunity", {
        type: StatDynamicValueType.LiteralValue,
        value: "Weakened",
        returnType: "string",
      } as any),
    ],
  },
  {
    type: "ancestry-trait",
    id: "trait_hakaan_pt_doomsight",
    ancestryId: ancestry.id,
    name: "Doomsight",
    description:
      "Working with your Director, you can predetermine an encounter in \
which you will die. When that encounter begins, you become doomed. \
While doomed, you automatically obtain a tier 3 outcome on tests and \
ability rolls, and you don't die no matter how low your Stamina falls. \
You then die immediately at the end of the encounter, and can't be \
returned to life by any means. \
If you don't predetermine your death encounter, you can choose to \
become doomed while you are dying with the Director's approval (no \
action required). Doing so should be reserved for encounters in which \
you are dying as a result of suitable heroism, such as making a last stand \
against a boss or saving civilians, or when the consequences of your \
actions have finally caught up to you—not because you're playing a \
one-shot and have nothing to lose, Hacaarl. \
Additionally, when your Stamina reaches the negative of your winded \
value and you are not doomed, you turn to rubble instead of experiencing \
death. You are unaware of your surroundings in this state, and you \
can't regain Stamina or have this effect undone in any way. After 12 \
hours, you regain Stamina equal to your recovery value.",
    cost: 2,
  },
];

export const Hakaan = {
  ancestry,
  signatureTraits,
  purchasedTraits,
};
