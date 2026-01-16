import { UserIcon } from "lucide-react";
import type { Conversation } from "../types/chat.types";

interface ConversationCardProps {
  conversation: Conversation;
  isActive?: boolean;
  onClick: () => void;
}

export default function ConversationCard({
  conversation,
  isActive = false,
  onClick,
}: ConversationCardProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-pressed={isActive}
      className={`w-full px-3 py-3 flex gap-3 rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900
        ${isActive
          ? "bg-zinc-700/50"
          : "hover:bg-zinc-800/50"
        }`}
    >
      {conversation.avatarUrl ? (
        <img
          src={conversation.avatarUrl}
          alt={conversation.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-6 h-6 text-zinc-400" />
        </div>
      )}

      <div className="flex-1 min-w-0 text-left">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium truncate">
            {conversation.name}
          </h3>

          {/* TODO: converter para Date dnv e formater para string*/}
          {conversation.unreadCount > 0 ? (
            <span className="text-xs text-blue-400 ml-2">
              {conversation.lastMessageTimestamp}
            </span>
          ) : (
            <span className="text-xs text-zinc-400 ml-2">
              {conversation.lastMessageTimestamp}
            </span>
          )}

        </div>
        <div className="flex justify-between items-center mt-1 gap-2">
          <p className="text-zinc-400 text-sm truncate">
            {conversation.lastMessage}
          </p>

          {conversation.unreadCount > 0 && (
            <div className="flex-shrink-0 flex items-center">
              <span className="bg-blue-500 text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center text-center">
                {conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
              </span>
            </div>
          )}

        </div>
      </div>
    </button>
  )
}
