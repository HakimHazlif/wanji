import React, { createContext, useState } from "react";

export const AppContext = createContext();
const AppProvider = (props) => {
  const [isMovie, setIsMovie] = useState(true)

  const valueProvider = {
    isMovie,
    setIsMovie
  };
  return (
    <AppContext.Provider value={valueProvider}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
