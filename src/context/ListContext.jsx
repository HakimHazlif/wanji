import { createContext, useContext, useState } from "react";
import {
  listFilterOptions,
  listSortOptions,
  listsSortOptions,
} from "../features/userLists/constant/options";

const ListContext = createContext();

function ListContextProvider({ children }) {
  const [isGridView, setIsGridView] = useState(true);

  const [filteredOption, setFilteredOption] = useState(listFilterOptions[0]);
  const [selectedOption, setSelectedOption] = useState(listSortOptions[0]);
  const [listsSortOption, setListSortOption] = useState(listsSortOptions[0]);

  function handleSelectListsSort(e) {
    setListSortOption(e.target.value);
  }

  function handleSelectSort(e) {
    setSelectedOption(e.target.value);
  }

  function handleSelectFilter(e) {
    setFilteredOption(e.target.value);
  }

  return (
    <ListContext.Provider
      value={{
        isGridView,
        setIsGridView,
        filteredOption,
        handleSelectSort,
        selectedOption,
        handleSelectFilter,
        listsSortOption,
        handleSelectListsSort,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

export function useListContext() {
  const context = useContext(ListContext);

  if (!context) throw new Error("ListContext was used outside of ListProvider");

  return context;
}

export default ListContextProvider;
