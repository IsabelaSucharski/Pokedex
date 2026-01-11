import React from "react";
import {
  Bug,
  Dark,
  Dragon,
  Electric,
  Fairy,
  Fighting,
  Fire,
  Flying,
  Ghost,
  Grass,
  Ground,
  Ice,
  Normal,
  Poison,
  Psychic,
  Rock,
  Steel,
  Water,
} from "../../assets/icons";
import {
  BugWhite,
  DarkWhite,
  DragonWhite,
  ElectricWhite,
  FairyWhite,
  FightingWhite,
  FireWhite,
  FlyingWhite,
  GhostWhite,
  GrassWhite,
  GroundWhite,
  IceWhite,
  NormalWhite,
  PoisonWhite,
  PsychicWhite,
  RockWhite,
  SteelWhite,
  WaterWhite,
} from "../../assets/icons/white";
import {
  pokemonService,
  type EvolutionChain,
} from "../../services/pokemonService";
import Modal from "../Modal/Modal";

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const typeColors: Record<string, string> = {
  normal: "bg-[#919AA2]",
  fire: "bg-[#FF9D55]",
  water: "bg-[#5090D6]",
  electric: "bg-[#F4D23C] text-gray-800",
  grass: "bg-[#63BC5A]",
  ice: "bg-[#73CEC0]",
  fighting: "bg-[#CE416B]",
  poison: "bg-[#B567CE]",
  ground: "bg-[#D97845]",
  flying: "bg-[#89AAE3]",
  psychic: "bg-[#FA7179]",
  bug: "bg-[#91C12F]",
  rock: "bg-[#C5B78C]",
  ghost: "bg-[#5269AD]",
  dragon: "bg-[#0B6DC3]",
  dark: "bg-[#5A5465]",
  steel: "bg-[#5A8EA2]",
  fairy: "bg-[#EC8FE6]",
};

const typeIcons: Record<string, { background: string; icon: string }> = {
  normal: {
    background: NormalWhite,
    icon: Normal,
  },
  fire: {
    background: FireWhite,
    icon: Fire,
  },
  water: {
    background: WaterWhite,
    icon: Water,
  },
  electric: {
    background: ElectricWhite,
    icon: Electric,
  },
  grass: {
    background: GrassWhite,
    icon: Grass,
  },
  ice: {
    background: IceWhite,
    icon: Ice,
  },
  fighting: {
    background: FightingWhite,
    icon: Fighting,
  },
  poison: {
    background: PoisonWhite,
    icon: Poison,
  },
  ground: {
    background: GroundWhite,
    icon: Ground,
  },
  flying: {
    background: FlyingWhite,
    icon: Flying,
  },
  psychic: {
    background: PsychicWhite,
    icon: Psychic,
  },
  bug: {
    background: BugWhite,
    icon: Bug,
  },
  rock: {
    background: RockWhite,
    icon: Rock,
  },
  ghost: {
    background: GhostWhite,
    icon: Ghost,
  },
  dragon: {
    background: DragonWhite,
    icon: Dragon,
  },
  dark: {
    background: DarkWhite,
    icon: Dark,
  },
  steel: {
    background: SteelWhite,
    icon: Steel,
  },
  fairy: {
    background: FairyWhite,
    icon: Fairy,
  },
};
export const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  image,
  types,
}) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [evolutionChain, setEvolutionChain] = React.useState<EvolutionChain[]>(
    []
  );
  const [loadingEvolution, setLoadingEvolution] = React.useState(false);

  const handleOpenModal = async () => {
    setOpenModal(true);
    if (evolutionChain.length === 0) {
      setLoadingEvolution(true);
      try {
        const chain = await pokemonService.getPokemonEvolutionChain(id);
        setEvolutionChain(chain);
      } catch (error) {
        console.error("Erro ao carregar cadeia de evolução:", error);
      } finally {
        setLoadingEvolution(false);
      }
    }
  };
  return (
    <>
      <div
        className="flex justify-between bg-white shadow-md text-center transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-24 sm:h-28 md:h-32 rounded-2xl"
        style={{
          opacity: 1,
        }}
        onClick={handleOpenModal}
      >
        <div className="flex flex-col justify-center text-left p-4">
          <div className="text-xs text-gray-600 font-bold mb-1">
            Nº{id.toString().padStart(3, "0")}
          </div>

          <h3 className="text-sm font-bold text-gray-800 capitalize mb-2">
            {name}
          </h3>
          <div className="flex gap-1">
            {types.map((type) => (
              <span
                key={type}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold uppercase text-white ${
                  typeColors[type] || "bg-gray-500"
                }`}
              >
                <div className="flex items-center justify-center w-4 h-4 bg-white rounded-full">
                  <img
                    src={typeIcons[type]?.icon}
                    alt={type}
                    className="w-2 h-2"
                  />
                </div>
                {type}
              </span>
            ))}
          </div>
        </div>
        <div
          className={`w-32 ${
            typeColors[types[0] || ""] || "bg-gray-500"
          } flex items-center justify-center rounded-2xl overflow-hidden h-full relative`}
        >
          <img
            src={typeIcons[types[0] ?? ""]?.background || "bg-gray-500"}
            alt={types[0]}
            className="h-28 absolute opacity-50 z-index-0"
          />
          <img
            src={image}
            alt={name}
            className="w-16 h-16 object-contain relative z-index-10"
          />
        </div>
      </div>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={name}
        headerColor={typeColors[types[0] || ""] || "bg-gray-500"}
      >
        <div className="flex flex-col items-center">
          <div className="flex justify-between w-full sm:max-w-sm md:max-w-md lg:max-w-lg h-24 sm:h-28 md:h-32 rounded-2xl mb-6">
            <div className="flex flex-col justify-center text-left p-4">
              <div className="text-xs text-gray-600 font-bold mb-1">
                Nº{id.toString().padStart(3, "0")}
              </div>

              <h3 className="text-sm font-bold text-gray-800 capitalize mb-2">
                {name}
              </h3>
              <div className="flex gap-1">
                {types.map((type) => (
                  <span
                    key={type}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold uppercase text-white ${
                      typeColors[type] || "bg-gray-500"
                    }`}
                  >
                    <div className="flex items-center justify-center w-4 h-4 bg-white rounded-full">
                      <img
                        src={typeIcons[type]?.icon}
                        alt={type}
                        className="w-2 h-2"
                      />
                    </div>
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div
              className={`w-32 ${
                typeColors[types[0] || ""] || "bg-gray-500"
              } flex items-center justify-center rounded-2xl overflow-hidden h-full relative`}
            >
              <img
                src={typeIcons[types[0] ?? ""]?.background || "bg-gray-500"}
                alt={types[0]}
                className="h-28 absolute opacity-50 z-index-0"
              />
              <img
                src={image}
                alt={name}
                className="w-16 h-16 object-contain relative z-index-10"
              />
            </div>
          </div>

          {/* Evolution Chain */}
          <div className="mt-6 w-full">
            <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
              Cadeia de Evolução
            </h4>
            {loadingEvolution ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
                <span className="ml-2 text-gray-600">
                  Carregando evoluções...
                </span>
              </div>
            ) : evolutionChain.length > 0 ? (
              <div
                className={`flex items-center ${
                  evolutionChain.length > 5 ? "" : "justify-center"
                } gap-2 overflow-x-auto`}
              >
                {evolutionChain.map((pokemon, index) => (
                  <div key={pokemon.id} className="flex items-center">
                    <div className="flex flex-col items-center min-w-[80px]">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 border-2 border-gray-200">
                        <img
                          src={pokemon.image}
                          alt={pokemon.name}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-700 capitalize text-center">
                        {pokemon.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        Nº{pokemon.id.toString().padStart(3, "0")}
                      </span>
                    </div>
                    {index < evolutionChain.length - 1 && (
                      <div className="mx-2 text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4">
                <span className="text-sm">
                  Este Pokémon não possui evoluções.
                </span>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
