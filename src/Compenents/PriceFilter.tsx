import React, { useState } from 'react';

interface PriceFilterProps {
  onPriceChange: (min: number, max: number) => void;
}

function PriceFilter({ onPriceChange }: PriceFilterProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value, 10) || 0;
    setMinPrice(newMin);
    onPriceChange(newMin, maxPrice);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value, 10) || 1000;
    setMaxPrice(newMax);
    onPriceChange(minPrice, newMax);
  };

  return (
    <div>
      <label>Min:</label>
      <input type='number' value={minPrice} onChange={handleMinChange} />
      <label>Max:</label>
      <input type='number' value={maxPrice} onChange={handleMaxChange} />
    </div>
  );
}

export default PriceFilter;
