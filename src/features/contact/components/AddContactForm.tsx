import { ArrowLeft } from "lucide-react";
import { type FormEvent } from "react";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import { useContactStore } from "../stores/useContactStore";
import { useAddContact } from "../hooks/useAddContact";

interface AddContactFormProps {
  onBack: () => void;
  onContactAdded?: (contactId: string) => void;
}

export default function AddContactForm(
  { onBack, onContactAdded }: AddContactFormProps
) {
  const { formData, errors, isLoading, addContact, handleChange } = useAddContact();
  const addContactToStore = useContactStore((state) => state.addContact);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const contact = await addContact();

    if (contact) {
      addContactToStore(contact);
      onContactAdded?.(contact._id);
      onBack();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-16 flex items-center px-6">
        <button
          onClick={onBack}
          className="text-white hover:text-blue-400 transition-colors"
          aria-label="Voltar"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 justify-center flex">
          <h1 className="text-lg text-white font-semibold">Novo Contato</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 p-6 gap-4">
        <Input
          id="contactId"
          name="contactId"
          type="text"
          label="ID do Usuário"
          placeholder="ID do usuário"
          value={formData.userId}
          onChange={handleChange}
          error={errors.userId}
          disabled={isLoading}
          autoFocus
          className="text-white"
        />

        <Input
          id="nickname"
          name="nickname"
          type="text"
          label="Apelido"
          placeholder="Apelido do contato"
          value={formData.nickname}
          onChange={handleChange}
          error={errors.nickname}
          disabled={isLoading}
          className="text-white"

        />

        <div className="flex-1" />

        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onBack}
            className="flex-1"
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            className="flex-1"
          >
            Adicionar
          </Button>
        </div>
      </form>
    </div>
  );
}
