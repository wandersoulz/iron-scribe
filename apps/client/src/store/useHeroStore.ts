import { create } from 'zustand';
import { Hero, HeroState } from '@iron-scribe/common';

// Helper interface for the list view
interface HeroSummary {
  id: string;
  name: string;
  level: number;
  class: string;
}

interface HeroStore {
  // State
  heroes: HeroSummary[];
  activeHero: Hero | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchHeroes: (userId: string) => Promise<void>;
  fetchActiveHero: (heroId: string) => Promise<void>;
  updateResource: (key: keyof HeroState, amount: number) => Promise<void>;
  updateActiveHeroState: (newState: HeroState) => Promise<void>;
  clearActiveHero: () => void;
}

export const useHeroStore = create<HeroStore>((set, get) => ({
  heroes: [],
  activeHero: null,
  isLoading: false,
  error: null,

  fetchHeroes: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      // Ensure you are using your machine's local IP, not localhost
      const response = await fetch(`http://YOUR_IP:3000/heroes/player/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch heroes');
      
      const data = await response.json();
      set({ heroes: data, isLoading: false });
    } catch (err: any) {
      console.error(err);
      set({ error: err.message, isLoading: false });
    }
  },

  fetchActiveHero: async (heroId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`http://YOUR_IP:3000/heroes/${heroId}/full`);
      const data = await response.json();
      set({ activeHero: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  updateResource: async (key, amount) => {
    const { activeHero } = get();
    if (!activeHero) return;

    // 1. Calculate New State
    const currentVal = activeHero.state[key];
    const nextVal = Math.max(0, currentVal + amount);
    
    const updatedState = { ...activeHero.state, [key]: nextVal };

    // 2. Optimistic Update (Update UI instantly)
    set({
      activeHero: { ...activeHero, state: updatedState }
    });

    // 3. Sync to Postgres/Apache AGE
    try {
      await fetch(`http://YOUR_IP:3000/heroes/${activeHero.id}/state`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedState),
      });
    } catch (error) {
      // Rollback on error if you want to be extra safe
      console.error("Failed to sync with Postgres:", error);
    }
  },

  updateActiveHeroState: async (newState) => {
    const { activeHero } = get();
    if (!activeHero) return;

    // 1. Optimistic Update
    set({ activeHero: { ...activeHero, state: newState } });

    // 2. Sync to DB
    try {
      await fetch(`http://YOUR_IP:3000/heroes/${activeHero.id}/state`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newState),
      });
    } catch (error) {
      console.error("Sync failed", error);
      // Optional: Revert state here if needed
    }
  },

  clearActiveHero: () => set({ activeHero: null }),
}));