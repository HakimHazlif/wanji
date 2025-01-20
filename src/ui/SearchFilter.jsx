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
    <>
      <label htmlFor="filter-select" className="hidden">
        Filter
      </label>
      <div
        ref={dropdownRef}
        className="w-[120px] relative z-40"
        onClick={() => setOpenOptions((prev) => !prev)}
      >
        <div className="flex justify-between items-center bg-slate-200 border-none rounded-t-3xl rounded-b-3xl py-2 px-3 text-black cursor-pointer">
          <span className="capitalize">
            {selectedValue === "tv" && "TV Show"}
            {selectedValue === "multi" && "All"}
            {selectedValue !== "tv" &&
              selectedValue !== "multi" &&
              selectedValue}
          </span>
          <IoMdArrowDropdown className="text-xl" />
        </div>
        <div
          className={`absolute top-11 left-1 bg-slate-200 z-50 rounded-md overflow-hidden w-[120px] capitalize ${
            openOpetions ? "block" : "hidden"
          }`}
        >
          <div
            className="py-2 px-3 cursor-pointer transition-colors hover:bg-slate-300"
            data-value="all"
            onClick={() => handleSelectOpetion("multi")}
          >
            All
          </div>
          <div
            className="py-2 px-3 cursor-pointer transition-colors hover:bg-slate-300"
            data-value="movie"
            onClick={() => handleSelectOpetion("movie")}
          >
            Movie
          </div>
          <div
            className="py-2 px-3 cursor-pointer transition-colors hover:bg-slate-300"
            data-value="tv-show"
            onClick={() => handleSelectOpetion("tv")}
          >
            TV Show
          </div>
          <div
            className="py-2 px-3 cursor-pointer transition-colors hover:bg-slate-300"
            data-value="person"
            onClick={() => handleSelectOpetion("person")}
          >
            Person
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
