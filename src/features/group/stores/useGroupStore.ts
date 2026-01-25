import { create } from 'zustand';
import type { Group } from '../types/group.types';

interface GroupState {
  groups: Group[];
  selectedGroup: Group | null;
  setGroups: (groups: Group[]) => void;
  addGroup: (group: Group) => void;
  setSelectedGroup: (group: Group | null) => void;
}

export const useGroupStore = create<GroupState>((set) => ({
  groups: [],
  selectedGroup: null,
  setGroups: (groups) => set({ groups }),
  addGroup: (group) => set((state) => ({
    groups: [...state.groups, group]
  })),
  setSelectedGroup: (group) => set({ selectedGroup: group }),
}));
