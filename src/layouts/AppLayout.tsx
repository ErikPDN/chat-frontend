import { useState } from "react";
import NavLayout from "./NavLayout";
import SidebarLayout from "./SidebarLayout";
import ChatWindow from "../features/chat/components/ChatWindow";

export default function AppLayout() {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-900">
      <NavLayout />
      <div className="ml-20 flex-1 flex">
        <SidebarLayout onSelectConversation={setActiveConversationId} />
        <ChatWindow conversationId={activeConversationId} />
      </div>
    </div>
  );
}
