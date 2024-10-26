import React from "react";

const Button = ({ text, stylish, setState, state }) => {
  function handleClick() {
    setState(state);
  }

  return (
    <button
      className={`py-3 px-5 text-white text-xl sm:text-2xl font-medium font-roboto rounded-full ${stylish}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
