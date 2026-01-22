import { create } from "zustand";
import type { Contact } from "../types/contact.types";

interface ContactState {
  contacts: Contact[];
  isLoading: boolean;
  setContacts: (contacts: Contact[]) => void;
  addContact: (contact: Contact) => void;
  updateContact: (contactId: string, nickname: string) => void;
  removeContact: (contactId: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useContactStore = create<ContactState>((set) => ({
  contacts: [],
  isLoading: false,
  setContacts: (contacts) => set({ contacts }),
  addContact: (contact) =>
    set((state) => ({
      contacts: [...state.contacts, contact],
    })),
  updateContact: (contactId, data) =>
    set((state) => ({
      contacts: state.contacts.map((c) => c._id === contactId ? { ...c, nickname: data } : c),
    })),
  removeContact: (contactId) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c._id !== contactId),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
}));
