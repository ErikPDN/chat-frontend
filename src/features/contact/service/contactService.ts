import api from "../../../shared/utils/api";
import type { Contact, UpdateContactRequest } from "../types/contact.types";

export const contactService = {
  addContact: async (contactId: string, nickname: string): Promise<Contact> => {
    const response = await api.post('/contacts', { contactId, nickname });
    return response.data;
  },

  getContacts: async (): Promise<Contact[]> => {
    const response = await api.get('/contacts');
    return response.data;
  },

  updateContactNickname: async (contactId: string, data: UpdateContactRequest): Promise<Contact> => {
    const response = await api.patch(`/contacts/${contactId}`, { nickname: data.nickname });
    return response.data;
  },

  removeContact: async (contactId: string): Promise<void> => {
    await api.delete(`/contacts/${contactId}`);
  },

  blockContact: async (contactId: string): Promise<void> => {
    await api.post(`/contacts/${contactId}/block`);
  },

  unblockContact: async (contactId: string): Promise<void> => {
    await api.post(`/contacts/${contactId}/unblock`);
  }
}
