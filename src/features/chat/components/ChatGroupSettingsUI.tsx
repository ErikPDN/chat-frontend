import {
  ArrowLeft,
  Ban,
  LogOut,
  Plus,
  Search,
  User,
  Pencil,
} from 'lucide-react';
import { useContacts } from '../../contact/hooks/useContacts';
import { useFilteredContacts } from '../../../shared/hooks/useFilteredContacts';
import ContactCard from '../../../shared/components/ContactCard';
import { useState } from 'react';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import IconCard from '../../../shared/components/IconCard';
import type { Contact } from '../../contact/types/contact.types';

interface ChatGroupSettingsUIProps {
  onBack: () => void;
  onSelectContact?: (contact: Contact) => void;
}

export default function ChatGroupSettingsUI({
  onBack,
  onSelectContact,
}: ChatGroupSettingsUIProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { contacts, isLoading } = useContacts();
  const filteredContacts = useFilteredContacts({ searchTerm, contacts });

  const handleEditGroup = () => {
    // TODO: Implementar lógica para editar nome e descrição do grupo
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto px-2">
      <div className="justify-start px-2 py-2 mt-1">
        <button
          onClick={onBack}
          className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700/50 cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="mx-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-zinc-700 flex items-center justify-center">
            <User size={48} className="text-zinc-400" />
          </div>

          <div className="flex items-center space-x-1.5 relative">
            <h2 className="text-2xl text-white font-bold">Nome do Grupo</h2>

            <button
              className="absolute left-48 text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700/50 cursor-pointer"
              onClick={handleEditGroup}
            >
              <Pencil size={20} />
            </button>
          </div>

          <span className="text-zinc-400">Descrição do grupo</span>
        </div>

        <div className="border-0 border-t mt-6 mb-2 border-zinc-500" />

        <div className="py-3 space-y-2">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-sm font-bold text-white">3 Membros</h3>

            <button className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700/50 cursor-pointer">
              <Search size={20} />
            </button>
          </div>

          <>
            {isLoading ? (
              <LoadingSpinner size="md" />
            ) : filteredContacts.length > 0 ? (
              <div className="flex flex-col space-y-2">
                {filteredContacts.map((contact) => (
                  <ContactCard
                    key={contact._id}
                    id={contact._id}
                    name={contact.nickname}
                    status={contact.contactId.email}
                    avatar={contact.contactId.avatar || '👤'}
                    onClick={() => onSelectContact?.(contact)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-400">
                <p>Nenhum contato encontrado</p>
              </div>
            )}
          </>

          <div className="border-0 border-t mt-6 mb-3 border-zinc-500" />

          <div className="">
            <IconCard
              icon={Plus}
              iconColor="blue"
              name="Adicionar membros"
              onClick={() => {}}
            />

            <IconCard
              icon={LogOut}
              iconColor="red"
              name="Sair do grupo"
              onClick={() => {}}
            />

            <IconCard
              icon={Ban}
              iconColor="red"
              name="Bloquear grupo"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
