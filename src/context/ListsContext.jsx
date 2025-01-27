import { createContext, useContext, useState } from "react";

const ListsContext = createContext();

function ListsContextProvider({ children }) {
  const [isGridView, setIsGridView] = useState(true);

  const sortOptions = [
    "List order",
    "Alphabetical",
    "TMDB rating",
    "Popularity",
    "Release date",
    "Runtime",
    "Your rating",
    "Date added",
  ];

  const handleSortChange = (selectedOption) => {
    console.log("Sorting by:", selectedOption);
  };

  const values = { isGridView, setIsGridView, sortOptions, handleSortChange };

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
