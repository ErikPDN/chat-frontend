import { Search, MoreVertical, Paperclip, Smile, Send } from "lucide-react";
import { useState } from "react";

interface ChatWindowProps {
  conversationId?: string | null;
}

export default function ChatWindow({ conversationId }: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState("");

  // Mock data
  const conversation = {
    id: "1",
    name: "Squad Alfa",
    avatarUrl: "",
    members: "Gustavo, Isadora, Junior, ...",
  };

  const messages = [
    {
      id: "1",
      senderId: "user1",
      senderName: "Willian",
      text: "beleza",
      timestamp: "17:44",
      isMine: false,
    },
    {
      id: "2",
      senderId: "user2",
      senderName: "Renan",
      text: "Junior OQ",
      timestamp: "17:50",
      isMine: false,
    },
    {
      id: "3",
      senderId: "user2",
      senderName: "Renan",
      text: "pra fazer feedback",
      timestamp: "17:50",
      isMine: false,
    },
    {
      id: "4",
      senderId: "user2",
      senderName: "Renan",
      text: "se for positivo tenho horário, se for negativo tenho dentista marcado",
      timestamp: "19:01",
      isMine: false,
    },
    {
      id: "5",
      senderId: "me",
      senderName: "Você",
      text: "Vou verificar e te retorno",
      timestamp: "19:15",
      isMine: true,
    },
  ];

  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-900">
        <div className="text-center text-zinc-500">
          <p className="text-lg mb-2">Selecione uma conversa</p>
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
            <span className="text-white font-medium text-sm">SA</span>
          </div>
          <div className="min-w-0">
            <h2 className="text-white font-medium text-base truncate">{conversation.name}</h2>
            <p className="text-xs text-zinc-400 truncate">{conversation.members}</p>
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
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-md px-3 py-2 rounded-lg ${message.isMine
                  ? "bg-blue-700 text-white"
                  : "bg-zinc-700 text-white"
                  }`}
              >
                {!message.isMine && (
                  <p className="text-xs font-semibold mb-1 text-green-400">
                    {message.senderName}
                  </p>
                )}
                <p className="text-sm break-words">{message.text}</p>
                <span className="text-xs text-zinc-300 mt-1 block text-right">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
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
