import React from "react";
import { PokemonCard } from "../PokemonCard";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

interface PokemonListProps {
  pokemons: Pokemon[];
  loading?: boolean;
  favoritesIds?: number[];
  onToggleFavorite?: (pokemon: Pokemon) => void;
}

export const PokemonList: React.FC<PokemonListProps> = ({
  pokemons,
  loading = false,
  favoritesIds = [],
  onToggleFavorite,
}) => {
  if (loading) {
    return (
      <div className="text-center text-lg text-gray-600 py-10">
        Carregando Pokémons...
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="text-center text-lg text-gray-600 py-10">
        Nenhum Pokémon encontrado
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-5 p-5 justify-center overflow-y scroll">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          types={pokemon.types}
          isFavorite={favoritesIds.includes(pokemon.id)}
          onToggleFavorite={() => onToggleFavorite?.(pokemon)}
        />
      ))}
    </div>
  );
};
