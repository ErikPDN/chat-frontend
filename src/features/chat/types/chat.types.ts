import type { UserConversation } from "../../user/types/user.types";

export interface Conversation {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: string;
  lastMessageTimestamp?: string;
  unreadCount: number;
  isGroup: boolean;
}

export interface ConversationResponse {
  _id: string;
  name: string;
  description?: string;
  lastMessage?: string;
  lastMessageTimestamp?: string;
  unreadCount: number;
  isGroup: boolean;
  avatarUrl?: string;
  membersId?: string[];
  creatorId: string;
}

export type ConversationFilterMode = 'all' | 'unread';

export interface MessageP2PResponse {
  _id: string;
  senderId: UserConversation;
  receiverId: UserConversation;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
export interface MessageGroupResponse {
  _id: string;
  groupId: string;
  senderId: UserConversation;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: string;
  createdAt: string;
}

export type MessageResponse = MessageP2PResponse | MessageGroupResponse;

export interface SendMessageRequest {
  receiverId: string;
  content: string;
}
