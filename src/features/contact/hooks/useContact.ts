import { useEffect, useState } from 'react';
import { contactService } from '../service/contactService';
import type { Contact } from '../types/contact.types';
import { useToast } from '../../../shared/hooks/useToast';

export const useContact = (contactId: string) => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [isLoadingContact, setIsLoadingContact] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchContact = async () => {
      setIsLoadingContact(true);
      try {
        const data = await contactService.getContactById(contactId);
        setContact(data);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || 'Erro ao carregar contato';
        addToast(errorMessage, 'error');
      } finally {
        setIsLoadingContact(false);
      }
    };

    fetchContact();
  }, [contactId, addToast]);

  return { contact, isLoadingContact };
};
