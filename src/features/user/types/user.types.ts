export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatarUrl?: string;
  isActive: boolean;
  lastSeen?: Date;
}

export interface UserConversation {
   _id: string;
  username: string;
  avatar?: string;
}
