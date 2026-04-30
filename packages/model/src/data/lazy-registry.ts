import { Identifiable } from "./identifiable";
import { LocalRegistry } from "./local-registry";
import { ReadOnlyRegistry } from "./readonly-registry";

export class LazyRegistry<
  T extends Identifiable,
> implements ReadOnlyRegistry<T> {
  private loader: () => Promise<T[]>;
  private instance: ReadOnlyRegistry<T> | null = null;
  private initPromise: Promise<ReadOnlyRegistry<T>> | null = null;

  constructor(loader: () => Promise<T[]>) {
    this.loader = loader;
  }

  private _initialize(): Promise<ReadOnlyRegistry<T>> {
    if (this.instance) {
      return Promise.resolve(this.instance);
    }
    if (this.initPromise) {
      return this.initPromise;
    }
    this.initPromise = this.loader().then((items) => {
      this.instance = new LocalRegistry(items);
      return this.instance;
    });
    return this.initPromise;
  }

  public async get(id: string): Promise<T | undefined> {
    return (await this._initialize()).get(id);
  }

  public getSync(id: string): T | undefined {
    if (this.instance) {
      return this.instance.getSync(id);
    }
    return undefined;
  }

  public async getAll(): Promise<T[]> {
    return (await this._initialize()).getAll();
  }

  public async has(id: string): Promise<boolean> {
    return (await this._initialize()).has(id);
  }

  public async filter(filterCond: Partial<T>): Promise<T[]> {
    return (await this._initialize()).filter(filterCond);
  }
}
