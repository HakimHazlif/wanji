import { createContext, useContext, useMemo, useRef, useState } from "react";
import { useLists } from "../features/userLists/hooks/useLists";
import { useMovies } from "../features/movies/hooks/useMovies";
import { useTvShows } from "../features/tv/hooks/useTvShows";

const ListsContext = createContext();

function ListsContextProvider({ children }) {
  const [itemsStatusMap, setItemsStatusMap] = useState({
    movie: new Map(),
    tv: new Map(),
    episode: new Map(),
  });

  console.log(itemsStatusMap);

  const { movies } = useMovies();
  const { tvShows } = useTvShows();

  const {
    popularMovies,
    topRatedMovies,
    nowPlaynigMovies,
    upcomingMovies,
    popularTv,
    topRatedTv,
    onTheAir,
    airingTodayTV,
  } = useMemo(() => {
    return {
      popularMovies: movies?.popularMovies?.slice(0, 8) ?? [],
      topRatedMovies: movies?.topRatedMovies?.slice(0, 8) ?? [],
      nowPlaynigMovies: movies?.nowPlaynigMovies?.slice(0, 8) ?? [],
      upcomingMovies: movies?.upcomingMovies.slice(0, 8) ?? [],
      popularTv: tvShows?.popularTv?.slice(0, 8) ?? [],
      topRatedTv: tvShows?.topRatedTv?.slice(0, 8) ?? [],
      onTheAir: tvShows?.onTheAir?.slice(0, 8) ?? [],
      airingTodayTV: tvShows?.airingToday?.slice(0, 8) ?? [],
    };
  }, [
    movies?.popularMovies,
    movies?.topRatedMovies,
    movies?.nowPlaynigMovies,
    movies?.upcomingMovies,
    tvShows?.popularTv,
    tvShows?.topRatedTv,
    tvShows?.onTheAir,
    tvShows?.airingToday,
  ]);

  const { favoriteList, watchlist } = useLists();

  const favoriteListId = favoriteList?.id;
  const watchlistId = watchlist?.id;

  const addingSearchBarRef = useRef(null);

  return (
    <ListsContext.Provider
      value={{
        addingSearchBarRef,
        favoriteListId,
        watchlistId,
        itemsStatusMap,
        setItemsStatusMap,
        popularMovies,
        topRatedMovies,
        nowPlaynigMovies,
        upcomingMovies,
        popularTv,
        topRatedTv,
        onTheAir,
        airingTodayTV,
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
