import { BaseFeature, FeatureChoiceDynamicValue } from "./feature";
import { Hero } from "../hero/hero";
import { CharacteristicArrayProvider } from "./providers/characteristic-array-provider";

export interface ChoiceProvider {
  resolve(config: Record<string, any>, hero: Hero): BaseFeature[];
}

export class ChoiceProviderRegistry {
  private static providers = new Map<string, ChoiceProvider>();
  private static initialized = false;

  private static ensureInitialized() {
    if (this.initialized) return;
    this.register("characteristic-array-provider", new CharacteristicArrayProvider());
    this.initialized = true;
  }

  public static register(id: string, provider: ChoiceProvider) {
    this.providers.set(id, provider);
  }

  public static resolve(
    dynamicValue: FeatureChoiceDynamicValue,
    hero: Hero,
  ): BaseFeature[] {
    this.ensureInitialized();
    const provider = this.providers.get(dynamicValue.providerId);
    if (!provider) {
      console.warn(`Choice provider not found: ${dynamicValue.providerId}`);
      return [];
    }
    return provider.resolve(dynamicValue.config, hero);
  }
}
