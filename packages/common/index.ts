import { ClassStats } from './types';

export * from './types';

export const CLASS_DATA: Record<string, ClassStats> = {
    "Shadow": { staminaBase: 18, staminaPerLevel: 6, recoveries: 8 },
    "Tactician": { staminaBase: 21, staminaPerLevel: 7, recoveries: 10 }
};

export const calculateMaxStamina = (className: string, level: number): number => {
    const stats = CLASS_DATA[className] || { staminaBase: 10, staminaPerLevel: 4 };
    return stats.staminaBase + (level - 1) * stats.staminaPerLevel;
};