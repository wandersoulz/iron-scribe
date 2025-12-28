import { Platform, ViewStyle } from 'react-native';

/**
 * Creates a glowing shadow effect that works on iOS, Android, and Web.
 * @param color The hex color of the glow (e.g., '#3700B3')
 */
export const getGlowStyle = (color: string): ViewStyle => {
  return Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 10,
    },
    web: {
      // Web uses CSS standard box-shadow.
      // We explicitly cast to 'any' because React Native types 
      // don't officially support boxShadow string syntax yet.
      boxShadow: `0px 0px 20px 0px ${color}80`, 
    } as any,
    android: {
      // Android uses 'elevation' for depth.
      // Colored shadows only work on Android 9+ (API 28).
      elevation: 10,
      shadowColor: color,
    },
    default: {},
  }) as ViewStyle;
};