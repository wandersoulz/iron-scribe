import { Named } from "../data/named";

export enum CharacteristicName {
  Might = "Might",
  Agility = "Agility",
  Reason = "Reason",
  Intuition = "Intuition",
  Presence = "Presence",
}

export class Characteristic implements Named {
  constructor(
    public id: string,
    public name: CharacteristicName,
  ) {}
}
