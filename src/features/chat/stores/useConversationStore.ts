import { create } from 'zustand';
import type { Conversation } from '../types/chat.types';

interface ConversationStore {
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
  addConversation: (conversation: Conversation) => void;
  updateConversation: (id: string, conversation: Partial<Conversation>) => void;
  getUnreadConversations: () => Conversation[];
  hasUnreadConversations: (conversationId: string) => boolean;
}

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations: [],

  setConversations: (conversations) => set({ conversations }),

  addConversation: (conversation) => set((state) => {
    const exists = state.conversations.some(c => c.id === conversation.id);
    if (exists) return state;

    return { conversations: [conversation, ...state.conversations] };
  }),

  updateConversation: (id, conversationUpdates) => set((state) => {
    const conversation = state.conversations.find(c => c.id === id);
    if (!conversation) return state;

    const updatedConversations = state.conversations.map(c => {
      if (c.id === id) {
        const newUnreadCount = conversationUpdates.unreadCount === undefined 
          ? (c.unreadCount || 0) + 1 
          : conversationUpdates.unreadCount;

        return { ...c, ...conversationUpdates, unreadCount: newUnreadCount };
      }
      return c;
    });

    if (conversationUpdates.lastMessageTimestamp) {
      updatedConversations.sort((a, b) => {
        const timeA = new Date(a.lastMessageTimestamp || '').getTime();
        const timeB = new Date(b.lastMessageTimestamp || '').getTime();
        return timeB - timeA;
      });
    }

    return { conversations: updatedConversations };
  }),

  getUnreadConversations: () => {
    return get().conversations.filter(c => c.unreadCount > 0);
  },

  hasUnreadConversations: (conversationId: string) => {
    const conversation = get().conversations.find(c => c.id === conversationId);
    return conversation ? conversation.unreadCount > 0 : false;
  },
}));
