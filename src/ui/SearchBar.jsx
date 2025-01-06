import SearchFilter from "./SearchFilter";

const SearchBar = () => {
  function handleSubmit(e) {
    e.preventDeafault();
  }

  return (
    <form
      className="flex items-center bg-white rounded-3xl p-1 w-full"
      method="GET"
      onSubmit={handleSubmit}
    >
      <SearchFilter />
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
  );
};

export default SearchBar;
