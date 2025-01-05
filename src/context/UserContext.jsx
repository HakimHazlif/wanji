import { createContext, useContext, useState } from "react";

const SessionContext = createContext();

function SessionContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(true);

  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  function toggleLogsForm(button) {
    setIsLogin(button === "login" ? true : false);
  }

  function toggleProfileMenu() {
    setOpenProfileMenu((prev) => !prev);
  }

  function handleChangeUser(e, label) {
    const { value } = e.target;

    setUser({ ...user, [label]: value });
  }

  return (
    <SessionContext.Provider
      value={{
        isLogin,
        openProfileMenu,
        user,
        toggleLogsForm,
        toggleProfileMenu,
        handleChangeUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context)
    throw new Error("DarkModeContext was used outside of DatkModeProvider");

  return context;
}

export default SessionContextProvider;
