import { useState, useEffect, useCallback } from 'react'; // 1. Importe o useCallback
import { conversationService } from '../service/conversationService';
import type { Conversation } from '../types/chat.types';
import { useToast } from '../../../shared/hooks/useToast';

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

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
  }, [addToast]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return { conversations, isLoading, refetch: fetchConversations };
};
