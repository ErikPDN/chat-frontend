import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = "Pesquise por nome ou mensagem",
  onSearch,
  className = "",
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch?.("");
  };

  return (
    <div className={`relative ${className} px-3`}>
      <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search
          size={18}
          className="text-zinc-400"
        />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className={`
          w-full py-2 pl-10 pr-10
          bg-zinc-700/50 
          rounded-lg
          text-white text-sm
          placeholder-zinc-400
          transition-all duration-200
          outline-none
          hover:bg-zinc-700
        `}
        value={searchTerm}
        onChange={handleChange}
        aria-label="Campo de busca"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            text-zinc-400 hover:text-white
            transition-colors
            p-1 rounded-full
            hover:bg-zinc-600
          "
          aria-label="Limpar busca"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
