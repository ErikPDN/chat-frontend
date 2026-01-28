import { useEffect } from "react";
import { useSocket } from "../../../shared/hooks/useSocket";
import type { Message, MessageP2PResponse, MessageGroupResponse } from "../types/chat.types";

interface UseMessageListenerProps {
  conversationId: string | null;
  isGroup: boolean;
  onNewMessage: (message: Message) => void;
}

const mapP2PResponseToMessage = (
  messageData: MessageP2PResponse,
  conversationId: string
): Message => {
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

const mapGroupResponseToMessage = (
  messageData: MessageGroupResponse,
  conversationId: string
): Message => {
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

