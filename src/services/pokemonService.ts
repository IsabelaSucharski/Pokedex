const API_BASE_URL = "https://pokeapi.co/api/v2";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  speciesUrl?: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

export interface EvolutionChain {
  id: number;
  name: string;
  image: string;
}

export const pokemonService = {
  async getPokemons(
    limit: number = 20,
    offset: number = 20,
    type?: string
  ): Promise<Pokemon[]> {
    try {
      const route = type
        ? `${API_BASE_URL}/type/${type}`
        : `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;

      const response = await fetch(route);
      const data = await response.json();

      const resp = type
        ? data.pokemon.map((p: any) => p.pokemon)
        : data.results;

      console.log(resp);

      const pokemonPromises = resp.map(async (pokemon: { url: string }) => {
        console.log(pokemon);
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();

        return {
          id: pokemonData.id,
          name: pokemonData.name,
          image:
            pokemonData.sprites.other["official-artwork"].front_default ||
            pokemonData.sprites.front_default,
          types: pokemonData.types.map((t: any) => t.type.name),
        };
      });

      return await Promise.all(pokemonPromises);
    } catch (error) {
      console.error("Erro ao buscar pokémons:", error);
      throw error;
    }
  },

  async getPokemonById(id: number): Promise<PokemonDetail> {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
      const data = await response.json();

      return {
        id: data.id,
        name: data.name,
        image:
          data.sprites.other["official-artwork"].front_default ||
          data.sprites.front_default,
        types: data.types.map((t: any) => t.type.name),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((a: any) => a.ability.name),
        stats: {
          hp: data.stats[0]?.base_stat || 0,
          attack: data.stats[1]?.base_stat || 0,
          defense: data.stats[2]?.base_stat || 0,
          specialAttack: data.stats[3]?.base_stat || 0,
          specialDefense: data.stats[4]?.base_stat || 0,
          speed: data.stats[5]?.base_stat || 0,
        },
      };
    } catch (error) {
      console.error("Erro ao buscar pokémon:", error);
      throw error;
    }
  },

  async searchPokemon(query: string): Promise<Pokemon | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/pokemon/${query.toLowerCase()}`
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      return {
        id: data.id,
        name: data.name,
        image:
          data.sprites.other["official-artwork"].front_default ||
          data.sprites.front_default,
        types: data.types.map((t: any) => t.type.name),
      };
    } catch (error) {
      console.error("Erro ao buscar pokémon:", error);
      return null;
    }
  },
  async getPokemonEvolutionChain(id: number): Promise<EvolutionChain[]> {
    try {
      // Primeiro, buscar dados do Pokémon para obter a URL da espécie
      const pokemonResponse = await fetch(`${API_BASE_URL}/pokemon/${id}`);
      const pokemonData = await pokemonResponse.json();

      // Buscar dados da espécie para obter a URL da cadeia de evolução
      const speciesResponse = await fetch(pokemonData.species.url);
      const speciesData = await speciesResponse.json();

      // Buscar a cadeia de evolução
      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();

      // Extrair todos os Pokémons da cadeia de evolução
      const evolutionChain: EvolutionChain[] = [];

      const extractEvolutions = async (evolutionNode: any) => {
        // Extrair o ID da URL do Pokémon
        const pokemonId = evolutionNode.species.url.split("/").slice(-2, -1)[0];

        // Buscar detalhes do Pokémon para obter a imagem
        const pokemonDetailsResponse = await fetch(
          `${API_BASE_URL}/pokemon/${pokemonId}`
        );
        const pokemonDetails = await pokemonDetailsResponse.json();

        evolutionChain.push({
          id: parseInt(pokemonId),
          name: evolutionNode.species.name,
          image:
            pokemonDetails.sprites.other["official-artwork"].front_default ||
            pokemonDetails.sprites.front_default,
        });

        // Processar próximas evoluções recursivamente
        for (const evolution of evolutionNode.evolves_to) {
          await extractEvolutions(evolution);
        }
      };

      await extractEvolutions(evolutionData.chain);

      return evolutionChain;
    } catch (error) {
      console.error("Erro ao buscar cadeia de evolução:", error);
      return [];
    }
  },

  async getPokemonsTypes(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/type`);
      const data = await response.json();
      return data.results.map((type: { name: string }) => type.name);
    } catch (error) {
      console.error("Erro ao buscar tipos de pokémons:", error);
      throw error;
    }
  },
};
