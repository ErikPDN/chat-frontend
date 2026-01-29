import { useState } from "react";
import ConversationCard from "./ConversationCard";
import { useFilteredConversations } from "../hooks/useFilteredConversation";
import type { ConversationFilterMode, Conversation } from "../types/chat.types";

interface ConversationListProps {
  filterMode: ConversationFilterMode;
  onSelectConversation?: (conversation: Conversation) => void;
}

export default function ConversationList({ filterMode, onSelectConversation }: ConversationListProps) {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const { conversations, isLoading } = useFilteredConversations(filterMode);

  if (isLoading) {
    return <div className="text-zinc-400 text-center py-4">Carregando conversas...</div>;
  }

  if (conversations.length === 0) {
    return <div className="text-zinc-400 text-center py-4">Nenhuma conversa encontrada</div>;
  }

  return (
    <div className="flex flex-col gap-1">
      {conversations.map((conversation) => (
        <ConversationCard
          key={conversation.id}
          conversation={conversation}
          isActive={activeConversationId === conversation.id}
          onClick={() => {
            setActiveConversationId(conversation.id);
            onSelectConversation?.(conversation);
          }}
        />
      ))}
    </div>
  );
}
