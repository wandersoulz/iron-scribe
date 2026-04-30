import { Identifiable } from "./identifiable";

export interface ReadOnlyRegistry<T extends Identifiable> {
  get(id: string): Promise<T | undefined>;
  getSync(id: string): T | undefined;
  getAll(): Promise<T[]>;
  filter(filterCond: Partial<T>): Promise<T[]>;
  has(id: string): Promise<boolean>;
}
