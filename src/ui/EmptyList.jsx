import { RiMovie2AiLine } from "react-icons/ri";
import { useListsContext } from "../context/ListsContext";

const EmptyList = () => {
  const { addingSearchBarRef } = useListsContext();

  function handleFocusOnAddingSearchBar() {
    setTimeout(() => {
      addingSearchBarRef.current?.focus();
    }, 0);
  }

  return (
    <section className="mt-5 flex flex-col items-center justify-center h-[600px] text-center bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-lg">
      <div className="flex flex-col items-center gap-6">
        <div className="bg-gray-700 p-6 rounded-full shadow-lg">
          <RiMovie2AiLine className="h-20 w-20 text-purple-600" />
        </div>

        <h2 className="text-2xl font-bold ">No Movies or Shows Found</h2>
        <p className="text-gray-400 max-w-md">
          We couldn&apos;t find any content in your list. Start exploring new
          movies, TV shows, or episodes to fill it up. 🎥🍿
        </p>

        <button
          className="px-6 py-3 bg-orange-amber rounded-lg shadow-md hover:bg-orange-coral transition text-gray-800 font-semibold"
          onClick={handleFocusOnAddingSearchBar}
        >
          <a href="#adding-search-bar">Explore Movies & Shows</a>
        </button>
      </div>
    </section>
  );
};

export default EmptyList;
