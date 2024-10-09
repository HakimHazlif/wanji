import React, { createContext } from "react";

export const AppContext = createContext();
const AppProvider = (props) => {
  const valueProvider = {};
  return (
    <AppContext.Provider value={valueProvider}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
