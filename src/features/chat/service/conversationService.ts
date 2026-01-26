import api from "../../../shared/utils/api";
import type { ConversationResponse, Conversation } from "../types/chat.types";

const mapConversationResponse = (data: ConversationResponse): Conversation => ({
  id: data._id,
  name: data.name,
  avatarUrl: data.avatarUrl || "",
  lastMessage: data.lastMessage || "",
  lastMessageTimestamp: data.lastMessageTimestamp || "",
  unreadCount: data.unreadCount || 0,
  isGroup: data.isGroup,
})

export const conversationService = {
  getConversations: async () => {
    const response = await api.get('/chat/conversations');
    return response.data.map(mapConversationResponse);
  },

  getConversationByUserId: async (userId: string) => {
    const response = await api.get(`/chat/conversation/${userId}`);
    return mapConversationResponse(response.data);
  },

  getUnreadConversations: async () => {
    const response = await api.get('/chat/unread-count');
    return response.data.map(mapConversationResponse);
  }
}
