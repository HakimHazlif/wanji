import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Discover = ({ image }) => {
  const [openOpetions, setOpenOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState("all");
  const dropdownRef = useRef(null);

  function handleSelectOpetion(value) {
    setSelectedValue(value);
  }

  useEffect(() => {
    function handleDropdown(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpenOptions(false);
    }

    document.addEventListener("mousedown", handleDropdown);

    return () => document.removeEventListener("mousedown", handleDropdown);
  }, []);

  return (
    <section className="">
      <div className="flex flex-col gap-20 justify-center items-center padding-x leading-relaxed text-center h-[350px] mb-[150px]">
        <p className="font-montserrat font-bold text-white text-2xl lg:px-[250px] md:px-[250px] sm:px-[150px] px-[100px] text-shadow-md">
          and explore a world of movies and shows waiting to be discovered right
          now
        </p>
        <form
          className="flex items-center bg-white rounded-3xl p-1 w-full"
          method="GET"
        >
          <label htmlFor="filter-select" className="hidden">
            Filter
          </label>
          <div
            className="w-[120px] relative z-20"
            onClick={() => setOpenOptions((prev) => !prev)}
          >
            <div className="flex justify-between items-center bg-slate-200 border-none rounded-t-3xl rounded-b-3xl py-2 px-3 text-black cursor-pointer">
              <span className="capitalize">
                {selectedValue === "tv-show" ? "TV Show" : selectedValue}
              </span>
              <IoMdArrowDropdown className="text-xl" />
            </div>
            <div
              className={`absolute top-11 left-1 bg-slate-200 z-50 rounded-md overflow-hidden w-[120px] capitalize ${
                openOpetions ? "block" : "hidden"
              }`}
              ref={dropdownRef}
            >
              <div
                className="py-2 px-3 cursor-pointer transition-colors hover:bg-slate-300"
                data-value="all"
                onClick={() => handleSelectOpetion("all")}
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
                onClick={() => handleSelectOpetion("tv-show")}
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

          <label htmlFor="search-input" className="hidden">
            Search
          </label>
          <input
            type="text"
            id="search-input"
            name="search"
            placeholder="Search here..."
            className="border-none py-2 px-4 flex-1 rounded-r-3xl rounded-l-3xl outline-none"
          />

          <button
            type="submit"
            className="bg-orange-amber hover:bg-orange-coral border-none text-white py-2 px-5 text-lg cursor-pointer rounded-t-3xl rounded-b-3xl transition-all duration-300 ease-linear w-[150px] font-semibold"
          >
            Search
          </button>
        </form>
      </div>

      <div className="absolute top-0 right-0 w-full -z-50 h-[550px]">
        <img
          src={image}
          alt="backdrop of movie"
          className="h-full w-full object-cover"
        />
        <div className="bg-[#3575f54f] h-full w-full absolute top-0 right-0 z-10"></div>
      </div>
    </section>
  );
};

export default Discover;
