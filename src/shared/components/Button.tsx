import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export default function Button({
  variant = 'primary',
  isLoading,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const base = 'font-bold py-3 rounded-lg w-full flex justify-center items-center transition-all cursor-pointer';

  const variants: Record<string, string> = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-zinc-700 disabled:cursor-not-allowed',
    secondary: 'bg-zinc-700 hover:bg-zinc-600 text-white',
  };

  return (
    <button
      disabled={isLoading || disabled}
      className={clsx(base, variants[variant], className)}
      {...rest}
    >
      {isLoading ? (
        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
