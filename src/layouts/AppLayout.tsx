import { useState } from "react";
import NavLayout from "./NavLayout";
import SidebarLayout from "./SidebarLayout";
import ChatWindow from "../features/chat/components/ChatWindow";
import type { Conversation } from "../features/chat/types/chat.types";
import { useConversationStore } from "../features/chat/stores/useConversationStore";
import { useToast } from "../shared/hooks/useToast";
import { conversationService } from "../features/chat/service/conversationService";
import type { Contact } from "../features/contact/types/contact.types";

export default function AppLayout() {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const { addConversation, updateConversation, hasUnreadConversations } = useConversationStore();
  const { addToast } = useToast();

  const handleSelectConversation = async (conversation: Conversation) => {
    try {
      if (hasUnreadConversations(conversation.id)) {
        await conversationService.markAsRead(conversation.id);
        updateConversation(conversation.id, { unreadCount: 0 });
      }
      setActiveConversation(conversation);
    } catch {
      addToast('Erro ao marcar conversa como lida', 'error');
      setActiveConversation(conversation);
    }
  }

  const handleSelectContact = async (contact: Contact) => {
    const otherUserId = contact.contactId._id; // TODO: ajustar essa estrutura futuramente

    const conversation: Conversation = {
      id: otherUserId,
      name: contact.nickname || contact.contactId.username,
      avatarUrl: contact.contactId.avatar || "",
      lastMessage: "",
      lastMessageTimestamp: "",
      unreadCount: 0,
      isGroup: false,
    }

    addConversation(conversation);
    updateConversation(conversation.id, { unreadCount: 0 });
    setActiveConversation(conversation);
  }


  return (
    <div className="flex h-screen overflow-hidden bg-zinc-900">
      <NavLayout />
      <div className="ml-20 flex-1 flex">
        <SidebarLayout
          onSelectConversation={handleSelectConversation}
          onSelectContact={handleSelectContact}
        />
        <ChatWindow conversation={activeConversation} />
      </div>
    </div>
  );
}
