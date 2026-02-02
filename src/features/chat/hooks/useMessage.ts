import { useCallback, useEffect, useState } from "react";
import { useToast } from "../../../shared/hooks/useToast";
import { messageService } from "../service/messageService";
import type { Message } from "../types/chat.types";
import { useMessageListener } from "./useMessageListener";

interface UseMessageProps {
  conversationId: string | null;
  isGroup: boolean;
}

export const useMessage = ({ conversationId, isGroup }: UseMessageProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const fetchMessages = useCallback(async () => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await messageService.getMessagesByConversation(conversationId, isGroup);
      setMessages(data);
    } catch {
      addToast("Erro ao carregar mensagens", "error");
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, isGroup, addToast]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleNewMessage = useCallback((newMessage: Message) => {
    if (newMessage.conversationId === conversationId) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  }, [conversationId]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  useMessageListener({
    onNewMessage: handleNewMessage,
  });

  return { messages, isLoading, refetch: fetchMessages, addMessage };
};
