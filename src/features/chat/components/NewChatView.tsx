import { ArrowLeft, UserPlus, Users } from "lucide-react";
import { useState, useMemo } from "react";
import ContactCard from "../../../shared/components/ContactCard";
import SearchBar from "../../../shared/components/SearchBar";
import AddContactForm from "../../contact/components/AddContactForm";
import CreateGroupForm from "../../group/components/CreateGroupForm";
import { useContacts } from "../../contact/hooks/useContacts";
import type { Contact } from "../../contact/types/contact.types";

type SidebarView = "default" | "add-contact" | "add-group";

interface NewChatViewProps {
  onBack: () => void;
  onSelectContact: (contact: Contact) => void;
}

export default function NewChatView({
  onBack,
  onSelectContact,
}: NewChatViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<SidebarView>("default");
  const { contacts, isLoading } = useContacts();

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.contactId.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
      .sort((a, b) => a.nickname.localeCompare(b.nickname));
  }, [contacts, searchTerm]);

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
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-zinc-400">
                <p>Carregando contatos...</p>
              </div>
            ) : filteredContacts.length > 0 ? (
              <div>
                <p className="text-zinc-400 text-xs font-semibold px-4 py-3 uppercase">
                  Contatos
                </p>
                {filteredContacts.map((contact) => (
                  <ContactCard
                    key={contact._id}
                    id={contact._id}
                    name={contact.nickname}
                    status={contact.contactId.email}
                    avatar={contact.contactId.avatar || "👤"}
                    onClick={() => onSelectContact(contact)}
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
