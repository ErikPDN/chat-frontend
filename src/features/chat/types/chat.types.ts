export interface Conversation {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage?: string;
  lastMessageTimestamp?: string;
  unreadCount: number;
  isGroup: boolean;
}
