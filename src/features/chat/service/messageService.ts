import api from "../../../shared/utils/api";
import type { Message, MessageResponse } from "../types/chat.types";

const mapMessageResponse = (data: MessageResponse): Message => ({
  id: data._id,
  conversationId: data.conversationId,
  content: data.content,
  senderId: data.senderId._id,
  senderName: data.senderId.username,
  senderAvatar: data.senderId.avatar,
  timestamp: data.timestamp,
  createdAt: data.createdAt,
});

export const messageService = {
  getMessagesByConversation: async (conversationId: string, isGroup: boolean): Promise<Message[]> => {
    const endpoint = isGroup
      ? `/chat/conversations/group/${conversationId}/messages`
      : `/chat/conversations/p2p/${conversationId}/messages`;
    const response = await api.get(endpoint);
    return response.data.map(mapMessageResponse);
  },

  getMessagesByP2P: async (userId: string) => {
    const response = await api.get(`/chat/conversations/p2p/${userId}/messages`);
    return response.data.map(mapMessageResponse);
  },

  getMessagesByGroup: async (groupId: string) => {
    const response = await api.get(`/chat/conversations/group/${groupId}/messages`);
    return response.data.map(mapMessageResponse);
  }
}
