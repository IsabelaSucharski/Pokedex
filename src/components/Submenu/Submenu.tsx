import React from "react";
import { tabs } from "../Tabs/Tabs";

interface SubmenuProps {
  activeTab?: string;
  handleTabClick: (tabId: string) => void;
}

export const Submenu: React.FC<SubmenuProps> = ({
  activeTab,
  handleTabClick,
}) => {
  return (
    <div className="flex gap-4 justify-between sm:justify-center w-full py-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`cursor-pointer tab-button ${
            activeTab === tab.id ? "active" : ""
          } px-4 py-2 ${activeTab === tab.id ? "text-white" : "text-blue-700"}`}
          onClick={() => handleTabClick(tab.id)}
        >
          <div className="flex flex-col items-center">
            <img
              src={tab.icon}
              alt={tab.label}
              style={{
                filter:
                  activeTab === tab.id && !activeTab.includes("all")
                    ? "brightness(0) saturate(100%) invert(19%) sepia(85%) saturate(1842%) hue-rotate(220deg) brightness(95%) contrast(91%)"
                    : "none",
              }}
            />
            {activeTab === tab.id && (
              <span className="text-[#173EA5]">{tab.label}</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};
