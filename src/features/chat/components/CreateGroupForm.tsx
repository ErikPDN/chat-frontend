import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import ContactCard from "../../../shared/components/ContactCard";
import SearchBar from "../../../shared/components/SearchBar";
import CreateGroupNameForm from "./CreateGroupNameForm";

type viewType = "group-name" | "select-contacts";

interface CreateGroupFormProps {
  onBack: () => void;
}

interface Contact {
  id: string;
  name: string;
  status: string;
  avatar: string;
}

const mockContacts: Contact[] = [
  { id: "1", name: "Adriano", status: "Olá! Eu estou usando o WhatsApp.", avatar: "👤" },
  { id: "2", name: "Adriano2", status: "Ocupado", avatar: "👤" },
  { id: "3", name: "Adenil Vidraceiro", status: "", avatar: "👤" },
  { id: "4", name: "Adenil Vidro", status: "Em reunião", avatar: "👤" },
];


export default function CreateGroupForm(
  { onBack }: CreateGroupFormProps
) {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [view, setView] = useState<viewType>("select-contacts");

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(contactId)) {
        newSet.delete(contactId);
      } else {
        newSet.add(contactId);
      }
      return newSet;
    });
  };

  const removeContact = (contactId: string) => {
    setSelectedContacts(prev => {
      const newSet = new Set(prev);
      newSet.delete(contactId);
      return newSet;
    });
  };

  const selectedContactsList = mockContacts.filter(contact =>
    selectedContacts.has(contact.id)
  );

  return (
    <>
      {view === "select-contacts" ? (
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
              <h1 className="text-lg text-white font-semibold">
                {selectedContacts.size > 0 ? `Escolher membros (${selectedContacts.size})` : "Escolher membros"}
              </h1>
            </div>
          </div>

          <SearchBar
            placeholder="Nome, usuário ou número"
            className="w-full px-4"
            onSearch={setSearchTerm}
          />

          {selectedContactsList.length > 0 && (
            <div className="px-4 py-3 border-b border-zinc-700/50">
              <div className="flex flex-wrap gap-2">
                {selectedContactsList.map(contact => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-1.5 bg-blue-600/20 text-blue-400 rounded-full pl-3 pr-2 py-1.5"
                  >
                    <span className="text-sm font-medium">{contact.name}</span>
                    <button
                      onClick={() => removeContact(contact.id)}
                      className="hover:bg-blue-600/30 rounded-full p-0.5 transition-colors"
                      aria-label={`Remover ${contact.name}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-4 mt-4">
            {filteredContacts.length > 0 ? (
              <div>
                {filteredContacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    id={contact.id}
                    name={contact.name}
                    status={contact.status}
                    avatar={contact.avatar}
                    showCheckbox={true}
                    isSelected={selectedContacts.has(contact.id)}
                    onClick={() => toggleContactSelection(contact.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-400">
                <p>Nenhum contato encontrado</p>
              </div>
            )}
          </div>

          <div className="flex justify-end p-4">
            <button
              onClick={() => setView("group-name")}
              className="text-white bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed transition-all font-bold px-4 py-2 rounded-lg cursor-pointer"
            >
              {selectedContacts.size === 0 ? "Pular" : "Avançar"}
            </button>
          </div>
        </div>
      ) : (
        <CreateGroupNameForm
          onBack={() => setView("select-contacts")}
        />
      )}
    </>
  )
}
