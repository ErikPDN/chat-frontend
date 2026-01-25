import { Users } from "lucide-react";
import type { Group } from "../../features/group/types/group.types";

interface GroupCardProps {
  group: Group;
  onClick?: () => void;
  showMemberCount?: boolean;
}

export default function GroupCard({
  group,
  onClick,
  showMemberCount = true,
}: GroupCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors text-left group"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 text-2xl">
        <Users size={24} className="text-white" />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{group.name}</p>
        {group.description && (
          <p className="text-zinc-400 text-sm truncate">{group.description}</p>
        )}
        {showMemberCount && (
          <p className="text-zinc-500 text-xs">
            {group.membersId.length} {group.membersId.length === 1 ? 'membro' : 'membros'}
          </p>
        )}
      </div>
    </button>
  );
}
