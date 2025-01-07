import { useEffect, useState } from "react";
import SearchFilter from "../../ui/SearchFilter";
import { options, URL_Base } from "../../constants/variables";
import SearchItem from "../../ui/SearchItem";

const SearchBar = () => {
  // const { searchData, getSearchData } = useSearch();
  const [selectedValue, setSelectedValue] = useState("multi");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.length > 3) {
      const fetchResults = async () => {
        const queryURI = encodeURIComponent(searchQuery);

        try {
          const res = await fetch(
            `${URL_Base}search/${selectedValue}?query=${queryURI}&include_adult=false&language=en-US&page=1`,
            options
          );
          const data = await res.json();

          console.log(data);
          setResults(data.results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      fetchResults();
    }
  }, [debouncedQuery, searchQuery, selectedValue]);

  function handleSelectOpetion(value) {
    setSelectedValue(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!searchQuery) return;

    // const results = await getQuerySearch(selectedValue, searchQuery);
  }

  return (
    <>
      <form
        className="relative flex items-center bg-white rounded-3xl p-1 w-full"
        method="GET"
        onSubmit={handleSubmit}
      >
        <SearchFilter
          selectedValue={selectedValue}
          handleSelectOpetion={handleSelectOpetion}
        />
        <label htmlFor="search-input" className="hidden">
          Search
        </label>
        <input
          type="text"
          id="search-input"
          name="search"
          placeholder="Search here..."
          className="border-none py-2 px-4 flex-1 rounded-r-3xl rounded-l-3xl outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          type="submit"
          className="bg-orange-amber hover:bg-orange-coral border-none text-white py-2 px-5 text-lg cursor-pointer rounded-t-3xl rounded-b-3xl transition-all duration-300 ease-linear w-[150px] font-semibold"
        >
          Search
        </button>
        {results.length > 0 && (
          <ul className="absolute w-full h-[300px] top-full left-0 bg-slate-50 rounded-lg flex flex-col z-20 overflow-y-scroll overflow-x-hidden scrollbar-hide">
            {results.map((result) => (
              <SearchItem
                key={result.id}
                image={
                  result.media_type === "person"
                    ? result.profile_path
                    : result.poster_path
                }
                title={
                  result.media_type === "movie" ? result.title : result.name
                }
                originalTitle={
                  result.media_type === "movie"
                    ? result.original_title
                    : result.original_name
                }
                mediaType={result.media_type}
                id={result.id}
              />
            ))}
          </ul>
        )}
      </form>
    </>
  );
};

export default SearchBar;
