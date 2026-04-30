import { ConditionEffect } from "../ability/ability";

export interface HeroCombatState {
  currentStamina: number;
  currentRecoveries: number;
  currentTempStamina: number;
  surges: number;
  conditions: ConditionEffect[];
  level: number;
  numHeroicResources: number;
}
