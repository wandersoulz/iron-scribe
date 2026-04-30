import { Named } from "../data/named";

export abstract class StatValueResolver implements Named {
  id: string = "";
  name: string = "";
  public abstract getNumericStat(statName: string): number;
  public abstract getStringStat(statName: string): string;
}
