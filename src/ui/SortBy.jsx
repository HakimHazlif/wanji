import { useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const SortBy = ({
  selectedOption,
  handleToggle,
  sortOptions,
  isOpen,
  handleSelect,
}) => {
  const popupRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const handleClosePopup = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        handleToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClosePopup);

    return () => {
      document.removeEventListener("mousedown", handleClosePopup);
    };
  }, [handleToggle]);

  return (
    <div className="relative flex items-center gap-2 ">
      <span>Sort by</span>
      <button
        ref={buttonRef}
        className="text-white bg-slate-700 text-lg px-5 py-2 rounded-full font-medium flex items-center justify-between gap-3 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation;
          handleToggle((prev) => !prev);
        }}
      >
        <span>{selectedOption}</span>
        <IoMdArrowDropdown />
      </button>

      {isOpen && (
        <ul
          className="absolute z-20 top-full right-0 mt-2 bg-slate-700 shadow-lg rounded-lg"
          ref={popupRef}
        >
          {sortOptions.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-slate-800 cursor-pointer text-white"
              onClick={() => {
                handleSelect(option);
                handleToggle(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortBy;
