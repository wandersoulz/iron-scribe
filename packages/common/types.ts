export interface ClassStats {
    staminaBase: number;
    staminaPerLevel: number;
    recoveries: number;
}

export interface HeroState {
  staminaDamage: number;
  recoveriesUsed: number;
  victories: number;
}

export interface Feature {
  id: string;
  name: string;
  type: 'Ability' | 'Maneuver' | 'Perk' | 'Ancestry Feature';
  description?: string;
}

export interface HeroClass {
  id: string;
  name: string;
  staminaBase: number;
  staminaPerLevel: number;
  recoveries: number;
}

export interface Hero {
  id: string;
  name: string;
  level: number;
  class: string;
  state: HeroState;
  features: Feature[];
}