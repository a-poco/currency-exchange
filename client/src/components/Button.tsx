import React from 'react';

type ButtonProps = {
  name: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  name,
  disabled,
  className,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`bg-[#90b4ce] text-background px-2 rounded-md cursor-pointer ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {name}
    </button>
  );
};

export default Button;
