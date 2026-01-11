# Pokédex

Uma aplicação Pokédex moderna construída com React e TypeScript.

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── Header/          # Componente de cabeçalho
│   ├── SearchBar/       # Barra de busca
│   ├── PokemonCard/     # Card individual do Pokémon
│   └── PokemonList/     # Lista de Pokémons
├── services/            # Serviços de API
│   └── pokemonService.ts
├── hooks/               # Custom React Hooks
│   └── usePokemon.ts
├── types/               # Definições de tipos TypeScript
│   └── pokemon.ts
├── utils/               # Funções utilitárias
│   └── helpers.ts
├── App.tsx              # Componente principal
├── App.css              # Estilos globais
└── index.ts             # Ponto de entrada

```

## 🎨 Componentes

### Header

Componente de cabeçalho da aplicação com título e subtítulo.

### SearchBar

Barra de busca para filtrar Pokémons por nome ou ID.

### PokemonCard

Card que exibe informações individuais de um Pokémon:

- ID
- Nome
- Imagem
- Tipos

### PokemonList

Lista em grid que renderiza múltiplos PokemonCards.

## 🔧 Serviços

### pokemonService

Serviço para interação com a PokéAPI:

- `getPokemons()` - Busca lista de Pokémons
- `getPokemonById()` - Busca Pokémon por ID
- `searchPokemon()` - Busca Pokémon por nome

## 🎯 Features

- ✅ Listagem de Pokémons da primeira geração
- ✅ Busca por nome ou ID
- ✅ Cards estilizados com tipos coloridos
- ✅ Design responsivo
- ✅ TypeScript para type safety

## 🚀 Próximos Passos

Para executar o projeto, você precisará:

1. Instalar React e dependências:

```bash
npm install react react-dom @types/react @types/react-dom
```

2. Configurar um bundler (Vite, Webpack, etc.)

3. Adicionar um arquivo de entrada HTML

4. Executar o servidor de desenvolvimento
