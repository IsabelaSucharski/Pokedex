import React from "react";
import { Pokeball, Pokeheart, Pokepin, Profile } from "../../assets/icons";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon: string;
}

interface TabsProps {
  defaultActiveTab?: string;
  activeTab?: string;
  setActiveTab?: (tabId: string) => void;
}

export const tabs: Tab[] = [
  {
    id: "all",
    label: "Pokedéx",
    content: <div>Pokedéx</div>,
    icon: Pokeball,
  },
  {
    id: "favorites",
    label: "Favoritos",
    content: <div>Favorites Tab</div>,
    icon: Pokeheart,
  },
  {
    id: "pin",
    label: "Pin",
    content: <div>Pin Tab</div>,
    icon: Pokepin,
  },
  {
    id: "profile",
    label: "Profile",
    content: <div>Profile Tab</div>,
    icon: Profile,
  },
];

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tabId: string) => {
    if (setActiveTab) {
      setActiveTab(tabId);
    }
  };

  return (
    <>
      <div className="inline-flex gap-4">
        <div className="inline-flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`cursor-pointer tab-button ${
                activeTab === tab.id ? "active" : ""
              } px-3 py-1 ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500 text-blue-700 font-semibold"
                  : "border-b-2 border-gray-500 text-gray-700"
              } hover:text-blue-700 transition-colors border-b-2 hover:border-blue-500`}
              onClick={() => handleTabClick(tab.id)}
            >
              <div className="inline-flex items-center gap-2">
                <img
                  src={tab.icon}
                  alt={tab.label}
                  className="w-5 h-5"
                  style={{
                    filter:
                      activeTab === tab.id && !activeTab.includes("all")
                        ? "brightness(0) saturate(100%) invert(19%) sepia(85%) saturate(1842%) hue-rotate(220deg) brightness(95%) contrast(91%)"
                        : "none",
                  }}
                />
                {tab.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
