import React from "react";
import Spinner from "./Spinner";


interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  buttonFor: string;
  type?: "button" | "submit" | "reset"; // Optional prop for button type
  colour: "green" | "gray" | "red" | "blue";
  isClicked?: boolean;
}

function Button({type,onClick,buttonFor,colour,isClicked}:ButtonProps) {
  console.log("this is the color",colour)
  return (
    <div>

      <button onClick={onClick} type={type} className={`mt-8 w-full text-white ${
    colour === 'green'
      ? 'bg-green-800 hover:bg-green-900'
      : colour === 'blue'
      ? 'bg-blue-800 hover:bg-blue-900'
      : 'bg-gray-800 hover:bg-gray-900'
  }  focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}>{isClicked? <div className="flex justify-center"> <Spinner/> </div> : buttonFor}</button>
    </div>
  )
}

export default Button