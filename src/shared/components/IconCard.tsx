import type { LucideIcon } from 'lucide-react';

interface IconCardProps {
  icon: LucideIcon;
  iconColor?: 'blue' | 'green' | 'zinc' | 'red';
  name: string;
  onClick: () => void;
}

const iconColorMap = {
  blue: 'text-blue-400',
  green: 'text-green-400',
  zinc: 'text-white',
  red: 'text-red-400',
};

export default function IconCard({
  icon: Icon,
  iconColor = 'zinc',
  name,
  onClick,
}: IconCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors text-left cursor-pointer"
    >
      <div
        className={`w-10 h-10 flex items-center justify-center shrink-0 ${iconColorMap[iconColor]}`}
      >
        {Icon ? <Icon /> : null}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium">{name}</p>
      </div>
    </button>
  );
}
