import { StatValueResolver } from "../modifiers/stat-value-resolver";
import { BaseFeature, FeatureFilterNode } from "./feature";

export class FeatureFilterResolver {
  public static resolve(
    node: FeatureFilterNode | undefined,
    feature: BaseFeature,
    resolver?: StatValueResolver,
  ): boolean {
    if (!node) return true;
    switch (node.type) {
      case "all":
        return true;
      case "eq":
        return (feature as any)[node.field] === node.value;
      case "in":
        return node.values.some(
          (v) => v.toLocaleUpperCase() === feature.name.toLocaleUpperCase(),
        );
      case "gt":
        return (feature as any)[node.field] > node.value;
      case "gte":
        return (feature as any)[node.field] >= node.value;
      case "lt":
        return (feature as any)[node.field] < node.value;
      case "lte":
        return (feature as any)[node.field] <= node.value;
      case "has_tag":
        // Assuming features might have tags, even if not in the base interface yet
        return (feature as any).tags?.includes(node.tag) ?? false;
      case "and":
        return node.queries.every((q) => this.resolve(q, feature, resolver));
      case "or":
        return node.queries.some((q) => this.resolve(q, feature, resolver));
      case "context_stat": {
        if (!resolver) return false;
        const statValue = resolver.getNumericStat(node.statName);
        const fieldValue = (feature as any)[node.field];
        if (typeof fieldValue !== "number") return false;

        switch (node.operator) {
          case "<=":
            return fieldValue <= statValue;
          case ">=":
            return fieldValue >= statValue;
          case "==":
            return fieldValue === statValue;
          default:
            return false;
        }
      }
      default:
        return false;
    }
  }
}
