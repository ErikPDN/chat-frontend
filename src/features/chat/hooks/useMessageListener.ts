import { useEffect } from "react";
import { useSocket } from "../../../shared/hooks/useSocket";
import type { Message, MessageP2PResponse, MessageGroupResponse } from "../types/chat.types";

interface UseMessageListenerProps {
  onNewMessage: (message: Message) => void;
}

const mapP2PResponseToMessage = (
  messageData: MessageP2PResponse,
): Message => {
  return {
    id: messageData._id,
    conversationId: messageData.senderId._id,
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
): Message => {
  return {
    id: messageData._id,
    conversationId: messageData.groupId,
    content: messageData.content,
    senderId: messageData.senderId._id,
    senderName: messageData.senderId.username,
    senderAvatar: messageData.senderId.avatar,
    timestamp: messageData.createdAt,
    createdAt: messageData.createdAt,
  };
};

export const useMessageListener = ({
  onNewMessage,
}: UseMessageListenerProps) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('newMessage', (messageData: MessageP2PResponse) => {
      console.log('Nova mensagem P2P recebida:', messageData);
      const message = mapP2PResponseToMessage(messageData);
      onNewMessage(message);
    });

    socket.on('newGroupMessage', (messageData: MessageGroupResponse) => {
      console.log('Nova mensagem de grupo recebida:', messageData);
      const message = mapGroupResponseToMessage(messageData);
      onNewMessage(message);
    });

    return () => {
      socket.off('newMessage');
      socket.off('newGroupMessage');
    };
  }, [socket, onNewMessage]);
};

