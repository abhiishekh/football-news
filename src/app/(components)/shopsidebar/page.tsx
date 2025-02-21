"use client";
import React from "react";
import { useSearch } from "@/app/context/searchContext";

// Define the type for filters
interface Filters {
  gender: string[];
  child: string[];
  category: string[];
  tshirtType: string[];
}

const ShopSidebar = () => {
  const { filters, setFilters } = useSearch();

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters((prevFilters:Filters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== value);
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }
      return updatedFilters;
    });
  };
  

  return (
    <div className="p-6 w-64 h-screen bg-[#B0E3FF] rounded-r-xl text-black overflow-y-auto">
      {/* Football Jersey Type */}
      <h1 className="text-2xl capitalize font-bold">Football Jersey</h1>
      <div className="my-2 capitalize">
        {["short sleeve shirt", "long sleeve shirt", "sleeveless tank tops", "polo"].map((type) => (
          <div key={type} className="flex gap-2">
            <input
              type="checkbox"
              checked={filters.tshirtType.includes(type)}
              onChange={() => handleFilterChange("tshirtType", type)}
            />
            <label>{type}</label>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <h1 className="text-2xl capitalize font-bold">Gender</h1>
      <div className="my-2 capitalize">
        {["male", "female"].map((gender) => (
          <div key={gender} className="flex gap-2">
            <input
              type="checkbox"
              checked={filters.gender.includes(gender)}
              onChange={() => handleFilterChange("gender", gender)}
            />
            <label>{gender}</label>
          </div>
        ))}
      </div>

      {/* Kids Filter */}
      <h1 className="text-2xl capitalize font-bold">Kids</h1>
      <div className="my-2 capitalize">
        {["boys", "girls"].map((child) => (
          <div key={child} className="flex gap-2">
            <input
              type="checkbox"
              checked={filters.child.includes(child)}
              onChange={() => handleFilterChange("child", child)}
            />
            <label>{child}</label>
          </div>
        ))}
      </div>

      {/* Sale & Offers Section */}
      <h1 className="text-2xl capitalize font-bold mt-8">Sale & Offers</h1>
    </div>
  );
};

export default ShopSidebar;
