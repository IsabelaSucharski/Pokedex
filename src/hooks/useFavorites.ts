import { useEffect, useMemo, useState } from "react";
import type { Pokemon } from "../services/pokemonService";

const STORAGE_KEY = "pokedex:favorites";

function loadFromStorage(): Pokemon[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Pokemon[]) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Pokemon[]>(() =>
    loadFromStorage()
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore write errors (e.g., privacy mode)
    }
  }, [favorites]);

  const favoritesSet = useMemo(
    () => new Set(favorites.map((f) => f.id)),
    [favorites]
  );

  const isFavorite = (id: number) => favoritesSet.has(id);

  const addFavorite = (pokemon: Pokemon) => {
    setFavorites((prev) =>
      favoritesSet.has(pokemon.id) ? prev : [...prev, pokemon]
    );
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const toggleFavorite = (pokemon: Pokemon) => {
    if (favoritesSet.has(pokemon.id)) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return { favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite };
}
