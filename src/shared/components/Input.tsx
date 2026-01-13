import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  trailingIcon?: ReactNode;
};

export default function Input({ label, className, id, error, trailingIcon, ...rest }: InputProps) {
  const inputClasses = clsx(
    'w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all',
    error && 'border-red-500 focus:ring-red-500',
    trailingIcon && 'pr-10'
  );

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          className={clsx(inputClasses, className)}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
        {trailingIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 top-7">
            {trailingIcon}
          </div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-red-400 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
