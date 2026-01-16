import { useState } from "react";
import ConversationCard from "./ConversationCard";
import type { Conversation } from "../types/chat.types";

type ConversationFilterMode = "all" | "unread";

interface ConversationListProps {
  filterMode: ConversationFilterMode;
}

export default function ConversationList({ filterMode }: ConversationListProps) {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Mock data
  const mockConversations: Conversation[] = [
    {
      id: "1",
      name: "Squad Alfa",
      avatarUrl: "",
      lastMessage: "Willian: @Junior OQ MR do calculo de parcelas, en...",
      lastMessageTimestamp: "2:48 PM",
      unreadCount: 0,
      isGroup: true,
    },
    {
      id: "2",
      name: "INF Comunicados",
      avatarUrl: "",
      lastMessage: "Rafael: RS2000",
      lastMessageTimestamp: "2:11 PM",
      unreadCount: 9,
      isGroup: true,
    },
    {
      id: "3",
      name: "Só os Xandão",
      avatarUrl: "",
      lastMessage: "Fabricio: Pra quem quiser ai",
      lastMessageTimestamp: "12:31 PM",
      unreadCount: 0,
      isGroup: true,
    },
    {
      id: "4",
      name: "TI Mercantil",
      avatarUrl: "",
      lastMessage: "Diogo Maier: kkk",
      lastMessageTimestamp: "8:35 AM",
      unreadCount: 0,
      isGroup: false,
    },
    {
      id: "5",
      name: "Mãe",
      avatarUrl: "",
      lastMessage: "Era pra voltar depois e esqueci",
      lastMessageTimestamp: "Ontem",
      unreadCount: 0,
      isGroup: false,
    },
  ];

  const filteredConversations = mockConversations.filter((conv) =>
    filterMode === "unread" ? conv.unreadCount > 0 : true
  );

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
