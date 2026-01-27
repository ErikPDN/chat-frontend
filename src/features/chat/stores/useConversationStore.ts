import { create } from 'zustand';
import type { Conversation } from '../types/chat.types';

interface ConversationStore {
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
  addConversation: (conversation: Conversation) => void;
  updateConversation: (id: string, conversation: Partial<Conversation>) => void;
}

export const useConversationStore = create<ConversationStore>((set) => ({
  conversations: [],
  
  setConversations: (conversations) => set({ conversations }),
  
  addConversation: (conversation) => set((state) => {
    const exists = state.conversations.some(c => c.id === conversation.id);
    if (exists) return state;
    
    return { conversations: [conversation, ...state.conversations] };
  }),
  
  updateConversation: (id, updates) => set((state) => ({
    conversations: state.conversations.map(c =>
      c.id === id ? { ...c, ...updates } : c
    ),
  })),
}));
