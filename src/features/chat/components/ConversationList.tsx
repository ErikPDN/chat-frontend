import { useState } from "react";
import ConversationCard from "./ConversationCard";
import type { Conversation } from "../types/chat.types";

interface ConversationListProps {
  filter: string;
}

export default function ConversationList({ filter }: ConversationListProps) {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Mock data
  const mockConversations: Conversation[] = [
    {
      id: "1",
      name: "Squad Alfa",
      avatarUrl: "https://via.placeholder.com/48",
      lastMessage: "Willian: @Junior OQ MR do calculo de parcelas, en...",
      lastMessageTimestamp: "2:48 PM",
      unreadCount: 0,
      isGroup: true,
    },
    {
      id: "2",
      name: "INF Comunicados",
      avatarUrl: "https://via.placeholder.com/48",
      lastMessage: "Rafael: RS2000",
      lastMessageTimestamp: "2:11 PM",
      unreadCount: 9,
      isGroup: true,
    },
    {
      id: "3",
      name: "Só os Xandão",
      avatarUrl: "https://via.placeholder.com/48",
      lastMessage: "Fabricio: Pra quem quiser ai",
      lastMessageTimestamp: "12:31 PM",
      unreadCount: 0,
      isGroup: true,
    },
    {
      id: "4",
      name: "TI Mercantil",
      avatarUrl: "https://via.placeholder.com/48",
      lastMessage: "Diogo Maier: kkk",
      lastMessageTimestamp: "8:35 AM",
      unreadCount: 0,
      isGroup: false,
    },
    {
      id: "5",
      name: "Mãe",
      avatarUrl: "https://via.placeholder.com/48",
      lastMessage: "Era pra voltar depois e esqueci",
      lastMessageTimestamp: "Ontem",
      unreadCount: 0,
      isGroup: false,
    },
  ];

  const filteredConversations = mockConversations.filter((conv) => {
    if (filter === "Mensagens Não Lidas") {
      return conv.unreadCount > 0;
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-1">
      {filteredConversations.map((conversation) => (
        <ConversationCard
          key={conversation.id}
          conversation={conversation}
          isActive={activeConversationId === conversation.id}
          onClick={() => setActiveConversationId(conversation.id)}
        />
      ))}
    </div>
  );
}
