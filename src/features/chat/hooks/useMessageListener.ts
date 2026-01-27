import { useEffect } from "react";
import { useSocket } from "../../../shared/hooks/useSocket";
import type { Message, MessageP2P, MessageP2PResponse, MessageGroup, MessageGroupResponse } from "../types/chat.types";

interface UseMessageListenerProps {
  conversationId: string | null;
  isGroup: boolean;
  onNewMessage: (message: Message) => void;
}

// Função que mapeia MessageP2PResponse (backend P2P) para MessageP2P (frontend)
const mapP2PResponseToMessage = (
  messageData: MessageP2PResponse,
  conversationId: string
): MessageP2P => {
  return {
    id: messageData._id,
    conversationId,
    content: messageData.content,
    senderId: messageData.senderId._id,
    senderName: messageData.senderId.username,
    senderAvatar: messageData.senderId.avatar,
    timestamp: messageData.createdAt,
    createdAt: messageData.createdAt,
  };
};

// Função que mapeia MessageGroupResponse (backend grupo) para MessageGroup (frontend)
const mapGroupResponseToMessage = (
  messageData: MessageGroupResponse,
  conversationId: string
): MessageGroup => {
  return {
    id: messageData._id,
    conversationId: conversationId || messageData.groupId,
    content: messageData.content,
    senderId: messageData.senderId._id,
    senderName: messageData.senderId.username,
    senderAvatar: messageData.senderId.avatar,
    timestamp: messageData.createdAt,
    createdAt: messageData.createdAt,
  };
};

export const useMessageListener = ({
  conversationId,
  isGroup,
  onNewMessage,
}: UseMessageListenerProps) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !conversationId) return;

    if (!isGroup) {
      socket.on('newMessage', (messageData: MessageP2PResponse) => {
        console.log('Nova mensagem P2P recebida:', messageData);
        const message = mapP2PResponseToMessage(messageData, conversationId);
        onNewMessage(message);
      });
    }

    if (isGroup) {
      socket.on('newGroupMessage', (messageData: MessageGroupResponse) => {
        console.log('Nova mensagem de grupo recebida:', messageData);
        const message = mapGroupResponseToMessage(messageData, conversationId);
        onNewMessage(message);
      });
    }

    return () => {
      socket.off('newMessage');
      socket.off('newGroupMessage');
    };
  }, [socket, conversationId, isGroup, onNewMessage]);
};

