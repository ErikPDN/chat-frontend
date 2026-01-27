import { useState } from "react";
import NavLayout from "./NavLayout";
import SidebarLayout from "./SidebarLayout";
import ChatWindow from "../features/chat/components/ChatWindow";
import type { Conversation } from "../features/chat/types/chat.types";

export default function AppLayout() {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-900">
      <NavLayout />
      <div className="ml-20 flex-1 flex">
        <SidebarLayout onSelectConversation={setActiveConversation} />
        <ChatWindow conversation={activeConversation} />
      </div>
    </div>
  );
}
