import { UserIcon, X } from 'lucide-react';
import SearchBar from '../../../shared/components/SearchBar';
import { useState } from 'react';
import type { User } from '../../user/types/user.types';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import ContactCard from '../../../shared/components/ContactCard';

interface SearchMemberModalProps {
  onClose: () => void;
  loadingMembers?: boolean;
  members?: User[];
}

export default function SearchMemberModal({
  onClose,
  loadingMembers,
  members,
}: SearchMemberModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-zinc-800 rounded-2xl shadow-2xl w-full max-w-md flex flex-col p-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-md text-white font-bold mx-2">Buscar Membro</h2>

          <button
            className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700/50 cursor-pointer"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="w-full">
          <SearchBar
            placeholder="Busque pelo nome do membro"
            onSearch={handleSearch}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-2">
          {loadingMembers ? (
            <LoadingSpinner size="md" />
          ) : (
            <div className="flex flex-col space-y-2">
              {members?.map((member) => (
                <ContactCard
                  key={member.id}
                  id={member.id}
                  name={member.username}
                  status={member.email}
                  avatar={
                    member.avatarUrl || <UserIcon className="text-blue-600" />
                  }
                  hoverClass="hover:bg-zinc-700"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
