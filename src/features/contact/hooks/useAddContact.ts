import { useState } from "react";
import type { AddContactRequest, Contact } from "../types/contact.types"
import { useToast } from "../../../shared/hooks/useToast";
import { contactService } from "../service/contactService";

interface AddContactErrors {
  contactId?: string;
  nickname?: string;
}

export const useAddContact = () => {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AddContactRequest>({
    contactId: "",
    nickname: "",
  })
  const [errors, setErrors] = useState<AddContactErrors>({});

  const validateForm = (): boolean => {
    const newErrors: AddContactErrors = {};

    if (!formData.contactId.trim()) {
      newErrors.contactId = "ID do usuário é obrigatório";
    }
    if (!formData.nickname.trim()) { newErrors.nickname = "Apelido é obrigatório"; } else if (formData.nickname.length < 2) {
      newErrors.nickname = "Apelido deve ter ao menos 2 caracteres";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  }

  const addContact = async (): Promise<Contact | null> => {
    if (!validateForm()) return null;

    setIsLoading(true);

    try {
      const contact = await contactService.addContact(formData.contactId, formData.nickname);
      addToast('Contato adicionado com sucesso!', 'success');
      setFormData({ contactId: "", nickname: "" });

      return contact;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erro ao adicionar contato';
      addToast(errorMessage, 'error');
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  const setField = (name: keyof AddContactRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setField(name as keyof AddContactRequest, value);
  };

  return {
    formData,
    errors,
    isLoading,
    addContact,
    handleChange,
    setField,
  };

}
