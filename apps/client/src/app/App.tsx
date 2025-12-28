import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { HeroSelectScreen } from '../screens/HeroSelectScreen';
import { HeroDashboardScreen } from '../screens/HeroDashboardScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { usePlayerStore } from '../store/usePlayerStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const userId = usePlayerStore((state) => state.userId);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: '#000' }, headerTintColor: '#fff' }}
      >
        {userId == null ? (
          <>
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='SignUp'
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name='HeroSelect'
              component={HeroSelectScreen}
              options={{
                title: 'Vault',
              }}
            />
            <Stack.Screen
              name='HeroDashboard'
              component={HeroDashboardScreen}
              options={{ 
                title: 'Hero',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}