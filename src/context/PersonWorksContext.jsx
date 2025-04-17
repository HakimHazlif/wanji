import { createContext, useContext, useState } from "react";

const PersonWorksContext = createContext();

const PersonWorksProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("movies");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-latest");
  const [works, setWorks] = useState([]);

  const handleChangeTab = (event) => {
    setActiveTab(event.target.value);
  };
  const handleChangeFilter = (event) => {
    setDepartmentFilter(event.target.value);
  };
  const handleChangeSort = (event) => {
    setSortBy(event.target.value);
  };

  const values = {
    activeTab,
    handleChangeTab,
    departmentFilter,
    handleChangeFilter,
    sortBy,
    handleChangeSort,
    works,
    setWorks,
  };

  return (
    <PersonWorksContext.Provider value={values}>
      {children}
    </PersonWorksContext.Provider>
  );
};

export function usePersonWorksContext() {
  const context = useContext(PersonWorksContext);

  if (!context)
    throw new Error(
      "PersonWorksContext was used outside of PersonWorksProvider"
    );

  return context;
}

export default PersonWorksProvider;
