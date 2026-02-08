import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center h-16 gap-10 mt-10">
      <Loader2 size={size} className="text-blue-500 animate-spin" />
    </div>
  );
}
