import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useListsContext } from "../context/ListsContext";

const SortBy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { sortOptions, handleSortChange } = useListsContext();
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    handleSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center gap-2 ">
      <span>Sort by</span>
      <button
        className="text-white bg-slate-700 text-lg px-4 py-1 rounded-full font-medium flex items-center justify-between gap-4 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>{selectedOption}</span>
        <IoMdArrowDropdown />
      </button>

      {isOpen && (
        <div className="absolute z-20 top-full right-0 mt-2 bg-slate-700 shadow-lg rounded-lg w-40">
          {sortOptions.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBy;
