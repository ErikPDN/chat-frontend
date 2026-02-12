import {
  ArrowLeft,
  Ban,
  LogOut,
  Plus,
  Search,
  User as UserIcon,
  Pencil,
} from 'lucide-react';
import ContactCard from '../../../shared/components/ContactCard';
import { useState } from 'react';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import IconCard from '../../../shared/components/IconCard';
import EditGroupModal from '../../group/components/EditGroupModal';
import { useGroup } from '../../group/hooks/useGroup';
import type { User } from '../../user/types/user.types';
interface ChatGroupSettingsUIProps {
  onBack: () => void;
  conversationId: string;
}

export default function ChatGroupSettingsUI({
  onBack,
  conversationId,
}: ChatGroupSettingsUIProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { group, isLoadingMembers } = useGroup(conversationId);

  const handleMemberModalOpen = (member: User) => () => {};
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
          <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center">
            <UserIcon size={48} className="text-blue-600" />
          </div>

          <div className="flex items-center space-x-1.5 relative">
            <h2 className="text-2xl text-white font-bold">
              {group?.name || 'Nome do Grupo'}
            </h2>

            <button
              className="absolute left-48 text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700/50 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <Pencil size={20} />
            </button>
          </div>

          <span className="text-zinc-400">Descrição do grupo</span>
        </div>

        <div className="border-0 border-t mt-6 mb-2 border-zinc-500" />

        <div className="py-3 space-y-2">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-sm font-bold text-white">
              {group?.membersId.length || 0} Membros
            </h3>

            <button className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700/50 cursor-pointer">
              <Search size={20} />
            </button>
          </div>

          <>
            {isLoadingMembers ? (
              <LoadingSpinner size="md" />
            ) : (group?.membersId?.length ?? 0) > 0 ? (
              <div className="flex flex-col space-y-2">
                {group?.membersId.map((member) => (
                  <ContactCard
                    key={member.id}
                    id={member.id}
                    name={member.username}
                    status={member.email}
                    avatar={
                      member.avatarUrl || <UserIcon className="text-blue-600" />
                    }
                    onClick={handleMemberModalOpen(member)}
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

      {isModalOpen && <EditGroupModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
