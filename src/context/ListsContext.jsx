import { createContext, useContext, useRef, useState } from "react";
import { useLists } from "../features/lists/useLists";

const ListsContext = createContext();

function ListsContextProvider({ children }) {
  const [item, setItem] = useState({});

  const { favoriteList } = useLists();

  const favoriteMovies = favoriteList?.items_list?.filter(
    (movie) => movie.type === "movie"
  );
  const interestMovieId = favoriteMovies?.[favoriteMovies.length - 1]?.item_id;

  const favoriteTv = favoriteList?.items_list?.filter(
    (show) => show.type === "tv"
  );
  const interestTvId = favoriteTv?.[favoriteTv.length - 1]?.item_id;

  const interestsIds = {
    movieId: interestMovieId,
    tvId: interestTvId,
  };

  const [isGridView, setIsGridView] = useState(true);

  const addingSearchBarRef = useRef(null);

  const values = {
    isGridView,
    setIsGridView,
    interestsIds,
    addingSearchBarRef,
  };

  return (
    <ListsContext.Provider value={values}>{children}</ListsContext.Provider>
  );
}

export function useListsContext() {
  const context = useContext(ListsContext);

  if (!context)
    throw new Error("ListsContext was used outside of ListsProvider");

  return context;
}

export default ListsContextProvider;
