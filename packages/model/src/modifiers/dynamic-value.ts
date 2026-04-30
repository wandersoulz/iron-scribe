import { Condition, evaluateCondition } from "./condition";
import { StatValueResolver } from "./stat-value-resolver";

export enum StatDynamicValueType {
  LiteralValue = "literal_value",
  Math = "math",
  Conditional = "conditional",
  StatReference = "stat_reference",
  ChoiceReference = "choice_reference",
}

export type DynamicValueReturnType = number | string;

export interface DynamicValue<T extends DynamicValueReturnType> {
  readonly returnType: "number" | "string";
  type: StatDynamicValueType;
}

export interface StringStatReferenceValue extends DynamicValue<string> {
  type: StatDynamicValueType.StatReference;
  statName: string;
}

export interface NumericStatReferenceValue extends DynamicValue<number> {
  type: StatDynamicValueType.StatReference;
  statName: string;
}

export interface NumericValue extends DynamicValue<number> {
  type: StatDynamicValueType.LiteralValue;
  value: number;
}

export interface StringValue extends DynamicValue<string> {
  type: StatDynamicValueType.LiteralValue;
  value: string;
}

export interface MathValue extends DynamicValue<number> {
  type: StatDynamicValueType.Math;
  operator: "+" | "-" | "/" | "*";
  left: DynamicValue<number>;
  right: DynamicValue<number>;
}

export interface ConditionalValue<
  T extends DynamicValueReturnType,
> extends DynamicValue<T> {
  type: StatDynamicValueType.Conditional;
  condition: Condition;
  trueValue: DynamicValue<T>;
  falseValue: DynamicValue<T>;
}

export function resolveDynamicValue<T extends DynamicValueReturnType>(
  value: DynamicValue<T>,
  resolver: StatValueResolver,
): T {
  const type = value.type;
  const returnType = value.returnType;

  switch (type) {
    case StatDynamicValueType.LiteralValue:
      if (value.returnType === "number") {
        return (value as NumericValue).value as T;
      } else {
        return (value as StringValue).value as T;
      }
    case StatDynamicValueType.StatReference:
      if (returnType === "number") {
        return resolver.getNumericStat(
          (value as NumericStatReferenceValue).statName,
        ) as T;
      } else {
        return resolver.getStringStat(
          (value as StringStatReferenceValue).statName,
        ) as T;
      }

    case StatDynamicValueType.Math: {
      const math = value as MathValue;
      const left = resolveDynamicValue(math.left, resolver) as any;
      const right = resolveDynamicValue(math.right, resolver) as any;

      switch (math.operator) {
        case "+":
          return (left + right) as any;
        case "-":
          return (left - right) as any;
        case "*":
          return (left * right) as any;
        case "/":
          return (left / right) as any;
        default:
          throw new Error(`Invalid operator: ${math.operator}`);
      }
    }

    case StatDynamicValueType.Conditional: {
      const cond = value as ConditionalValue<T>;
      return evaluateCondition(cond.condition, resolver)
        ? resolveDynamicValue(cond.trueValue, resolver)
        : resolveDynamicValue(cond.falseValue, resolver);
    }

    default:
      if (returnType === "number") return 0 as T;
      else return "" as T;
  }
}
