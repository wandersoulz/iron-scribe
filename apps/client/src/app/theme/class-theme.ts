// packages/common/index.ts

export interface ClassTheme {
  primaryColor: string;
  accentColor: string;
  iconName: string; // For use with Ionicons or FontAwesome
}

export const CLASS_THEMES: Record<string, ClassTheme> = {
  "Shadow": { 
    primaryColor: '#3700B3', // Deep Purple
    accentColor: '#BB86FC',
    iconName: 'moon' 
  },
  "Tactician": { 
    primaryColor: '#1B5E20', // Forest Green
    accentColor: '#81C784',
    iconName: 'map' 
  },
  "Default": { 
    primaryColor: '#333333', 
    accentColor: '#888888',
    iconName: 'person' 
  }
};

export const getClassTheme = (className: string): ClassTheme => {
  return CLASS_THEMES[className] || CLASS_THEMES["Default"];
};