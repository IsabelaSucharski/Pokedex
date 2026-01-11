import React, { useEffect, useState } from "react";
import { Header, PokemonList, Subheader } from "./components";
import { Submenu } from "./components/Submenu/Submenu";
import { type Pokemon, pokemonService } from "./services/pokemonService";

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(0);

  useEffect(() => {
    loadPokemons(20, page);
  }, []);

  const loadPokemons = async (limit: number, offset: number) => {
    try {
      if (offset === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      const data = await pokemonService.getPokemons(limit, offset);
      if (!data.length) return;

      setPokemons([...pokemons, ...data]);
      setFilteredPokemons([...filteredPokemons, ...data]);
    } catch (error) {
      console.error("Erro ao carregar pokémons:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredPokemons(pokemons);
      return;
    }

    const filtered = pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
        pokemon.id.toString().includes(query)
    );
    setFilteredPokemons(filtered);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 overflow-hidden">
      <div className="fixed w-full z-10">
        <Header />
        <Subheader
          onSearch={handleSearch}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="fixed bottom-0 w-full z-10 bg-white md:hidden lg:hidden shadow-t-md">
        <Submenu activeTab={activeTab} handleTabClick={setActiveTab} />
      </div>
      <div
        className="flex-1 overflow-y-auto pt-42"
        onScroll={(e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

          if (isNearBottom && !loading && !loadingMore) {
            setPage(page + 20);
            loadPokemons(20, page + 20);
          }
        }}
        onTouchEnd={(e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          const isNearBottom = scrollTop + clientHeight >= scrollHeight - 200;

          if (isNearBottom && !loading && !loadingMore) {
            setPage(page + 20);
            loadPokemons(20, page + 20);
          }
        }}
      >
        {activeTab === "all" && (
          <>
            <PokemonList pokemons={filteredPokemons} loading={loading} />
            {loadingMore && (
              <div className="text-center text-lg text-gray-600 py-4">
                Carregando mais Pokémons...
              </div>
            )}
          </>
        )}

        {activeTab === "favorites" && (
          <div className="p-4">Favorites Tab Content</div>
        )}
      </div>
    </div>
  );
};

export default App;
