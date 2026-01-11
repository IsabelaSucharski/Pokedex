import { useEffect, useState } from "react";
import { type Pokemon, pokemonService } from "../services/pokemonService";

export const usePokemon = (limit: number = 151) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPokemons();
  }, [limit]);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pokemonService.getPokemons(limit);
      setPokemons(data);
    } catch (err) {
      setError("Erro ao carregar pokémons");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reload = () => {
    loadPokemons();
  };

  return { pokemons, loading, error, reload };
};
