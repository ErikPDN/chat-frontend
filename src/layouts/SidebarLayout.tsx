import { useState } from "react";
import SearchBar from "../shared/components/SearchBar";
import ConversationList from "../features/chat/components/ConversationList";

type ConversationFilterMode = "all" | "unread";

interface SidebarLayoutProps {
  onSelectConversation?: (conversationId: string) => void;
}

const filters = [
  { label: "Tudo", mode: "all" },
  { label: "Não Lidas", mode: "unread" },
] as const;

export default function SidebarLayout({ onSelectConversation }: SidebarLayoutProps) {
  const [activeFilterMode, setActiveFilterMode] = useState<ConversationFilterMode>(
    "all"
  );

  return (
    <aside
      className="h-screen z-30
      bg-zinc-900 shadow-lg flex flex-col
      w-80 md:w-86 lg:w-96 xl:w-120
      border-r border-zinc-700 flex-shrink-0"
    >
      <div className="h-16 flex items-center justify-start px-6">
        <h1 className="text-2xl text-white font-bold">ChatApp</h1>
      </div>

      <div className="px-2">
        <SearchBar />

        <div className="mt-4 px-4">
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter.mode}
                onClick={() => setActiveFilterMode(filter.mode)}
                className={`px-3 py-1 text-sm rounded-full transition-all duration-150 border 
                  ${activeFilterMode === filter.mode
                    ? "bg-blue-600/25 text-blue-400 border-blue-500/40"
                    : "text-zinc-400 hover:bg-zinc-700/50 hover:text-white border-zinc-800"
                  } focus:outline-none focus:ring-0`}
                aria-pressed={activeFilterMode === filter.mode}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mt-4 px-2">
        <ConversationList filterMode={activeFilterMode} onSelectConversation={onSelectConversation} />
      </div>

    </aside >
  )
}
