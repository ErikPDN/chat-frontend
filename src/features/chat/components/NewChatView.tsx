import { ArrowLeft, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import ContactCard from "../../../shared/components/ContactCard";
import SearchBar from "../../../shared/components/SearchBar";
import AddContactForm from "./AddContactForm";
import CreateGroupForm from "./CreateGroupForm";

type SidebarView = "default" | "add-contact" | "add-group";

interface NewChatViewProps {
  onBack: () => void;
  onSelectContact: (contactId: string) => void;
}

const mockContacts = [
  { id: "1", name: "Adriano", status: "Olá! Eu estou usando o WhatsApp.", avatar: "👤" },
  { id: "2", name: "Adriano2", status: "Ocupado", avatar: "👤" },
  { id: "3", name: "Adenil Vidraceiro", status: "", avatar: "👤" },
  { id: "4", name: "Adenil Vidro", status: "Em reunião", avatar: "👤" },
];

export default function NewChatView({
  onBack,
  onSelectContact,
}: NewChatViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<SidebarView>("default");

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {view === "default" && (
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6">
            <button
              onClick={onBack}
              className="text-white hover:text-blue-400 transition-colors mr-4"
              aria-label="Voltar"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1 justify-center flex">
              <h1 className="text-lg text-white font-semibold">Nova Conversa</h1>
            </div>
          </div>

          <SearchBar
            placeholder="Pesquisar contatos"
            onSearch={setSearchTerm}
            className="w-full px-4"
          />

          <div className="px-3 py-3 space-y-1">
            <ContactCard
              name="Novo contato"
              icon={UserPlus}
              iconColor="blue"
              isAction
              onClick={() => setView("add-contact")}
            />
            <ContactCard
              name="Novo grupo"
              icon={Users}
              iconColor="blue"
              isAction
              onClick={() => setView("add-group")}
            />
          </div>

          <div className="flex-1 overflow-y-auto px-2">
            {filteredContacts.length > 0 ? (
              <div>
                <p className="text-zinc-400 text-xs font-semibold px-4 py-3 uppercase">
                  Contatos
                </p>
                {filteredContacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    id={contact.id}
                    name={contact.name}
                    status={contact.status}
                    avatar={contact.avatar}
                    onClick={() => onSelectContact(contact.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-400">
                <p>Nenhum contato encontrado</p>
              </div>
            )}
          </div>
        </div>
      )}

      {view === "add-contact" && (
        <AddContactForm
          onBack={() => setView("default")}
        />
      )}

      {view === "add-group" && (
        <CreateGroupForm
          onBack={() => setView("default")}
        />
      )}
    </>
  );
}
