import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    login as authServiceLogin, 
    signUp as authServiceSignUp, 
    signInWithGoogle as authServiceGoogle,
    supabase 
} from '../lib/auth';

interface PlayerState {
  userId: string | null;
  email: string | null;
  isLoggingIn: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      userId: null,
      email: null,
      isLoggingIn: false,

      login: async (email, password) => {
        set({ isLoggingIn: true });
        try {
          const user = await authServiceLogin(email, password);
          set({ userId: user.id, email: user.email, isLoggingIn: false });
        } catch (error) {
          set({ isLoggingIn: false });
          throw error;
        }
      },

      signUp: async (email, password) => {
        set({ isLoggingIn: true });
        try {
          const user = await authServiceSignUp(email, password);
          set({ userId: user.id, email: user.email, isLoggingIn: false });
        } catch (error) {
          set({ isLoggingIn: false });
          throw error;
        }
      },

      loginWithGoogle: async () => {
        set({ isLoggingIn: true });
        try {
          const user = await authServiceGoogle();
          if (user) {
            set({ userId: user.id, email: user.email, isLoggingIn: false });
          } else {
            set({ isLoggingIn: false }); // Cancelled
          }
        } catch (error) {
          set({ isLoggingIn: false });
          throw error;
        }
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({ userId: null, email: null });
      },
    }),
    {
      name: 'player-storage', 
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
