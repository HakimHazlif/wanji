import React, { createContext, useState } from "react";

export const AppContext = createContext();
const AppProvider = (props) => {
  const [isMovie, setIsMovie] = useState(true)
  const [showId, setShowId] = useState('')

  const valueProvider = {
    isMovie,
    setIsMovie,
    showId,
    setShowId
  };
  return (
    <AppContext.Provider value={valueProvider}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
