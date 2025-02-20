import { createContext, useContext, useRef, useState } from "react";
import { useLists } from "../features/lists/useLists";
import { useLastFavorite } from "../features/lists/useLastFavorite";

const ListsContext = createContext();

function ListsContextProvider({ children }) {
  const [item, setItem] = useState({});
  const [moviesMap, setMoviesMap] = useState({});
  const [tvShowsMap, setTvShowsMap] = useState({});
  const [episodesMap, setEpisodesMap] = useState({});

  const { favoriteList, watchlist } = useLists();

  const favoriteListId = favoriteList?.id;
  const watchlistId = watchlist?.id;

  // maintain status of list view
  const [isGridView, setIsGridView] = useState(true);

  const addingSearchBarRef = useRef(null);

  return (
    <ListsContext.Provider
      value={{
        isGridView,
        setIsGridView,
        addingSearchBarRef,
        favoriteListId,
        watchlistId,
        itemsStatusMap: {
          movie: moviesMap,
          tv: tvShowsMap,
          episode: episodesMap,
        },
        setMoviesMap,
        setTvShowsMap,
        setEpisodesMap,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}

export function useListsContext() {
  const context = useContext(ListsContext);

  if (!context)
    throw new Error("ListsContext was used outside of ListsProvider");

  return context;
}

export default ListsContextProvider;
