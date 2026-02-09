import { create } from 'zustand';
import type { Group } from '../types/group.types';

interface GroupState {
  groups: Group[];
  isLoading: boolean;
  selectedGroup: Group | null;
  setGroups: (groups: Group[]) => void;
  addGroup: (group: Group) => void;
  setSelectedGroup: (group: Group | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  updateGroup: (groupId: string, data: Partial<Group>) => void;
}

export const useGroupStore = create<GroupState>((set) => ({
  groups: [],
  isLoading: false,
  selectedGroup: null,
  setGroups: (groups) => set({ groups }),
  addGroup: (group) =>
    set((state) => ({
      groups: [...state.groups, group],
    })),
  setSelectedGroup: (group) => set({ selectedGroup: group }),
  setIsLoading: (isLoading) => set({ isLoading }),
  updateGroup: (groupId, data) =>
    set((state) => ({
      groups: state.groups.map((g) =>
        g._id === groupId ? { ...g, ...data } : g,
      ),
    })),
}));
