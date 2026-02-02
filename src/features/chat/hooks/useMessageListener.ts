import { useEffect } from "react";
import { useSocket } from "../../../shared/hooks/useSocket";
import type { Message, MessageP2PResponse, MessageGroupResponse } from "../types/chat.types";
import { useAuthStore } from "../../auth/stores/useAuthStore";
interface UseMessageListenerProps {
  onNewMessage: (message: Message) => void;
}

const mapP2PResponseToMessage = (
  messageData: MessageP2PResponse,
  currentUserId: string,
): Message => {
  const senderId = typeof messageData.senderId === 'string'
    ? messageData.senderId
    : messageData.senderId._id;

  const receiverId = typeof messageData.receiverId === 'string'
    ? messageData.receiverId
    : messageData.receiverId._id;

  const conversationId = senderId === currentUserId 
    ? receiverId 
    : senderId;

  return {
    id: messageData._id,
    conversationId,
    content: messageData.content,
    senderId,
    senderName: typeof messageData.senderId === 'string' ? '' : messageData.senderId.username,
    senderAvatar: typeof messageData.senderId === 'string' ? undefined : messageData.senderId.avatar,
    timestamp: messageData.createdAt,
    createdAt: messageData.createdAt,
  };
};

const mapGroupResponseToMessage = (
  messageData: MessageGroupResponse,
): Message => {
  const senderId = typeof messageData.senderId === 'string'
    ? messageData.senderId
    : messageData.senderId._id;

  return {
    id: messageData._id,
    conversationId: messageData.groupId,
    content: messageData.content,
    senderId,
    senderName: typeof messageData.senderId === 'string' ? '' : messageData.senderId.username,
    senderAvatar: typeof messageData.senderId === 'string' ? undefined : messageData.senderId.avatar,
    timestamp: messageData.createdAt,
    createdAt: messageData.createdAt,
  };
};

export const useMessageListener = ({
  onNewMessage,
}: UseMessageListenerProps) => {
  const socket = useSocket();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!socket || !user) return;

    socket.on('newMessage', (messageData: MessageP2PResponse) => {
      console.log('Nova mensagem P2P recebida:', messageData);
      const message = mapP2PResponseToMessage(messageData, user.id);
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
  }, [socket, onNewMessage, user]);
};