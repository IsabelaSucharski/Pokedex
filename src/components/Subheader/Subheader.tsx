import React, { useEffect } from "react";
import { pokemonService } from "../../services/pokemonService";
import { typeColors } from "../PokemonCard/PokemonCard";
import { SearchBar } from "../SearchBar";
import { Tabs } from "../Tabs";

interface SubheaderProps {
  onSearch: (query: string) => void;
  activeTab?: string;
  setActiveTab?: (tabId: string) => void;
  loadPokemons?: (
    limit: number,
    offset: number,
    type?: string
  ) => Promise<void>;
}

export const Subheader: React.FC<SubheaderProps> = ({
  onSearch,
  activeTab,
  setActiveTab,
  loadPokemons,
}) => {
  const [openFilter, setOpenFilter] = React.useState(false);
  const [filterOptions, setFilterOptions] = React.useState<string[]>([]);

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    pokemonService.getPokemonsTypes().then((types) => {
      setFilterOptions(types);
    });
  }, [openFilter]);

  const handleFilterByType = (type: string) => {
    console.log(type);
    if (loadPokemons) {
      loadPokemons(20, 0, type);
    }
  };

  return (
    <div className="flex w-full items-center justify-between px-4 py-2 bg-white shadow-md">
      <div className="hidden md:flex lg:flex">
        <Tabs
          activeTab={activeTab || "all"}
          setActiveTab={setActiveTab || (() => {})}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={toggleFilter}
        >
          Filtrar por tipo
        </button>

        {openFilter && (
          <div className="absolute top-full bg-white shadow-lg z-10 w-32 p-1">
            {/* Filter options can be added here */}
            <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {filterOptions.map((type) => (
                <li key={type} className="w-full">
                  <button
                    className={`${
                      typeColors[type] || "bg-gray-500"
                    } w-full px-2 py-1 rounded-full text-xs font-semibold uppercase text-white cursor-pointer hover:opacity-80 transition-opacity`}
                    onClick={() => handleFilterByType(type)}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <SearchBar onSearch={onSearch}></SearchBar>
      </div>
    </div>
  );
};
