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

export interface Sender {
  _id: string;
  username: string;
  avatar?: string;
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

export interface MessageResponse {
  _id: string;
  conversationId: string;
  content: string;
  senderId: Sender;
  receiverId?: Sender;
  timestamp: string;
  createdAt: string;
  isRead?: boolean;
  updatedAt?: string;
}
