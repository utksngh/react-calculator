import React from 'react';

const Button = ({ value, onClick }) => {
  return (
    <div
      className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300"
      onClick={() => onClick(value)} // Pass the button value directly
    >
      {value}
    </div>
  );
};

export default Button;
