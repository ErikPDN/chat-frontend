import { useEffect } from "react";
import { useSocket } from "../../../shared/hooks/useSocket";
import { useAuthStore } from "../../auth/stores/useAuthStore";
import { useConversationStore } from "../stores/useConversationStore";
import type { MessageGroupResponse, MessageP2PResponse } from "../types/chat.types";

export function useConversationListener() {
    const socket = useSocket();
    const { user } = useAuthStore();
    const { updateConversation } = useConversationStore();

    useEffect(() => {
        if (!socket || !user) return;

        const handleP2P = (messageData: MessageP2PResponse) => {
            console.log('Nova mensagem P2P recebida:', messageData);
            
            const senderId = typeof messageData.senderId === 'string' 
                ? messageData.senderId 
                : messageData.senderId._id;
            const receiverId = typeof messageData.receiverId === 'string' 
                ? messageData.receiverId 
                : messageData.receiverId._id;
            
            const otherUserId = senderId === user.id ? receiverId : senderId;
            
            updateConversation(otherUserId, {
                lastMessageTimestamp: messageData.createdAt,
                lastMessage: messageData.content,
                unreadCount: senderId !== user.id ? undefined : 0
            })

        }

        const handleGroup = (messageData: MessageGroupResponse) => {
            console.log('Nova mensagem de grupo recebida:', messageData);
            
            const senderId = typeof messageData.senderId === 'string' 
                ? messageData.senderId 
                : messageData.senderId._id;
            
            updateConversation(messageData.groupId, {
                lastMessageTimestamp: messageData.createdAt,
                lastMessage: messageData.content,
                unreadCount: senderId !== user.id ? undefined : 0
            })
        }

        socket.on('newMessage', handleP2P);
        socket.on('newGroupMessage', handleGroup);

        return () => {
            console.log('useConversationListener desmontado - Socket ID:', socket.id);
            socket.off('newMessage', handleP2P);
            socket.off('newGroupMessage', handleGroup);
        }
    }, [socket, user, updateConversation]);
}