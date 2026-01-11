/**
 * Formata o ID do Pokémon com zeros à esquerda
 */
export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, "0")}`;
}

/**
 * Capitaliza a primeira letra de uma string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converte altura de decímetros para metros
 */
export function formatHeight(height: number): string {
  return `${(height / 10).toFixed(1)}m`;
}

/**
 * Converte peso de hectogramas para quilogramas
 */
export function formatWeight(weight: number): string {
  return `${(weight / 10).toFixed(1)}kg`;
}

/**
 * Filtra pokémons por nome ou ID
 */
export function filterPokemons<T extends { id: number; name: string }>(
  pokemons: T[],
  query: string
): T[] {
  if (!query.trim()) {
    return pokemons;
  }

  const lowerQuery = query.toLowerCase();
  return pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(lowerQuery) ||
      pokemon.id.toString().includes(query)
  );
}
