import { useEffect } from "react";
import { useToast } from "../../../shared/hooks/useToast";
import { contactService } from "../service/contactService";
import { useContactStore } from "../stores/useContactStore";

export const useContacts = () => {
  const { contacts, isLoading, setContacts, setLoading } = useContactStore();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const data = await contactService.getContacts();
        setContacts(data);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Erro ao carregar contatos';
        addToast(errorMessage, 'error');
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, [setContacts, setLoading, addToast]);

  return { contacts, isLoading }
}
