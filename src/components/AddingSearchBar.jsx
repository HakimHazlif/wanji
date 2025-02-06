import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { options, URL_Base } from "../constants/variables";
import AddSearchQuery from "./AddSearchQuery";

const AddingSearchBar = ({ list }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("movie");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showSelector, setShowSelector] = useState(false);

  const selectorRef = useRef();
  const resultsRef = useRef();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    // Simulated search results (replace with API call)

    if (value.length > 2) {
      const queryURI = encodeURIComponent(value);

      try {
        const res = await fetch(
          `${URL_Base}search/${category}?query=${queryURI}&include_adult=false&language=en-US&page=1`,
          options
        );
        const data = await res.json();

        setResults(data.results);
        if (data?.results?.length > 0) setShowResults(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  useEffect(() => {
    function handleClosePopup(e) {
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        setShowSelector(false);
      }
      if (resultsRef.current && !resultsRef.current.contains(e.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClosePopup);

    return () => document.removeEventListener("mousedown", handleClosePopup);
  }, []);

  return (
    <div className="relative w-full">
      <div className="flex items-center border border-gray-500 outline-none bg-bluish-black rounded-full p-2 shadow-sm focus-within:border-2 focus-within:border-orange-500">
        <BiSearch size={25} className="text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Add Movie or TV Show to Your List..."
          value={query}
          onChange={handleSearch}
          className="w-full bg-transparent outline-none py-2 px-5"
        />
        <div
          className="relative flex items-center justify-between w-36 px-4 py-2 cursor-pointer rounded-full bg-slate-600"
          onClick={() => setShowSelector(!showSelector)}
        >
          <span className="capitalize">
            {category === "movie" ? "Movies" : "TV Show"}
          </span>
          <IoIosArrowDown />
          {showSelector && (
            <div
              className="absolute z-50 left-0 top-full mt-2 bg-slate-600 border border-gray-500 shadow-md rounded-md w-32 text-center"
              ref={selectorRef}
            >
              <div
                className="p-2 hover:bg-slate-700 cursor-pointer"
                onClick={() => {
                  setCategory("movie");
                  setShowSelector(false);
                }}
              >
                Movies
              </div>
              <div
                className="p-2 hover:bg-slate-700 cursor-pointer"
                onClick={() => {
                  setCategory("tv");
                  setShowSelector(false);
                }}
              >
                TV Shows
              </div>
            </div>
          )}
        </div>
      </div>
      {showResults && (
        <div
          className="absolute z-40 bg-bluish-black shadow-lg rounded-lg mt-2 border border-gray-500 grid grid-flow-row overflow-y-auto overflow-x-hidden max-h-[400px] w-full scrollbar-custom"
          ref={resultsRef}
        >
          {results?.map((result) => (
            <AddSearchQuery
              show={result}
              list={list}
              key={result.id}
              onClose={() => setShowResults(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddingSearchBar;
