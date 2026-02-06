import { ArrowLeft } from 'lucide-react';

interface ChatGroupSettingsUIProps {
  onBack: () => void;
}

export default function ChatGroupSettingsUI({
  onBack,
}: ChatGroupSettingsUIProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="justify-start px-4 py-2 mt-1">
        <button
          onClick={onBack}
          className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700/50"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
    </div>
  );
}
