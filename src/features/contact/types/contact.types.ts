export interface Contact {
  _id: string;
  userId: string;
  contactId: ContactUser;
  nickname: string;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

// TODO: mudar contactId para userId
export interface AddContactRequest {
  contactId: string;
  nickname: string;
}

export interface UpdateContactRequest {
  nickname?: string;
}
