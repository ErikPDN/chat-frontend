import { useState, useEffect, useCallback } from 'react';
import { conversationService } from '../service/conversationService';
import { useConversationStore } from '../stores/useConversationStore';
import { useToast } from '../../../shared/hooks/useToast';

export const useConversations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const { conversations, setConversations } = useConversationStore();

  const fetchConversations = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await conversationService.getConversations();
      setConversations(data);
    } catch {
      addToast('Erro ao carregar conversas', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [addToast, setConversations]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return { conversations, isLoading, refetch: fetchConversations };
};  
