import { Search, MoreVertical, Send } from "lucide-react";
import { useState } from "react";
import { useMessage } from "../hooks/useMessage";
import { useAuthStore } from "../../auth/stores/useAuthStore";
import type { Conversation } from "../types/chat.types";

interface ChatWindowProps {
  conversation?: Conversation | null;
}

export default function ChatWindow({ conversation }: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState("");
  const { user } = useAuthStore();
  const { messages, isLoading } = useMessage({
    conversationId: conversation?.id || null,
    isGroup: conversation?.isGroup || false
  });

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-900">
        <div className="text-center text-zinc-500">
          <p className="text-lg text-white mb-2 font-bold">Selecione uma conversa</p>
          <p className="text-sm">Escolha uma conversa na lista para começar a mensagens</p>
        </div>
      </div>
    );
  }

  const handleSend = () => {
    if (messageInput.trim()) {
      // TODO: Enviar mensagem
      console.log("Enviando:", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-900">
      <header className="h-16 bg-zinc-800 border-b border-zinc-700 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-medium text-sm">
              {conversation.name.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <h2 className="text-white font-medium text-base truncate">{conversation.name}</h2>
            <p className="text-xs text-zinc-400 truncate">
              {conversation.isGroup ? "Grupo" : "Conversa direta"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700/50"
            title="Pesquisar"
          >
            <Search size={20} />
          </button>
          <button
            className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700/50"
            title="Mais opções"
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-10 py-6 bg-zinc-900/50">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-zinc-400">Carregando mensagens...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-zinc-400">Nenhuma mensagem ainda. Seja o primeiro a enviar!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {messages.map((message) => {
              const isMine = message.senderId === user?.id || message.senderId === user?.id;
              return (
                <div
                  key={message.id}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-md px-3 py-2 rounded-lg ${isMine
                      ? "bg-blue-700 text-white"
                      : "bg-zinc-700 text-white"
                      }`}
                  >
                    {!isMine && conversation.isGroup && (
                      <p className="text-xs font-semibold text-green-400 mb-1">
                        {message.senderName || "Desconhecido"}
                      </p>
                    )}
                    <div className="flex items-end gap-2">
                      <p className="text-sm break-words flex-1">{message.content}</p>
                      <span className="text-xs text-zinc-300 flex-shrink-0 self-end">
                        {new Date(message.createdAt).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <footer className="h-16 bg-zinc-800 border-t border-zinc-700 flex items-center gap-2 px-4 flex-shrink-0">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Digite uma mensagem"
          className="flex-1 bg-zinc-700 border-none rounded-lg px-4 py-2 text-white placeholder-zinc-400 text-sm focus:outline-none"
        />

        <button
          onClick={handleSend}
          disabled={!messageInput.trim()}
          className="text-blue-500 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-zinc-700/50 disabled:text-zinc-600 disabled:cursor-not-allowed"
          title="Enviar"
        >
          <Send size={24} />
        </button>
      </footer>
    </div>
  );
}
