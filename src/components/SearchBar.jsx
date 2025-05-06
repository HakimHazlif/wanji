import { useEffect, useRef, useState } from "react";
import SearchFilter from "../ui/SearchFilter";
import { options, URL_Base } from "../services/variables";
import SearchItem from "../ui/SearchItem";
import { IoMdSearch } from "react-icons/io";
import Spinner from "../ui/Spinner";

const SearchBar = () => {
  // const { searchData, getSearchData } = useSearch();
  const [selectedValue, setSelectedValue] = useState("multi");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpenResults, setIsOpenResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchbarRef = useRef(null);

  function handleSelectOpetion(value) {
    setSelectedValue(value);
  }

  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  if (results.length) console.log(results);

  useEffect(() => {
    const fetchResults = async () => {
      const queryURI = encodeURIComponent(searchQuery);

      try {
        setIsLoading(true);
        const res = await fetch(
          `${URL_Base}search/${selectedValue}?query=${queryURI}&include_adult=false&language=en-US&page=1`,
          options
        );
        const data = await res.json();

        setResults(data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery.length > 2) {
      fetchResults();
      setIsOpenResults(true);
    }
  }, [searchQuery, selectedValue]);

  useEffect(() => {
    const closeResults = (e) => {
      if (searchbarRef.current && !searchbarRef.current.contains(e.target)) {
        setIsOpenResults(false);
      }
    };

    document.addEventListener("mousedown", closeResults);

    return () => document.removeEventListener("mousedown", closeResults);
  }, []);

  return (
    <>
      <div
        className="relative flex items-center bg-white rounded-3xl p-1 w-full"
        ref={searchbarRef}
      >
        <IoMdSearch className="text-slate-500 mx-2" size={30} />

        <label htmlFor="search-input" className="hidden">
          Search
        </label>
        <input
          type="text"
          id="search-input"
          name="search"
          placeholder="Search here..."
          className="border-none py-2 pl-1 pr-2 flex-1 rounded-r-3xl rounded-l-3xl outline-none text-black"
          value={searchQuery}
          onChange={handleChange}
        />
        <SearchFilter
          selectedValue={selectedValue}
          handleSelectOpetion={handleSelectOpetion}
        />
        {isOpenResults && (
          <ul className="absolute w-full h-[300px] top-full left-0 bg-slate-100 rounded-lg flex flex-col z-20 overflow-y-scroll overflow-x-hidden scrollbar-hide">
            {!isLoading ? (
              results.map((result) => (
                <SearchItem
                  key={result.id}
                  image={
                    selectedValue === "person"
                      ? result.profile_path
                      : result.poster_path
                  }
                  title={selectedValue === "movie" ? result.title : result.name}
                  originalTitle={
                    selectedValue === "movie"
                      ? result.original_title
                      : result.original_name
                  }
                  mediaType={
                    selectedValue === "multi"
                      ? result.media_type
                      : selectedValue
                  }
                  id={result.id}
                />
              ))
            ) : (
              <Spinner />
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchBar;
