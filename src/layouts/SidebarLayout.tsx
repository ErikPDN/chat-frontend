import { useState } from "react";
import SearchBar from "../shared/components/SearchBar";
import ConversationList from "../features/chat/components/ConversationList";

export default function SidebarLayout() {
  const [activeFilter, setActiveFilter] = useState<string>("Tudo");
  const filters = ["Tudo", "Mensagens Não Lidas"];

  return (
    <aside
      className="fixed lg:sticky top-0 left-0 h-screen z-30
      bg-zinc-900 shadow-lg flex flex-col w-72 lg:w-100
      border-r border-zinc-700"
    >
      <div className="h-16 flex items-center justify-start px-6">
        <h1 className="text-2xl text-white font-bold">ChatApp</h1>
      </div>

      <div className="px-2">
        <SearchBar />

        <div className="mt-4 px-4">
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1 text-sm rounded-full transition-all duration-150 border 
                  ${activeFilter === f
                    ? "bg-blue-600/25 text-blue-400 border-blue-500/40"
                    : "text-zinc-400 hover:bg-zinc-700/50 hover:text-white border-zinc-800"
                  } focus:outline-none focus:ring-0`}
                aria-pressed={activeFilter === f}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mt-4 px-2">
        <ConversationList filter={activeFilter} />
      </div>

    </aside >
  )
}
