import { Identifiable } from "../data/identifiable";
import { ReadOnlyRegistry } from "../data/readonly-registry";

type RegistryMap = Record<string, ReadOnlyRegistry<Identifiable>>;

export class Sourcebook<T extends RegistryMap> {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly registries: T,
  ) {}

  // A helper method that maintains perfect type safety when fetching a specific registry
  public getRegistry<K extends keyof T>(key: K): T[K] {
    return this.registries[key];
  }

  public async loadAll() {
    await Promise.all(Object.values(this.registries).map(reg => reg.getAll()));
  }
}
