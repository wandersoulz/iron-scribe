import { Identifiable } from "./identifiable";
import { ReadOnlyRegistry } from "./readonly-registry";

/**
 * A simple in-memory implementation of ReadOnlyRegistry.
 */
export class LocalRegistry<
  T extends Identifiable,
> implements ReadOnlyRegistry<T> {
  private items: Map<string, T>;

  constructor(items: T[] = []) {
    this.items = new Map(items.map((item) => [item.id, item]));
  }

  public async get(id: string): Promise<T | undefined> {
    return this.items.get(id);
  }

  public getSync(id: string): T | undefined {
    return this.items.get(id);
  }

  public async getAll(): Promise<T[]> {
    return Array.from(this.items.values());
  }

  public async has(id: string): Promise<boolean> {
    return this.items.has(id);
  }

  public async filter(filterCondition: Partial<T>): Promise<T[]> {
    return Array.from(
      this.items
        .values()
        .filter((item) =>
          Object.keys(filterCondition).every(
            (key) => item[key as keyof T] === filterCondition[key as keyof T],
          ),
        ),
    );
  }
}
