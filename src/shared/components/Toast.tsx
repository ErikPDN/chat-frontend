import { useEffect } from 'react';
import { CheckCircle, X, AlertCircle } from 'lucide-react';
import type { ToastType } from '../hooks/useToast';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 1500 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success: { bg: 'bg-zinc-800', border: 'border-green-500/50', text: 'text-zinc-100', icon: <CheckCircle className="text-green-500" size={20} /> },
    error: { bg: 'bg-zinc-800', border: 'border-red-500/50', text: 'text-zinc-100', icon: <AlertCircle className="text-red-500" size={20} /> },
    warning: { bg: 'bg-zinc-800', border: 'border-yellow-500/50', text: 'text-zinc-100', icon: <AlertCircle className="text-yellow-500" size={20} /> },
  };

  const style = styles[type];

  return (
    <div className={`flex items-start gap-3 ${style.bg} ${style.border} border rounded-lg shadow-2xl p-4 pr-10 min-w-[300px] animate-in slide-in-from-right-full`}>
      {style.icon}
      <p className={`${style.text} text-sm font-medium`}>{message}</p>
      <button onClick={onClose} className="absolute top-4 right-3 text-zinc-500 hover:text-zinc-300">
        <X size={16} />
      </button>
    </div>
  );
}
