import React from 'react';

interface Props {
  value: string | undefined;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText?: string;
}

const Input: React.FC<Props> = ({
  value,
  onClick,
  onChange,
  buttonText = 'Convert',
}) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Exchange in SEK"
        className="p-2 border rounded-md shadow-sm focus:outline-none focus:border-customGray mr-1 bg-customWhite text-blue"
      />
      <button
        className="bg-highlightCustomBlue text-background p-2 rounded-md hover:opacity-80 focus:opacity-80 focus:outline-none focus:ring-2 focus:ring-customLightGray"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Input;
