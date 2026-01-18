import { ArrowLeft, UserPlus, Users, UsersPl } from "lucide-react";
import SearchBar from "../shared/components/SearchBar";
import ContactCard from "../shared/components/ContactCard";
import { useState } from "react";

interface SidebarNewChatLayoutProps {
  onBack: () => void;
  onSelectContact: (contactId: string) => void;
  onCreateGroup: () => void;
  onCreateContact: () => void;
}

const mockContacts = [
  { id: "1", name: "Adriano", status: "Olá! Eu estou usando o WhatsApp.", avatar: "👤" },
  { id: "2", name: "Adriano2", status: "Ocupado", avatar: "👤" },
  { id: "3", name: "Adenil Vidraceiro", status: "", avatar: "👤" },
  { id: "4", name: "Adenil Vidro", status: "Em reunião", avatar: "👤" },
];

export default function SidebarNewChatLayout(
  { onBack, onSelectContact, onCreateGroup, onCreateContact }: SidebarNewChatLayoutProps
) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
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
          <h1 className="text-xl text-white font-semibold">Nova Conversa</h1>
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
          onClick={onCreateContact}
        />

        <ContactCard
          name="Novo grupo"
          icon={Users}
          iconColor="blue"
          isAction
          onClick={onCreateGroup}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {filteredContacts.length > 0 ? (
          <div>
            <p className="text-zinc-400 text-xs font-semibold px-4 py-3 uppercase">Contatos</p>
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
  )
}
