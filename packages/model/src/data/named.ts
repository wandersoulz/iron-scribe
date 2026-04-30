import { Identifiable } from "./identifiable";

export interface Named extends Identifiable {
  name: string;
}
