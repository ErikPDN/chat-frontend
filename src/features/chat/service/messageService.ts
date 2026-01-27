import api from "../../../shared/utils/api";
import type { Message, MessageP2PResponse, MessageGroupResponse } from "../types/chat.types";

const mapP2PResponse = (data: MessageP2PResponse, conversationId: string): Message => ({
  id: data._id,
  conversationId,
  content: data.content,
  senderId: data.senderId._id,
  senderName: data.senderId.username,
  senderAvatar: data.senderId.avatar,
  timestamp: data.createdAt,
  createdAt: data.createdAt,
});

const mapGroupResponse = (data: MessageGroupResponse, conversationId: string): Message => ({
  id: data._id,
  conversationId: conversationId || data.groupId,
  content: data.content,
  senderId: data.senderId._id,
  senderName: data.senderId.username,
  senderAvatar: data.senderId.avatar,
  timestamp: data.createdAt,
  createdAt: data.createdAt,
});

export const messageService = {
  getMessagesByConversation: async (conversationId: string, isGroup: boolean): Promise<Message[]> => {
    const endpoint = isGroup
      ? `/chat/conversations/group/${conversationId}/messages`
      : `/chat/conversations/p2p/${conversationId}/messages`;
    
    const response = await api.get(endpoint);
    
    if (isGroup) {
      return response.data.map((msg: MessageGroupResponse) => mapGroupResponse(msg, conversationId));
    }
    return response.data.map((msg: MessageP2PResponse) => mapP2PResponse(msg, conversationId));
  },

  getMessagesByP2P: async (userId: string): Promise<Message[]> => {
    const response = await api.get(`/chat/conversations/p2p/${userId}/messages`);
    return response.data.map((msg: MessageP2PResponse) => mapP2PResponse(msg, userId));
  },

  getMessagesByGroup: async (groupId: string): Promise<Message[]> => {
    const response = await api.get(`/chat/conversations/group/${groupId}/messages`);
    return response.data.map((msg: MessageGroupResponse) => mapGroupResponse(msg, groupId));
  }
}
