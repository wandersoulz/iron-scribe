import { Ancestry, AncestryTrait } from "@iron-scribe/model";
import { Devil } from "./devil";
import { DragonKnight } from "./dragon-knight";
import { Dwarf } from "./dwarf";
import { HighElf } from "./high-elf";
import { WodeElf } from "./wode-elf";
import { Human } from "./human";
import { Orc } from "./orc";
import { Polder } from "./polder";
import { Revenant } from "./revenant";
import { Hakaan } from "./hakaan";
import { Memonek } from "./memonek";
import { TimeRaider } from "./time-raider";

export const ancestryTraits: AncestryTrait[] = [
  ...Devil.purchasedTraits,
  ...Devil.signatureTraits,
  ...DragonKnight.purchasedTraits,
  ...DragonKnight.signatureTraits,
  ...Dwarf.purchasedTraits,
  ...Dwarf.signatureTraits,
  ...Hakaan.purchasedTraits,
  ...Hakaan.signatureTraits,
];

export const ancestries: Ancestry[] = [
  Devil.ancestry,
  DragonKnight.ancestry,
  Dwarf.ancestry,
  HighElf.ancestry,
  WodeElf.ancestry,
  Human.ancestry,
  Orc.ancestry,
  Polder.ancestry,
  Revenant.ancestry,
  Hakaan.ancestry,
  Memonek.ancestry,
  TimeRaider.ancestry,
];
