import React from "react";

export const Header: React.FC = (): React.JSX.Element => {
  return (
    <header className="flex justify-center bg-gradient-to-r from-red-400 to-red-500 text-white py-4 px-5 text-center shadow-md">
      <div className="max-w-screen-xl mx-auto">
        <h1
          className="text-5xl font-bold m-0"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
        >
          Pokédex
        </h1>
        <p className="text-lg mt-2 mb-0 opacity-90">Seus Pokémons favoritos!</p>
      </div>
    </header>
  );
};
