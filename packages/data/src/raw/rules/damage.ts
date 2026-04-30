import { Damage } from "@iron-scribe/model";

export enum DamageType {
  Acid = "Acid",
  Fire = "Fire",
  Cold = "Cold",
  Corruption = "Corruption",
  Holy = "Holy",
  Lightning = "Lightning",
  Poison = "Poison",
  Psychic = "Psychic",
  Sonic = "Sonic",
}

export const Damages = Object.values(DamageType).map(
  (damageType) =>
    ({
      id: `damage-${damageType}`,
      name: damageType,
    }) as Damage,
);
