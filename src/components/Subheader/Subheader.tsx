import React from "react";
import { SearchBar } from "../SearchBar";
import { Tabs } from "../Tabs";

interface SubheaderProps {
  onSearch: (query: string) => void;
  activeTab?: string;
  setActiveTab?: (tabId: string) => void;
}

export const Subheader: React.FC<SubheaderProps> = ({
  onSearch,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex w-full items-center justify-between px-4 py-2 bg-white shadow-md">
      <div className="hidden md:flex lg:flex">
        <Tabs
          activeTab={activeTab || "all"}
          setActiveTab={setActiveTab || (() => {})}
        />
      </div>
      <SearchBar onSearch={onSearch}></SearchBar>
    </div>
  );
};
