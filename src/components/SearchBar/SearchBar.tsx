import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Buscar Pokémon...",
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <form className="flex w-full md:w-auto lg:w-auto" onSubmit={handleSubmit}>
      <input
        type="text"
        className="flex-1 px-5 py-3 text-base border-2 border-gray-300 rounded-l-full outline-none transition-colors focus:border-red-400"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="px-6 py-3 text-lg bg-red-400 text-white border-none rounded-r-full cursor-pointer transition-all hover:bg-red-500 active:scale-95"
      >
        🔍
      </button>
    </form>
  );
};
