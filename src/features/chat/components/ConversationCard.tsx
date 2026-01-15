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
      className={`w-full px-3 py-3 flex gap-3 rounded-lg transition-all duration-150 
        ${isActive
          ? "bg-zinc-700/50"
          : "hover:bg-zinc-800/50"
        }`}
    >
      <img
        src={conversation.avatarUrl}
        alt={conversation.name}
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0 text-left">
        <div className="flex justify-between items-center">
          <h3 className="text-white cont-medium truncate">
            {conversation.name}
          </h3>
          <span className="text-sm text-zinc-400 ml-2">
            {/* TODO: converter para Date dnv e formater para string*/}
            {conversation.lastMessageTimestamp}
          </span>
          <p className="text-zinc-400 text-sm truncate">
            {conversation.lastMessage}
          </p>

          {conversation.unreadCount > 0 && (
            <div className="flex-shrink-0 flex items-center">
              <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {conversation.unreadCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
