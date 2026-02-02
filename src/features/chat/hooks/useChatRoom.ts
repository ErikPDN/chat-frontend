import { useEffect } from "react";
import { useSocket } from "../../../shared/hooks/useSocket";

interface UseChatRoomProps {
  conversationId: string | null;
  isGroup: boolean;
}

export const useChatRoom = ({ conversationId, isGroup }: UseChatRoomProps) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !conversationId) return;

    if (isGroup) {
      socket.emit('joinGroup', { groupId: conversationId });
      console.log(`Entrou no grupo: ${conversationId}`);

      return () => {
        socket.emit('leaveGroup', { groupId: conversationId });
        console.log(`Saiu do grupo: ${conversationId}`);
      };
    }

  }, [socket, conversationId, isGroup]);
};
