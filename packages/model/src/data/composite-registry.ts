import { Identifiable } from "./identifiable";
import { ReadOnlyRegistry } from "./readonly-registry";

/**
 * A registry that aggregates multiple other registries.
 * When querying, it searches each sub-registry in order.
 */
export class CompositeRegistry<
  T extends Identifiable,
> implements ReadOnlyRegistry<T> {
  private registries: ReadOnlyRegistry<T>[] = [];

  public addRegistry(registry: ReadOnlyRegistry<T>) {
    this.registries.push(registry);
  }

  public async get(id: string): Promise<T | undefined> {
    for (const registry of this.registries) {
      const item = await registry.get(id);
      if (item) return item;
    }
    return undefined;
  }

  public getSync(id: string): T | undefined {
    for (const registry of this.registries) {
      const item = registry.getSync(id);
      if (item) return item;
    }
    return undefined;
  }

  public async getAll(): Promise<T[]> {
    const allItems: T[] = [];
    const seenIds = new Set<string>();

    for (const registry of this.registries) {
      const items = await registry.getAll();
      for (const item of items) {
        if (!seenIds.has(item.id)) {
          allItems.push(item);
          seenIds.add(item.id);
        }
      }
    }

    return allItems;
  }

  public async has(id: string): Promise<boolean> {
    for (const registry of this.registries) {
      if (await registry.has(id)) return true;
    }
    return false;
  }

  public async filter(filterCond: Partial<T>): Promise<T[]> {
    const allItems: T[] = [];
    const seenIds = new Set<string>();

    for (const registry of this.registries) {
      const items = await registry.filter(filterCond);
      for (const item of items) {
        if (!seenIds.has(item.id)) {
          allItems.push(item);
          seenIds.add(item.id);
        }
      }
    }

    return allItems;
  }
}
