import React, { useEffect, useState } from "react";
import { Header, PokemonList, Subheader } from "./components";
import { Submenu } from "./components/Submenu/Submenu";
import { useFavorites } from "./hooks/useFavorites";
import { type Pokemon, pokemonService } from "./services/pokemonService";

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(0);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    loadPokemons(20, page);
  }, []);

  const loadPokemons = async (limit: number, offset: number, type?: string) => {
    try {
      if (offset === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      const data = await pokemonService.getPokemons(limit, offset, type);
      if (!data.length) return;

      if (type) {
        setIsFiltered(true);
        setPage(0);
        setPokemons(data);
        setFilteredPokemons(data);
      } else {
        setIsFiltered(false);
        setPokemons([...pokemons, ...data]);
        setFilteredPokemons([...filteredPokemons, ...data]);
      }
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
      setIsFiltered(false);
      return;
    }

    const filtered = pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
        pokemon.id.toString().includes(query)
    );
    setFilteredPokemons(filtered);
    setIsFiltered(true);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100 overflow-hidden">
      <div className="fixed w-full z-10">
        <Header />
        <Subheader
          onSearch={handleSearch}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          loadPokemons={loadPokemons}
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

          if (isNearBottom && !loading && !loadingMore && !isFiltered) {
            setPage(page + 20);
            loadPokemons(20, page + 20);
          }
        }}
        onTouchEnd={(e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          const isNearBottom = scrollTop + clientHeight >= scrollHeight - 200;

          if (isNearBottom && !loading && !loadingMore && !isFiltered) {
            setPage(page + 20);
            loadPokemons(20, page + 20);
          }
        }}
      >
        {activeTab === "all" && (
          <>
            <PokemonList
              pokemons={filteredPokemons}
              loading={loading}
              favoritesIds={favorites.map((p) => p.id)}
              onToggleFavorite={(pokemon) => toggleFavorite(pokemon)}
            />
            {loadingMore && (
              <div className="text-center text-lg text-gray-600 py-4">
                Carregando mais Pokémons...
              </div>
            )}
          </>
        )}

        {activeTab === "favorites" && (
          <>
            <PokemonList
              pokemons={favorites}
              loading={false}
              favoritesIds={favorites.map((p) => p.id)}
              onToggleFavorite={(pokemon) => toggleFavorite(pokemon)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
