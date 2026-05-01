import { Feature } from "../feature/feature";
import { RegisterFeature } from "../util/types/feature/registry";

export enum CharacteristicName {
  Might = "Might",
  Agility = "Agility",
  Reason = "Reason",
  Intuition = "Intuition",
  Presence = "Presence",
}

@RegisterFeature("characteristic")
export class Characteristic extends Feature {
  constructor(
    public id: string,
    public name: CharacteristicName,
    public value?: number,
  ) {
    super();
  }
}
