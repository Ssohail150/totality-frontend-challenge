// src/components/Filter.tsx
import React from 'react';

interface FilterProps {
  onFilterChange: (filter: { location?: string; priceRange?: [number, number]; bedrooms?: number }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="filter">
      <label>Location:</label>
      <select name="location" onChange={handleFilterChange}>
        <option value="">All Locations</option>
        <option value="city1">City 1</option>
        <option value="city2">City 2</option>
      </select>
      <label>Price Range:</label>
      <select name="priceRange" onChange={handleFilterChange}>
        <option value="">Any</option>
        <option value="[0,100]">Up to $100</option>
        <option value="[100,200]">$100 - $200</option>
        <option value="[200,500]">$200 - $500</option>
      </select>
      <label>Bedrooms:</label>
      <select name="bedrooms" onChange={handleFilterChange}>
        <option value="">Any</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3+</option>
      </select>
    </div>
  );
};

export default Filter;
