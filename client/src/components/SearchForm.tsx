import React, { useState } from 'react';

const SearchForm = ({ onSubmit }: { onSubmit: (country: string) => void }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(inputValue);
      }}
      className="flex space-x-1 mt-4"
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter country name"
        className="p-2 w-full border border-customGray rounded-md shadow-sm focus:outline-none focus:border-blue bg-customWhite text-blue"
      />
      <button
        type="submit"
        className="bg-highlightCustomBlue text-background p-2 rounded-md hover:opacity-80 focus:opacity-80 focus:outline-none focus:ring-2 focus:ring-customLightGray"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
