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

const isTokenExpired = (token: string): boolean => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return true;
    }

    const payload = JSON.parse(atob(parts[1]));

    if (!payload.exp || typeof payload.exp !== 'number') {
      return true;
    }

    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();
    const bufferTime = 10 * 1000;

    return expirationTime < (currentTime + bufferTime);
  } catch (error) {
    console.error('Erro ao verificar expiração do token:', error);
    return true;
  }
};

const sessionStorageAdapter = {
  getItem: (name: string) => {
    const item = sessionStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },

  setItem: (name: string, value: any) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },

  removeItem: (name: string) => {
    sessionStorage.removeItem(name);
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token, user) => {
        if (isTokenExpired(token)) {
          console.warn('Tentativa de salvar token expirado');
          return;
        }
        set({ token, user, isAuthenticated: true });
      },
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
      isHydrated: false,
      setHydrated: (state) => set({ isHydrated: state }),
      checkTokenValidity: () => {
        const state = get();
        if (state.token && isTokenExpired(state.token)) {
          state.logout();
          return false;
        }
        return true;
      },
    }),
    {
      name: 'auth-storage',
      storage: sessionStorageAdapter,
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.token && isTokenExpired(state.token)) {
            state.logout();
          }
          state.setHydrated(true);
        }
      },
    }
  )
);
