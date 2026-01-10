import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../../user/types/user.types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  isHydrated: boolean;
  setHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
      isHydrated: false,
      setHydrated: (state) => set({ isHydrated: state }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state) state.setHydrated(true);
      },
    }
  )
);
