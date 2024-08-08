import React from "react";


interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  buttonFor: string;
  type?: "button" | "submit" | "reset"; // Optional prop for button type
}

function Button({type,onClick,buttonFor}:ButtonProps) {
  return (
    <div>

      <button onClick={onClick} type={type} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{buttonFor}</button>
    </div>
  )
}

export default Button