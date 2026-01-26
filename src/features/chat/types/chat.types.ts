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
