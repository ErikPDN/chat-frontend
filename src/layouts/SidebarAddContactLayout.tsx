import { useState, type FormEvent } from "react";
import Button from "../shared/components/Button";
import Input from "../shared/components/Input";
import { ArrowLeft } from "lucide-react";


interface SidebarNewChatLayoutProps {
  onBack: () => void;
  onContactAdded?: (contactId: string) => void;
}

export default function SidebarAddContactLayout(
  { onBack, onContactAdded }: SidebarNewChatLayoutProps
) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Adicionando contato:", formData);
      onContactAdded?.("new-contact-id");
      onBack();
    } finally {
      setLoading(false);
    }
  }

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
          <h1 className="text-xl text-white font-semibold">Novo Contato</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 p-6 gap-4">
        <Input
          type="text"
          placeholder="Id do usuário"
          value={formData.id}
          onChange={(e) =>
            setFormData({ ...formData, id: e.target.value })
          }
          className="text-white text-sm"
          required
        />

        <Input
          type="text"
          placeholder="Apelido do contato"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="text-white text-sm"
          required
        />


        <div className="flex-1" />

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onBack}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="flex-1"
          >
            {loading ? "Adicionando..." : "Adicionar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
