import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, className, id, ...rest }: InputProps) {
  const inputClasses = 'w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all';

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <input id={id} className={clsx(inputClasses, className)} {...rest} />
    </div>
  );
}
