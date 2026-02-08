import { useMemo } from 'react';
import type { Contact } from '../../features/contact/types/contact.types';

interface UseFilteredContactsOptions {
  searchTerm: string;
  contacts: Contact[];
}

export function useFilteredContacts({
  searchTerm,
  contacts,
}: UseFilteredContactsOptions): Contact[] {
  return useMemo(() => {
    return contacts
      .filter(
        (contact) =>
          contact.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.contactId.username
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => a.nickname.localeCompare(b.nickname));
  }, [contacts, searchTerm]);
}
