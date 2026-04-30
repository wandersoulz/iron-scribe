import { DynamicValue, resolveDynamicValue } from "./dynamic-value";
import { StatValueResolver } from "./stat-value-resolver";

export interface BaseCondition {
  readonly type?: string;
}

export interface NumericValueCompareCondition extends BaseCondition {
  readonly type: "numeric_value_compare";
  readonly leftSideValue: DynamicValue<number>;
  readonly rightSideValue: DynamicValue<number>;
  readonly operator: "==" | "!=" | ">" | "<" | ">=" | "<=";
}

export interface AndCondition extends BaseCondition {
  readonly type: "and";
  readonly conditions: Condition[];
}

export interface OrCondition extends BaseCondition {
  readonly type: "or";
  readonly conditions: Condition[];
}

export interface HasComponentCondition extends BaseCondition {
  readonly type: "has_component";
  readonly componentId: string;
}

export type Condition =
  | HasComponentCondition
  | NumericValueCompareCondition
  | AndCondition
  | OrCondition;

export function evaluateCondition(
  condition: Condition,
  resolver: StatValueResolver,
): boolean {
  if (!condition) return true;

  switch (condition.type) {
    case "numeric_value_compare": {
      const left = resolveDynamicValue(
        condition.leftSideValue,
        resolver,
      ) as number;
      const right = resolveDynamicValue(
        condition.rightSideValue,
        resolver,
      ) as number;

      switch (condition.operator) {
        case "==":
          return left == right;
        case "!=":
          return left != right;
        case ">":
          return left > right;
        case "<":
          return left < right;
        case ">=":
          return left >= right;
        case "<=":
          return left <= right;
        default:
          return false;
      }
    }

    case "has_component":
      return true;

    case "and":
      return condition.conditions.every((c) => evaluateCondition(c, resolver));

    case "or":
      return condition.conditions.some((c) => evaluateCondition(c, resolver));

    default:
      return false;
  }
}
