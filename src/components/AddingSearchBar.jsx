import { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { options, URL_Base } from "../services/variables";
import AddSearchQuery from "./AddSearchQuery";
import OptionsSelector from "../ui/OptionsSelector";
import { useListsContext } from "../context/ListsContext";
import useClickOutside from "../hooks/useClickOutside";

const AddingSearchBar = ({ list }) => {
  const { addingSearchBarRef } = useListsContext();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("movie");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showSelector, setShowSelector] = useState(false);

  const selectorRef = useRef();
  const resultsRef = useRef();

  function handleSelectCategory(selectedCategory) {
    setCategory(selectedCategory);
  }

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

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

  useClickOutside([
    { ref: selectorRef, setter: setShowSelector },
    { ref: resultsRef, setter: setShowResults },
  ]);

  return (
    <div className="relative w-full" id="adding-search-bar">
      <div className="flex items-center border border-gray-500 outline-none bg-bluish-black rounded-full p-1 shadow-sm focus-within:border-2 focus-within:border-orange-500">
        <BiSearch size={25} className="text-gray-400 ml-2" />
        <input
          ref={addingSearchBarRef}
          type="text"
          placeholder="Add Movie or TV Show to Your List..."
          value={query}
          onChange={handleSearch}
          className="w-full bg-transparent outline-none py-1 px-5"
        />

        <OptionsSelector
          handleToggle={() => setShowSelector((prev) => !prev)}
          handleSelect={handleSelectCategory}
          selectedOption={category === "movie" ? "Movies" : "TV Show"}
          isOpen={showSelector}
          sortOptions={["movie", "tv"]}
        />
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
