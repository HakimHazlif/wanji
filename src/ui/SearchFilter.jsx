import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const SearchFilter = ({ selectedValue, handleSelectOpetion }) => {
  const [openOpetions, setOpenOptions] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleDropdown(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpenOptions(false);
    }

    document.addEventListener("mousedown", handleDropdown);

    return () => document.removeEventListener("mousedown", handleDropdown);
  }, []);

  return (
    <div>
      <label htmlFor="filter-select" className="hidden">
        Filter
      </label>
      <div
        ref={dropdownRef}
        className="sm:w-[120px] xs:w-[100px] w-[80px] relative z-40"
        onClick={() => setOpenOptions((prev) => !prev)}
      >
        <div className="flex justify-between xs:gap-2 gap-0 items-center bg-slate-300 border-none rounded-t-3xl rounded-b-3xl py-2 xs:px-3 px-2 text-black cursor-pointer sm:text-base xs:text-sm text-xs">
          <span className="capitalize text-nowrap">
            {selectedValue === "tv" && "TV Show"}
            {selectedValue === "multi" && "All"}
            {selectedValue !== "tv" &&
              selectedValue !== "multi" &&
              selectedValue}
          </span>
          <IoMdArrowDropdown className="xs:text-xl text-lg" />
        </div>
        <div
          className={`absolute top-full right-0 text-gray-900 bg-slate-300 z-50 rounded-md overflow-hidden max-w-[140px] w-[120px] min-w-[90px] capitalize ${
            openOpetions ? "block" : "hidden"
          }`}
        >
          <div
            className="p-2 cursor-pointer transition-colors hover:bg-slate-400"
            data-value="all"
            onClick={() => handleSelectOpetion("multi")}
          >
            All
          </div>
          <div
            className="py-2 px-3 cursor-pointer transition-colors hover:bg-slate-400"
            data-value="movie"
            onClick={() => handleSelectOpetion("movie")}
          >
            Movie
          </div>
          <div
            className="py-2 px-3 cursor-pointer transition-colors hover:bg-slate-400"
            data-value="tv-show"
            onClick={() => handleSelectOpetion("tv")}
          >
            TV Show
          </div>
          <div
            className="py-2 px-3 cursor-pointer transition-colors hover:bg-slate-400"
            data-value="person"
            onClick={() => handleSelectOpetion("person")}
          >
            Person
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
