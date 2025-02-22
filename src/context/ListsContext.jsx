import { createContext, useContext, useRef, useState } from "react";
import { useLists } from "../features/lists/useLists";

const ListsContext = createContext();

function ListsContextProvider({ children }) {
  const [item, setItem] = useState({});
  const [itemsStatusMap, setItemsStatusMap] = useState({
    movie: {},
    tv: {},
    episode: {},
  });
  const [itemsStatusLoading, setItemsStatusLoading] = useState(false);

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
        itemsStatusMap,
        setItemsStatusMap,
        itemsStatusLoading,
        setItemsStatusLoading,
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
