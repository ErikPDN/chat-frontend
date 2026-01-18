import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface ContactCardProps {
  id?: string;
  name: string;
  status?: string;
  avatar?: string | ReactNode;
  icon?: LucideIcon;
  iconColor?: "blue" | "green" | "zinc";
  isAction?: boolean;
  onClick: () => void;
}

const iconColorMap = {
  blue: "bg-blue-600/20 group-hover:bg-blue-600/30 text-blue-400",
  green: "bg-green-600/20 group-hover:bg-green-600/30 text-green-400",
  zinc: "bg-zinc-700 group-hover:bg-zinc-600",
};

export default function ContactCard({
  name,
  status,
  avatar,
  icon: Icon,
  iconColor = "blue",
  isAction = false,
  onClick,
}: ContactCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors text-left group"
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isAction
            ? iconColorMap[iconColor]
            : "bg-zinc-700 group-hover:bg-zinc-600"
          }`}
      >
        {Icon ? <Icon size={20} /> : avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{name}</p>
        {status && <p className="text-zinc-400 text-sm truncate">{status}</p>}
      </div>
    </button>
  );
}
