import { useMemo } from 'react';
import { useConversations } from './useConversations';
import type { ConversationFilterMode } from '../types/chat.types';

export const useFilteredConversations = (filterMode: ConversationFilterMode) => {
  const { conversations, isLoading, refetch } = useConversations();

  const filteredConversations = useMemo(() => {
    return conversations.filter((conv) =>
      filterMode === "unread" ? conv.unreadCount > 0 : true
    );
  }, [conversations, filterMode]);

  return { conversations: filteredConversations, isLoading, refetch };
};
