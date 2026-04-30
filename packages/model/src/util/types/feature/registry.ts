import { ClassConstructor, Type } from "class-transformer";
import { BaseFeature, FeatureType } from "../../../feature/feature";

export interface DiscriminatorType {
  value: ClassConstructor<any>;
  name: string;
}

export class FeatureTypeRegistry {
  // This shared array is the secret sauce.
  // It is passed by reference to class-transformer.
  public static readonly subTypes: DiscriminatorType[] = [];

  static register(name: string, target: any) {
    this.subTypes.push({ name, value: target });
  }

  static get(name: string) {
    return this.subTypes.find((s) => s.name === name)?.value;
  }
}

export function RegisterFeature(name: FeatureType) {
  // Use a generic to accept any class constructor
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    // 3. Register the WRAPPED class with our registry, not the original
    FeatureTypeRegistry.register(name, constructor);

    // 4. Return the wrapped class to take the place of the original
    return constructor;
  };
}
